import { contact } from '../data/profile';

/**
 * How the contact form is delivered, decided at build time:
 *  - 'backend' — VITE_BACKEND_URL is set: POST JSON to the Express + Nodemailer API in /backend.
 *  - 'netlify' — built on Netlify (it sets NETLIFY=true): Netlify Forms, no server needed.
 *  - 'mailto'  — anywhere else: open the visitor's email app with the message pre-filled.
 * The UI never reports a message as delivered unless a service confirmed it.
 */
const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL || '').trim().replace(/\/+$/, '');

// __NETLIFY_BUILD__ is injected by vite.config.ts `define`.
export const SUBMIT_MODE = BACKEND_URL ? 'backend' : __NETLIFY_BUILD__ ? 'netlify' : 'mailto';

export const PROJECT_TYPES = [
  'New web application',
  'Website or landing page',
  'Design to code (PSD / Sketch / XD)',
  'Back-end or API work',
  'Mobile app (React Native)',
  'Full-time role',
  'Something else',
];

export function mailtoHref({ name = '', email = '', projectType = '', message = '' }) {
  const subject = projectType ? `${projectType} — portfolio enquiry` : 'Portfolio enquiry';
  const signature = [name && `— ${name}`, email].filter(Boolean).join('\n');
  const body = [message.trim(), signature].filter(Boolean).join('\n\n');
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Sends the message. Resolves with { mode } on confirmed delivery; throws otherwise. */
export async function sendMessage(values) {
  const subject = `${values.projectType} — portfolio enquiry`;

  if (SUBMIT_MODE === 'backend') {
    const res = await fetch(`${BACKEND_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: values.name, email: values.email, subject, message: values.message }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.success) throw new Error(data.error || `The server responded with status ${res.status}.`);
    return { mode: 'backend' };
  }

  if (SUBMIT_MODE === 'netlify') {
    const body = new URLSearchParams({
      'form-name': 'contact',
      'bot-field': '',
      name: values.name,
      email: values.email,
      'project-type': values.projectType,
      subject,
      message: values.message,
    });
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
    if (!res.ok) throw new Error(`The form service responded with status ${res.status}.`);
    return { mode: 'netlify' };
  }

  window.location.href = mailtoHref(values);
  return { mode: 'mailto' };
}
