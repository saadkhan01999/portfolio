import { useRef, useState } from 'react';
import { AlertCircle, Check, CheckCircle2, Copy, Github, Linkedin, Loader2, Mail, MessageCircle, Send } from 'lucide-react';
import { contact, profile, socials } from '../../data/profile';
import { mailtoHref, PROJECT_TYPES, sendMessage, SUBMIT_MODE } from '../../lib/contact';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

const INITIAL = { name: '', email: '', projectType: '', message: '' };
const MESSAGE_MIN = 20;
const MESSAGE_MAX = 2000;

function validate(v) {
  const errors = {};
  if (v.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!v.email.trim()) errors.email = 'Please enter your email address so I can reply.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) errors.email = 'That email address doesn’t look right — please check it.';
  if (!v.projectType) errors.projectType = 'Please choose what you’d like to discuss.';
  const len = v.message.trim().length;
  if (len < MESSAGE_MIN) errors.message = `Please add a little more detail (at least ${MESSAGE_MIN} characters).`;
  else if (len > MESSAGE_MAX) errors.message = `Please keep the message under ${MESSAGE_MAX} characters.`;
  return errors;
}

const CHANNELS = [
  { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
  { icon: MessageCircle, label: 'WhatsApp', value: contact.phoneDisplay, href: contact.whatsappUrl, external: true },
  { icon: Linkedin, label: 'LinkedIn', value: socials.find((s) => s.icon === 'linkedin').handle, href: socials.find((s) => s.icon === 'linkedin').href, external: true },
  { icon: Github, label: 'GitHub', value: socials.find((s) => s.icon === 'github').handle, href: socials.find((s) => s.icon === 'github').href, external: true },
];

function Field({ id, label, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label} <span aria-hidden="true" className="text-danger">*</span>
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-[0.8125rem] text-fg-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 text-[0.8125rem] font-medium text-danger">
          <AlertCircle size={15} aria-hidden="true" className="mt-0.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const formRef = useRef(null);
  const statusRef = useRef(null);

  const update = (e) => {
    const next = { ...values, [e.target.name]: e.target.value };
    setValues(next);
    if (attempted) setErrors(validate(next));
  };

  const describedBy = (id, hasHint) =>
    [errors[id] && `${id}-error`, hasHint && !errors[id] && `${id}-hint`].filter(Boolean).join(' ') || undefined;

  const onSubmit = async (e) => {
    e.preventDefault();
    setAttempted(true);
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      formRef.current?.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }
    // Honeypot: real visitors never see this field.
    if (formRef.current?.elements['bot-field']?.value) return;

    setStatus('sending');
    try {
      const clean = { ...values, name: values.name.trim(), email: values.email.trim(), message: values.message.trim() };
      const res = await sendMessage(clean);
      setResult({ ...res, name: clean.name, email: clean.email });
      setStatus('success');
      if (res.mode !== 'mailto') setValues(INITIAL);
    } catch (err) {
      setResult({ error: err.message });
      setStatus('error');
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the address is still visible and selectable */
    }
  };

  const reset = () => {
    setStatus('idle');
    setResult(null);
    setAttempted(false);
    setErrors({});
  };

  const messageLength = values.message.trim().length;

  return (
    <section id="contact" aria-labelledby="contact-title" className="section border-t border-line bg-surface-sunken/60">
      <div className="container-page">
        <SectionHeading
          id="contact-title"
          eyebrow="Contact"
          title="Have a project in mind? Let’s talk."
          intro="Tell me what you’re building — a new product, a redesign, an API, or a role on your team. I’ll reply with questions and next steps."
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <ul className="card divide-y divide-line">
              {CHANNELS.map(({ icon: IconCmp, label, value, href, external }) => (
                <li key={label} className="flex items-center gap-4 p-5">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-subtle text-accent-fg">
                    <IconCmp size={20} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-fg-muted">{label}</p>
                    <a
                      href={href}
                      className="break-all font-semibold text-fg underline decoration-transparent underline-offset-4 transition-colors hover:text-accent-fg hover:decoration-current"
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {value}
                      {external && <span className="sr-only"> (opens in a new tab)</span>}
                    </a>
                  </div>
                  {label === 'Email' && (
                    <button type="button" onClick={copyEmail} className="icon-btn" aria-label={copied ? 'Email address copied' : 'Copy email address'}>
                      {copied ? <Check size={18} aria-hidden="true" className="text-success" /> : <Copy size={18} aria-hidden="true" />}
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-line bg-surface p-5">
              <span className="relative mt-1.5 flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                <span className="absolute inset-0 rounded-full bg-teal/30" />
                <span className="relative m-auto h-1.5 w-1.5 rounded-full bg-teal" />
              </span>
              <p className="text-caption text-fg-secondary">
                <strong className="font-semibold text-fg">{profile.availability}.</strong> {profile.responseTime}.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="card p-6 sm:p-8">
              {status === 'success' ? (
                <div ref={statusRef} tabIndex={-1} role="status" className="py-8 text-center focus:outline-none">
                  <CheckCircle2 size={44} aria-hidden="true" className="mx-auto text-success" />
                  {result.mode === 'mailto' ? (
                    <>
                      <h3 className="mt-5 text-h3">Your email app should now be open</h3>
                      <p className="mx-auto mt-3 max-w-md text-fg-secondary">
                        The message is pre-filled — press send there to deliver it. If nothing opened, write to{' '}
                        <a className="link" href={`mailto:${contact.email}`}>
                          {contact.email}
                        </a>
                        .
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 className="mt-5 text-h3">Thanks, {result.name} — your message was sent.</h3>
                      <p className="mx-auto mt-3 max-w-md text-fg-secondary">
                        I’ll reply to <strong className="font-semibold text-fg">{result.email}</strong>, usually{' '}
                        {profile.replyWindow}.
                        {result.mode === 'backend' && ' A confirmation email is on its way to you.'}
                      </p>
                    </>
                  )}
                  <button type="button" onClick={reset} className="btn-secondary mt-7">
                    Write another message
                  </button>
                </div>
              ) : (
                <form ref={formRef} name="contact" onSubmit={onSubmit} noValidate aria-describedby="form-note">
                  <h3 className="font-display text-[1.25rem] font-bold">Send a message</h3>
                  <p id="form-note" className="mt-1 text-caption text-fg-secondary">
                    All fields are required.
                    {SUBMIT_MODE === 'mailto' && ' Sending opens your email app with the message ready to go.'}
                  </p>

                  {/* Honeypot for bots (Netlify Forms `netlify-honeypot`). */}
                  <p className="hidden" aria-hidden="true">
                    <label>
                      Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
                    </label>
                  </p>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <Field id="name" label="Name" error={errors.name}>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={values.name}
                        onChange={update}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={describedBy('name')}
                        className="field"
                      />
                    </Field>
                    <Field id="email" label="Email" error={errors.email}>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        required
                        value={values.email}
                        onChange={update}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={describedBy('email')}
                        className="field"
                      />
                    </Field>
                  </div>

                  <div className="mt-5">
                    <Field id="projectType" label="What would you like to discuss?" error={errors.projectType}>
                      <select
                        id="projectType"
                        name="projectType"
                        required
                        value={values.projectType}
                        onChange={update}
                        aria-invalid={Boolean(errors.projectType)}
                        aria-describedby={describedBy('projectType')}
                        className="field appearance-none bg-[length:1.1rem] bg-[right_0.9rem_center] bg-no-repeat pr-10"
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23858FA3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                        }}
                      >
                        <option value="" disabled>
                          Choose a topic…
                        </option>
                        {PROJECT_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <div className="mt-5">
                    <Field
                      id="message"
                      label="Message"
                      error={errors.message}
                      hint="Goals, timeline and any links that help me understand the project."
                    >
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        required
                        maxLength={MESSAGE_MAX}
                        value={values.message}
                        onChange={update}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={[describedBy('message', true), 'message-count'].filter(Boolean).join(' ')}
                        className="field min-h-[9rem] resize-y"
                      />
                    </Field>
                    <p id="message-count" className="mt-1.5 text-right font-mono text-[0.75rem] text-fg-muted">
                      {messageLength} / {MESSAGE_MAX}
                    </p>
                  </div>

                  {status === 'error' && (
                    <div
                      ref={statusRef}
                      tabIndex={-1}
                      role="alert"
                      className="mt-5 flex gap-3 rounded-xl border border-danger/40 bg-danger/5 p-4 text-caption focus:outline-none"
                    >
                      <AlertCircle size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-danger" />
                      <div className="text-fg">
                        <p className="font-semibold">Your message wasn’t sent.</p>
                        <p className="mt-1 text-fg-secondary">
                          {result?.error} Your text is still here — try again, or{' '}
                          <a className="link" href={mailtoHref(values)}>
                            send it by email instead
                          </a>
                          .
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[0.8125rem] text-fg-muted">Your details are only used to reply to you.</p>
                    <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === 'sending'} aria-disabled={status === 'sending'}>
                      {status === 'sending' ? (
                        <>
                          <Loader2 size={18} aria-hidden="true" className="animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send size={18} aria-hidden="true" />
                          {SUBMIT_MODE === 'mailto' ? 'Open in email app' : 'Send message'}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
