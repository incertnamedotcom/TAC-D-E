import type { VercelRequest, VercelResponse } from "@vercel/node";

const LIMITS = {
  name: 100,
  discord: 100,
  subject: 150,
  question: 1500,
} as const;

type TextField = keyof typeof LIMITS;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readText(source: Record<string, unknown>, key: TextField): string | null {
  const value = source[key];
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > LIMITS[key]) return null;
  return trimmed;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL3;
    if (!webhookUrl) {
      console.error("DISCORD_WEBHOOK_URL3 is missing");
      return res.status(500).json({ error: "Server not configured" });
    }

    // Handle body (sometimes string on Vercel)
    let body: unknown = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({ error: "Invalid JSON" });
      }
    }

    if (!isRecord(body)) {
      return res.status(400).json({ error: "Invalid request" });
    }

    // Honeypot
    if (typeof body.website === "string" && body.website.trim() !== "") {
      return res.status(200).json({ success: true });
    }

    const name = readText(body, "name");
    const discord = readText(body, "discord");
    const subject = readText(body, "subject");
    const question = readText(body, "question");

    if (!name || !discord || !subject || !question) {
      return res.status(400).json({ error: "Please fill in every field." });
    }

    const payload = {
      allowed_mentions: { parse: [] as string[] },
      embeds: [
        {
          title: "New Inquiry",
          color: 0xb91c1c,
          fields: [
            { name: "Name", value: name, inline: true },
            { name: "Discord", value: discord, inline: true },
            { name: "Subject", value: subject, inline: false },
            { name: "Message", value: question, inline: false },
          ],
          timestamp: new Date().toISOString(),
          footer: { text: "TACDEV Inquiries" },
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
      console.error("Discord webhook error:", response.status, text);
      return res.status(502).json({ error: "Could not deliver message" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Handler crashed:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}