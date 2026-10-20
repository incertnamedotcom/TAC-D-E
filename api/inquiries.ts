import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL2;

  if (!webhookUrl) {
    console.error('DISCORD_WEBHOOK_URL2 is missing');
    return res.status(500).json({ error: 'Webhook not configured' });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Discord webhook failed:', response.status, text);
      return res.status(500).json({ error: 'Failed to send to Discord' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Inquiries API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}