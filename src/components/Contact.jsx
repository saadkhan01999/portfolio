import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail, Phone, MapPin, Github, Linkedin,
  Send, CheckCircle2, AlertCircle, Loader2,
} from 'lucide-react';

// ── Backend API URL ──────────────────────────────────────────────────────────
// Dev  → http://localhost:5001
// Prod → set VITE_BACKEND_URL=https://your-backend.railway.app in Netlify env vars
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';

const CONTACT_INFO = [
  { icon: Mail, label: 'Email', value: 'saadkhan01999@gmail.com', href: 'mailto:saadkhan01999@gmail.com' },
  { icon: Phone, label: 'WhatsApp', value: '+92 315 091 3280', href: 'https://wa.me/923150913280' },
  { icon: MapPin, label: 'Location', value: 'Pakistan', href: null },
];

const SOCIALS = [
  { icon: Github, href: 'https://github.com/saadkhan01999', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/saadkhan01/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:saadkhan01999@gmail.com', label: 'Email' },
];

const INITIAL = { name: '', email: '', subject: '', message: '' };

const Contact = () => {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'
  const [errMsg, setErrMsg] = useState('');

  /* ── Validation ─────────────────────────────────────────────────── */
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Your name is required.';
    if (!form.email.trim()) e.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email address.';
    if (!form.subject.trim()) e.subject = 'Subject is required.';
    if (!form.message.trim() || form.message.length < 20)
      e.message = 'Message must be at least 20 characters.';
    return e;
  };

  /* ── Input change ───────────────────────────────────────────────── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  /* ── Submit → POST /api/contact on port 5001 ────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('sending');
    setErrMsg('');

    try {
      const res = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setStatus('success');
        setForm(INITIAL);
      } else {
        throw new Error(data.error || `Server error (${res.status})`);
      }
    } catch (err) {
      setStatus('error');
      setErrMsg(err.message || 'Something went wrong. Please email me directly.');
    }
  };

  /* ── Border colour helper ───────────────────────────────────────── */
  const borderFor = (field) => errors[field] ? { borderColor: '#EF4444' } : {};

  /* ────────────────────────────────────────────────────────────────── */
  return (
    <section id="contact" style={{ padding: '6rem 1.5rem', background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* ── Section Header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{ marginBottom: '3.5rem' }}
        >
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-subtitle">
            Have a project in mind or just want to chat? I'm always open to new opportunities.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          alignItems: 'start',
        }}>

          {/* ── LEFT: Contact Info ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Info cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="glass-card"
                  style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
                >
                  <div style={{
                    width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                    background: 'rgba(var(--accent-rgb), 0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent)',
                  }}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: 2 }}>
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '0.92rem', fontWeight: 600,
                          color: 'var(--text-primary)', textDecoration: 'none',
                          transition: 'color 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
                      >
                        {value}
                      </a>
                    ) : (
                      <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <p style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 700,
              fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.75rem',
            }}>
              Find me on
            </p>
            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '2rem' }}>
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={label} className="social-btn">
                  <Icon size={17} />
                </a>
              ))}
            </div>

            {/* Availability badge */}
            <div style={{
              padding: '1rem 1.25rem', borderRadius: 14,
              background: 'rgba(34,197,94,0.08)',
              border: '1.5px solid rgba(34,197,94,0.2)',
              display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: '#22C55E', marginTop: 6, flexShrink: 0,
              }} />
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.88rem', color: '#22C55E', marginBottom: 3 }}>
                  Currently Available
                </p>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Open to freelance projects and full-time roles. Typically respond within 24 hours.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Contact Form ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card"
            style={{ padding: '2rem' }}
          >
            {/* ── Success State ─────────────────────────────────────── */}
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                style={{ textAlign: 'center', padding: '3rem 1rem' }}
              >
                <CheckCircle2 size={56} style={{ color: '#22C55E', margin: '0 auto 1rem', display: 'block' }} />
                <h3 style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 800,
                  fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '0.5rem',
                }}>
                  Message Sent! 🎉
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                  Thanks for reaching out. I'll reply within 24 hours.
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '1.75rem' }}>
                  An auto-reply has also been sent to your inbox.
                </p>
                <button
                  className="btn-accent"
                  onClick={() => { setStatus(null); setErrMsg(''); }}
                >
                  Send Another Message
                </button>
              </motion.div>

            ) : (
              /* ── Form ────────────────────────────────────────────── */
              <form onSubmit={handleSubmit} noValidate>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 800,
                  fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '1.5rem',
                }}>
                  Send a Message
                </h3>

                {/* Name + Email */}
                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr',
                  gap: '0.75rem', marginBottom: '0.75rem',
                }}>
                  <div>
                    <input
                      className="form-input"
                      name="name" type="text" placeholder="Your Name"
                      value={form.name} onChange={handleChange}
                      style={borderFor('name')}
                    />
                    {errors.name && (
                      <p style={{ color: '#EF4444', fontSize: '0.73rem', marginTop: 4 }}>{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <input
                      className="form-input"
                      name="email" type="email" placeholder="Email Address"
                      value={form.email} onChange={handleChange}
                      style={borderFor('email')}
                    />
                    {errors.email && (
                      <p style={{ color: '#EF4444', fontSize: '0.73rem', marginTop: 4 }}>{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div style={{ marginBottom: '0.75rem' }}>
                  <input
                    className="form-input"
                    name="subject" type="text" placeholder="Subject"
                    value={form.subject} onChange={handleChange}
                    style={borderFor('subject')}
                  />
                  {errors.subject && (
                    <p style={{ color: '#EF4444', fontSize: '0.73rem', marginTop: 4 }}>{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <textarea
                    className="form-input"
                    name="message" rows={5}
                    placeholder="Tell me about your project…"
                    value={form.message} onChange={handleChange}
                    style={{ ...borderFor('message'), resize: 'vertical' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                    {errors.message
                      ? <p style={{ color: '#EF4444', fontSize: '0.73rem' }}>{errors.message}</p>
                      : <span />
                    }
                    <span style={{
                      fontSize: '0.72rem',
                      color: form.message.length > 450 ? '#F59E0B' : 'var(--text-secondary)',
                    }}>
                      {form.message.length}/500
                    </span>
                  </div>
                </div>

                {/* Error banner */}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                      padding: '0.85rem 1rem', borderRadius: 10, marginBottom: '1rem',
                      background: 'rgba(239,68,68,0.08)',
                      border: '1.5px solid rgba(239,68,68,0.25)',
                      color: '#EF4444', fontSize: '0.85rem',
                    }}
                  >
                    <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <strong>Failed to send.</strong>{' '}
                      {errMsg || 'Please email me directly at saadkhan01999@gmail.com'}
                    </div>
                  </motion.div>
                )}

                {/* Submit button */}
                <motion.button
                  type="submit"
                  className="btn-accent"
                  disabled={status === 'sending'}
                  whileHover={status !== 'sending' ? { scale: 1.02 } : {}}
                  whileTap={status !== 'sending' ? { scale: 0.98 } : {}}
                  style={{
                    width: '100%', justifyContent: 'center',
                    opacity: status === 'sending' ? 0.7 : 1,
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  }}
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
