import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';
import profileImg from '../assets/img.jpeg';

const ROLES = [
  'Full Stack MERN Developer',
  'React & Node.js Engineer',
  'UI/UX Implementer',
  'MongoDB Architect',
  'REST API Developer',
];

const STATS = [
  { value: '50+', label: 'Projects' },
  { value: '2+',  label: 'Years Exp.' },
  { value: '25+', label: 'Clients' },
  { value: '100%', label: 'Satisfaction' },
];

const SOCIALS = [
  { icon: Github,   href: 'https://github.com/saadkhan01999',          label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/saadkhan01/',    label: 'LinkedIn' },
  { icon: Mail,     href: 'mailto:saadkhan01999@gmail.com',             label: 'Email' },
  { icon: Phone,    href: 'https://wa.me/923150913280',                 label: 'WhatsApp' },
];

// Floating blob component
const Blob = ({ style }) => (
  <div
    style={{
      position: 'absolute',
      borderRadius: '50%',
      filter: 'blur(80px)',
      opacity: 0.25,
      pointerEvents: 'none',
      ...style,
    }}
  />
);

const Hero = () => {
  const role = useTypewriter(ROLES, 75, 35, 2000);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '0 1.5rem',
      }}
    >
      {/* ── Background ────────────────────────────────────────────── */}
      <div className="line-grid" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
      <Blob style={{ width: 500, height: 500, background: 'var(--accent)', top: -150, left: -150 }} />
      <Blob style={{ width: 400, height: 400, background: '#A78BFA', bottom: -100, right: -100 }} />
      <Blob style={{ width: 300, height: 300, background: 'var(--accent-light)', top: '40%', left: '40%' }} />

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
          paddingTop: '5rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* ── Left: Text ─────────────────────────────────────────── */}
        <div>
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag">
              <span style={{ fontSize: 10 }}>●</span> Available for work
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: 'var(--text-primary)',
              marginTop: '0.5rem',
              marginBottom: '1rem',
            }}
          >
            Saad Bin{' '}
            <span className="gradient-animate">Saeed Khan</span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
              color: 'var(--accent)',
              fontWeight: 500,
              marginBottom: '1.25rem',
              minHeight: '1.8em',
            }}
          >
            {role}
            <span className="typewriter-cursor" />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
              maxWidth: 480,
              marginBottom: '2rem',
            }}
          >
            I build scalable full-stack systems with clean architecture, performant APIs,
            and pixel-perfect UIs that users actually enjoy using.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}
          >
            <button className="btn-accent" onClick={() => scrollTo('projects')}>
              View My Work <ArrowRight size={16} />
            </button>
            <a className="btn-outline" href="/src/assets/latest.pdf" download>
              Download CV <Download size={16} />
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ display: 'flex', gap: '0.6rem' }}
          >
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="social-btn"
              >
                <Icon size={17} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Profile Image ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <div style={{ position: 'relative', display: 'inline-block' }}>
            {/* Spinning accent ring */}
            <div
              style={{
                position: 'absolute',
                inset: -5,
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, var(--accent), #A78BFA, var(--accent-light), var(--accent))',
                animation: 'spin 5s linear infinite',
                zIndex: 0,
              }}
            />
            {/* Inner white gap */}
            <div
              style={{
                position: 'absolute',
                inset: 1,
                borderRadius: '50%',
                background: 'var(--bg-primary)',
                zIndex: 1,
              }}
            />
            {/* Profile image */}
            <div className="animate-float" style={{ position: 'relative', zIndex: 2 }}>
              <img
                src={profileImg}
                alt="Saad Bin Saeed Khan"
                style={{
                  width: 'clamp(220px, 28vw, 320px)',
                  height: 'clamp(220px, 28vw, 320px)',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  display: 'block',
                  position: 'relative',
                  zIndex: 3,
                }}
              />
            </div>

            {/* Badge: Open to work */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, type: 'spring', stiffness: 200 }}
              style={{
                position: 'absolute',
                bottom: '8%',
                right: '-12%',
                background: 'var(--bg-card)',
                border: '1.5px solid var(--border)',
                borderRadius: 14,
                padding: '0.5rem 0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: 'var(--shadow-md)',
                zIndex: 10,
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', display: 'block', animation: 'pulse 2s infinite' }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Open to Work
              </span>
            </motion.div>

            {/* Badge: MERN Stack */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
              style={{
                position: 'absolute',
                top: '8%',
                left: '-14%',
                background: 'var(--bg-card)',
                border: '1.5px solid var(--border)',
                borderRadius: 14,
                padding: '0.5rem 0.85rem',
                boxShadow: 'var(--shadow-md)',
                zIndex: 10,
              }}
            >
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', fontWeight: 500, color: 'var(--accent)' }}>
                {'<MERN />'}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── Stats Bar ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        style={{
          position: 'absolute',
          bottom: 40,
          left: 0, right: 0,
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          gap: '2rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          zIndex: 2,
        }}
      >
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.08 }}
            style={{ textAlign: 'center' }}
          >
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '1.75rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                lineHeight: 1,
              }}
              className="accent-text"
            >
              {s.value}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem', fontWeight: 500 }}>
              {s.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;
