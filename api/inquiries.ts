import type { VercelRequest, VercelResponse } from '@vercel/node';

const LIMITS = {
  name: 100,
  discord: 100,
  subject: 150,
  question: 1500,
} as const;

type TextField = keyof typeof LIMITS;

// Best-effort cooldown per IP (serverless instances do not share memory).
const COOLDOWN_MS = 60 * 1000;
const lastSubmission = new Map<string, number>();

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readText(source: Record<string, unknown>, key: TextField): string | null {
  const value = source[key];
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > LIMITS[key]) return null;
  return trimmed;
}

function clientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return first?.split(',')[0]?.trim() || 'unknown';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL2;
  if (!webhookUrl) {
    return res.status(500).json({ error: 'Server not configured' });
  }

  const body: unknown = req.body;
  if (!isRecord(body)) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  // Honeypot: real visitors never see or fill this field. Bots do. Pretend it worked.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return res.status(200).json({ success: true });
  }

  const name = readText(body, 'name');
  const discord = readText(body, 'discord');
  const subject = readText(body, 'subject');
  const question = readText(body, 'question');

  if (!name || !discord || !subject || !question) {
    return res.status(400).json({ error: 'Please fill in every field.' });
  }

  const ip = clientIp(req);
  const now = Date.now();
  for (const [key, time] of lastSubmission) {
    if (now - time > COOLDOWN_MS) lastSubmission.delete(key);
  }
  if (lastSubmission.has(ip)) {
    return res.status(429).json({ error: 'Please wait a minute before sending another inquiry.' });
  }

  const payload = {
    allowed_mentions: { parse: [] as string[] },
    embeds: [
      {
        title: 'New Inquiry',
        color: 0xb91c1c,
        fields: [
          { name: 'Name', value: name, inline: true },
          { name: 'Discord', value: discord, inline: true },
          { name: 'Subject', value: subject, inline: false },
          { name: 'Message', value: question, inline: false },
        ],
        timestamp: new Date().toISOString(),
        footer: { text: 'TACDEV Inquiries' },
      },
    ],
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      console.error('Discord webhook returned', response.status);
      return res.status(502).json({ error: 'Could not deliver your message. Please try again later.' });
    }

    lastSubmission.set(ip, now);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Webhook request failed', err);
    return res.status(502).json({ error: 'Could not deliver your message. Please try again later.' });
  }
}
