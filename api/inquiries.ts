import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") return res.status(200).end();
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL3;
    if (!webhookUrl) {
      return res.status(500).json({ error: "DISCORD_WEBHOOK_URL3 missing" });
    }

    let body: any = req.body;
    if (typeof body === "string") {
      try { body = JSON.parse(body); } catch { return res.status(400).json({ error: "Invalid JSON", raw: req.body }); }
    }

    // DEBUG: return what we received
    if (!body || typeof body !== "object") {
      return res.status(400).json({ error: "No body", received: body, type: typeof req.body });
    }

    const name = typeof body.name === "string" ? body.name.trim() : null;
    const discord = typeof body.discord === "string" ? body.discord.trim() : null;
    const subject = typeof body.subject === "string" ? body.subject.trim() : null;
    const question = typeof body.question === "string" ? body.question.trim() : null;

    if (!name || !discord || !subject || !question) {
      return res.status(400).json({
        error: "Missing fields",
        received: { name, discord, subject, question },
        rawKeys: Object.keys(body),
      });
    }

    // Honeypot
    if (typeof body.website === "string" && body.website.trim() !== "") {
      return res.status(200).json({ success: true });
    }

    const payload = {
      embeds: [
        {
          title: "New Inquiry",
          color: 0xb91c1c,
          fields: [
            { name: "Name", value: name.slice(0, 1024), inline: true },
            { name: "Discord", value: discord.slice(0, 1024), inline: true },
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
      return res.status(502).json({ error: "Discord failed", details: text });
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: "Crash", message: err?.message });
  }
}