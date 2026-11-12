import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL3;
    if (!webhookUrl) {
      return res.status(500).json({ error: "Server misconfigured" });
    }

    let body: any = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({ error: "Invalid JSON" });
      }
    }

    if (!body || typeof body !== "object") {
      return res.status(400).json({ error: "No body" });
    }

    // Honeypot (checked first so bots get a fake success)
    if (typeof body.website === "string" && body.website.trim() !== "") {
      return res.status(200).json({ success: true });
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const subject = typeof body.subject === "string" ? body.subject.trim() : "";
    const question = typeof body.question === "string" ? body.question.trim() : "";
    const token = typeof body.token === "string" ? body.token : "";

    if (!name || !subject || !question) {
      return res.status(400).json({ error: "Missing fields" });
    }

    if (!token) {
      return res.status(401).json({ error: "Missing token" });
    }

    // Verify the Discord identity server-side instead of trusting the client
    const userRes = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!userRes.ok) {
      return res.status(401).json({ error: "Invalid Discord token" });
    }
    const user = await userRes.json();

    const discord = `${user.global_name || user.username} (@${user.username})`;
    const discordId = String(user.id);

    const payload = {
      embeds: [
        {
          title: "New Inquiry",
          color: 0xb91c1c,
          fields: [
            { name: "Full Name", value: name.slice(0, 1024), inline: true },
            { name: "Discord", value: discord.slice(0, 1024), inline: true },
            { name: "Discord ID", value: discordId.slice(0, 1024), inline: true },
            { name: "Subject", value: subject.slice(0, 1024) },
            { name: "Message", value: question.slice(0, 1024) },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Discord webhook failed:", response.status, text);
      return res.status(502).json({ error: "Discord failed" });
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("Inquiry handler crashed:", err);
    return res.status(500).json({ error: "Crash" });
  }
}