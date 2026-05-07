// ─────────────────────────────────────────────────────────────────────────────
//  Portfolio Contact Form — Express Backend
//  Uses Nodemailer (Gmail) to forward messages to your inbox.
//
//  QUICK SETUP (5 min):
//  1. cd backend && npm install
//  2. cp .env.example .env  (fill in your Gmail + App Password)
//  3. node server.js
//
//  Gmail App Password guide → https://myaccount.google.com/apppasswords
// ─────────────────────────────────────────────────────────────────────────────

import express      from 'express';
import cors         from 'cors';
import nodemailer   from 'nodemailer';
import rateLimit    from 'express-rate-limit';
import 'dotenv/config';

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',                    // your Vite dev port
    'http://localhost:4173',
    'https://ssamportfolio.netlify.app',        // your Netlify URL
    process.env.FRONTEND_URL,
  ].filter(Boolean),
  methods: ['POST', 'GET'],
}));

// ── Rate limiter: max 5 messages per hour per IP ────────────────────────────
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max:      5,
  standardHeaders: true,
  legacyHeaders:   false,
  message: { success: false, error: 'Too many messages. Please try again later.' },
});

// ── Nodemailer transporter ──────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,   // your Gmail address
    pass: process.env.GMAIL_PASS,   // Gmail App Password (not your normal password)
  },
});

// ── Input validation ────────────────────────────────────────────────────────
const validate = ({ name, email, subject, message }) => {
  const errors = {};
  if (!name?.trim())                               errors.name    = 'Name is required.';
  if (!email?.trim())                              errors.email   = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Invalid email.';
  if (!subject?.trim())                            errors.subject = 'Subject is required.';
  if (!message?.trim() || message.length < 20)    errors.message = 'Message must be ≥ 20 characters.';
  return errors;
};

// ── HTML email template ─────────────────────────────────────────────────────
const buildHtml = ({ name, email, subject, message }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { margin:0; padding:0; font-family: 'Segoe UI', Arial, sans-serif; background:#f4f4f8; }
    .wrap { max-width:580px; margin:32px auto; background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,.08); }
    .header { background:linear-gradient(135deg,#3563E9,#7EA7FF); padding:32px 40px; }
    .header h1 { margin:0; color:#fff; font-size:22px; font-weight:700; }
    .header p  { margin:6px 0 0; color:rgba(255,255,255,.8); font-size:14px; }
    .body { padding:32px 40px; }
    .field { margin-bottom:20px; }
    .label { font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:.08em; color:#8B8BA7; margin-bottom:6px; }
    .value { font-size:15px; color:#13141F; line-height:1.6; background:#f7f8fc; border-radius:10px; padding:12px 16px; }
    .message { white-space:pre-wrap; }
    .footer { padding:20px 40px; border-top:1px solid #eee; font-size:12px; color:#aaa; text-align:center; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <h1>📬 New Contact Message</h1>
      <p>From your portfolio website — ${new Date().toLocaleDateString('en-GB', { dateStyle: 'long' })}</p>
    </div>
    <div class="body">
      <div class="field"><div class="label">Name</div><div class="value">${escHtml(name)}</div></div>
      <div class="field"><div class="label">Email</div><div class="value"><a href="mailto:${escHtml(email)}" style="color:#3563E9">${escHtml(email)}</a></div></div>
      <div class="field"><div class="label">Subject</div><div class="value">${escHtml(subject)}</div></div>
      <div class="field"><div class="label">Message</div><div class="value message">${escHtml(message)}</div></div>
    </div>
    <div class="footer">Sent via Saad Bin Saeed Khan's Portfolio Contact Form</div>
  </div>
</body>
</html>
`;

const escHtml = (s = '') =>
  s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

// ── Routes ──────────────────────────────────────────────────────────────────

// Health check
app.get('/api/health', (_, res) =>
  res.json({ status: 'ok', time: new Date().toISOString() })
);

// Send contact email
app.post('/api/contact', limiter, async (req, res) => {
  const { name, email, subject, message } = req.body;

  const errors = validate({ name, email, subject, message });
  if (Object.keys(errors).length)
    return res.status(422).json({ success: false, errors });

  try {
    // ── To you (notification) ───────────────────────────────────────
    await transporter.sendMail({
      from:    `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to:      process.env.GMAIL_USER,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html:    buildHtml({ name, email, subject, message }),
      text:    `From: ${name} <${email}>\n\n${message}`,
    });

    // ── Auto-reply to sender ────────────────────────────────────────
    await transporter.sendMail({
      from:    `"Saad Bin Saeed Khan" <${process.env.GMAIL_USER}>`,
      to:      email,
      subject: `Re: ${subject} — Got your message!`,
      html: `
        <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:520px;margin:0 auto;padding:32px;">
          <h2 style="color:#3563E9;margin-bottom:8px;">Thanks for reaching out, ${escHtml(name)}! 👋</h2>
          <p style="color:#5A5A72;line-height:1.7;margin-bottom:16px;">
            I've received your message and will get back to you within <strong>24 hours</strong>.
          </p>
          <p style="color:#5A5A72;line-height:1.7;">In the meantime, feel free to check out my
            <a href="https://github.com/saadkhan01999" style="color:#3563E9">GitHub</a> or connect on
            <a href="https://www.linkedin.com/in/saadkhan01/" style="color:#3563E9">LinkedIn</a>.
          </p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0;">
          <p style="color:#aaa;font-size:12px;">— Saad Bin Saeed Khan · Full Stack MERN Developer · Pakistan</p>
        </div>
      `,
    });

    return res.json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error('[contact]', err.message);
    return res.status(500).json({ success: false, error: 'Failed to send email. Please try again.' });
  }
});

// ── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () =>
  console.log(`\n✅  Backend running at http://localhost:${PORT}\n`)
);
