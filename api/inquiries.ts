import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('Method received:', req.method);

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  // Temporarily accept both GET and POST so we can see what happens
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed', method: req.method });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL2;

  if (!webhookUrl) {
    return res.status(500).json({ error: 'Webhook not configured - env var missing' });
  }

  // If it's a GET, just return a test response
  if (req.method === 'GET') {
    return res.status(200).json({ 
      message: 'API is reachable', 
      method: 'GET',
      hasWebhook: !!webhookUrl 
    });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(500).json({ 
        error: 'Discord webhook failed', 
        status: response.status, 
        details: text 
      });
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: 'Fetch failed', details: err?.message });
  }
}