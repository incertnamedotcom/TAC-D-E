import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL2;

  // Debug: tell us if the env var is missing
  if (!webhookUrl) {
    console.error('DISCORD_WEBHOOK_URL2 is missing or empty');
    return res.status(500).json({ error: 'Webhook not configured - env var missing' });
  }

  if (!webhookUrl.startsWith('https://discord.com/api/webhooks/')) {
    console.error('DISCORD_WEBHOOK_URL2 does not look like a valid Discord webhook');
    return res.status(500).json({ error: 'Webhook URL invalid format' });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();

    if (!response.ok) {
      console.error('Discord rejected the request:', response.status, text);
      return res.status(500).json({ 
        error: 'Discord webhook failed', 
        status: response.status,
        details: text 
      });
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('Fetch error:', err?.message || err);
    return res.status(500).json({ error: 'Fetch failed', details: err?.message });
  }
}