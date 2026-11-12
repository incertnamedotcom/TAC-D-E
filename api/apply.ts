import type { VercelRequest, VercelResponse } from '@vercel/node';
import { randomBytes } from 'node:crypto';

// Public value (it is already visible in the OAuth URL). Override with an env var if you ever rotate the app.
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID ?? '1560566512857915472';

const CAREER_PATHS = new Map<string, string>([
  ['O29A', 'O29A - SPECIAL WARFARE OPERATOR'],
  ['M03A', 'M03A - EXPLOSIVE ORDNANCE DISPOSAL TECHNICIAN'],
  ['L02A', 'L02A - SPECIAL OPERATIONS INDEPENDENT DUTY CORPSMAN'],
]);

// Max length per text field. Keeps the embed well under Discord's limits (1024 per field, 6000 total).
const LIMITS = {
  fullName: 100,
  reason: 1000,
  armaExperience: 200,
  otherUnits: 300,
  howFound: 300,
} as const;

type TextField = keyof typeof LIMITS;

const MAX_PRIOR_UNITS = 6;
const PRIOR_UNIT_FIELD_MAX = 100;

interface DiscordUser {
  id: string;
  username: string;
  global_name?: string | null;
}

// Best-effort cooldown. Serverless instances do not share memory, so this only stops
// casual repeat submissions. For a hard limit use Vercel's WAF rate limiting or Upstash.
const COOLDOWN_MS = 10 * 60 * 1000;
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

// Optional list of prior units. Returns a display string for the embed ("None" if empty).
function readPriorUnits(value: unknown): string {
  if (!Array.isArray(value)) return 'None';

  const lines: string[] = [];
  for (const item of value.slice(0, MAX_PRIOR_UNITS)) {
    if (!isRecord(item)) continue;
    const name = typeof item.name === 'string' ? item.name.trim().slice(0, PRIOR_UNIT_FIELD_MAX) : '';
    const contact = typeof item.contact === 'string' ? item.contact.trim().slice(0, PRIOR_UNIT_FIELD_MAX) : '';
    if (name || contact) lines.push(`• ${name || '—'} | ${contact || '—'}`);
  }

  return lines.length ? lines.join('\n').slice(0, 1024) : 'None';
}

// Asks Discord who the token belongs to, and makes sure it was issued to THIS app.
async function verifyDiscordToken(accessToken: string): Promise<DiscordUser | null> {
  try {
    const res = await fetch('https://discord.com/api/oauth2/@me', {
      headers: { Authorization: `Bearer ${accessToken}` },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;

    const data = (await res.json()) as { application?: { id?: string }; user?: DiscordUser };
    if (data.application?.id !== DISCORD_CLIENT_ID) return null;
    if (!data.user?.id || !data.user.username) return null;
    return data.user;
  } catch {
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    return res.status(500).json({ error: 'Server not configured' });
  }

  const body: unknown = req.body;
  if (!isRecord(body) || typeof body.accessToken !== 'string' || !isRecord(body.form)) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  // 1. Identity comes from Discord, never from the browser.
  const user = await verifyDiscordToken(body.accessToken);
  if (!user) {
    return res.status(401).json({ error: 'Discord login expired. Please log in again.' });
  }

  // 2. Cooldown per verified Discord account.
  const now = Date.now();
  for (const [id, time] of lastSubmission) {
    if (now - time > COOLDOWN_MS) lastSubmission.delete(id);
  }
  if (lastSubmission.has(user.id)) {
    return res.status(429).json({ error: 'You already submitted recently. Please wait before trying again.' });
  }

  // 3. Validate every field, and report which ones failed.
  const form = body.form;
  const fullName = readText(form, 'fullName');
  const reason = readText(form, 'reason');
  const armaExperience = readText(form, 'armaExperience');
  const otherUnits = readText(form, 'otherUnits');
  const howFound = readText(form, 'howFound');
  const priorUnits = readPriorUnits(form.priorUnits);
  const careerKey = typeof form.careerPath === 'string' ? form.careerPath : '';
  const careerLabel = CAREER_PATHS.get(careerKey) ?? null;

  const agreed =
    form.agreeAccuracy === true &&
    form.agreeInterview === true &&
    form.agreeFalseInfo === true &&
    form.agreeNoDualMembership === true;

  const problems: string[] = [];
  if (!fullName) problems.push(`full name (max ${LIMITS.fullName} characters)`);
  if (!careerLabel) problems.push('career path');
  if (!reason) problems.push(`reason (max ${LIMITS.reason} characters)`);
  if (!armaExperience) problems.push(`Arma 3 experience (max ${LIMITS.armaExperience} characters)`);
  if (!otherUnits) problems.push(`other units (max ${LIMITS.otherUnits} characters)`);
  if (!howFound) problems.push(`how you found us (max ${LIMITS.howFound} characters)`);
  if (!agreed) problems.push('agreements');

  if (problems.length > 0 || !fullName || !reason || !armaExperience || !otherUnits || !howFound || !careerLabel) {
    return res.status(400).json({ error: `Invalid application. Please check: ${problems.join(', ')}.` });
  }

  // 4. The server builds the message. The browser cannot inject its own embeds or pings.
  const applicationNumber = `NSW-${new Date().getFullYear()}-${randomBytes(3).toString('hex').toUpperCase()}`;
  const displayName = user.global_name || user.username;

  const payload = {
    content: `**ENLISTMENT APPLICATION RECEIVED**\nApplicant: <@${user.id}>\nForm ID: \`${applicationNumber}\``,
    allowed_mentions: { parse: [] as string[] },
    embeds: [
      {
        title: `ENLISTMENT FORM  •  ${applicationNumber}`,
        color: 0xb91c1c,
        description: 'A new enlistment application has been submitted for review.',
        fields: [
          { name: 'Full Name', value: fullName, inline: true },
          { name: 'Discord', value: `${displayName} (@${user.username})`.slice(0, 1024), inline: true },
          { name: 'Discord ID', value: user.id, inline: true },
          { name: 'Preferred Career Path', value: careerLabel, inline: false },
          { name: 'Why do you want to join our organization?', value: reason, inline: false },
          { name: 'How long have you been playing Arma 3?', value: armaExperience, inline: false },
          { name: 'Are you currently participating in any other Arma 3 units?', value: otherUnits, inline: false },
          { name: 'Prior Unit / Organization Affiliation (name | contact)', value: priorUnits, inline: false },
          { name: 'How did you find out about our organization?', value: howFound, inline: false },
        ],
        footer: { text: 'TACDEV  •  Naval Special Warfare Enlistment System' },
        timestamp: new Date().toISOString(),
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
      return res.status(502).json({ error: 'Could not deliver your application. Please try again later.' });
    }

    lastSubmission.set(user.id, now);
    return res.status(200).json({ success: true, applicationNumber });
  } catch (err) {
    console.error('Webhook request failed', err);
    return res.status(502).json({ error: 'Could not deliver your application. Please try again later.' });
  }
}