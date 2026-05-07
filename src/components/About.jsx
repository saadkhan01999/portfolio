import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Layers, Zap, Globe } from 'lucide-react';
import profileImg from '../assets/img.jpeg';

// ── Animated counter hook ───────────────────────────────────────────────────
const useCounter = (target, duration = 1500, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const num = parseInt(target);
    const frame = (time) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * num));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [start, target, duration]);
  return count;
};

const STATS = [
  { value: 50,  suffix: '+', label: 'Projects Delivered', icon: Code2 },
  { value: 2,   suffix: '+', label: 'Years Experience',   icon: Zap },
  { value: 25,  suffix: '+', label: 'Happy Clients',      icon: Globe },
  { value: 100, suffix: '%', label: 'Client Satisfaction',icon: Layers },
];

const JOURNEY = [
  {
    year: '2022',
    title: 'Started My Journey',
    desc: 'Began learning HTML, CSS, JavaScript and fell in love with building for the web.',
  },
  {
    year: '2023',
    title: 'MERN Stack Mastery',
    desc: 'Dived deep into React, Node.js, Express, and MongoDB — built 30+ real projects.',
  },
  {
    year: '2024',
    title: 'Professional Freelancing',
    desc: 'Delivered production-grade applications for 25+ clients across multiple industries.',
  },
  {
    year: '2025',
    title: 'Expanding Skills',
    desc: 'Exploring mobile (React Native), cloud infrastructure, and advanced architecture patterns.',
  },
];

const TECH = ['React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'Tailwind CSS',
              'Next.js', 'React Native', 'REST APIs', 'Git & GitHub', 'Python', 'Vite'];

// ── Counter Card ────────────────────────────────────────────────────────────
const CounterCard = ({ stat, active }) => {
  const count = useCounter(stat.value, 1400, active);
  const Icon  = stat.icon;
  return (
    <div
      className="glass-card"
      style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}
    >
      <div
        style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'rgba(var(--accent-rgb), 0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--accent)',
        }}
      >
        <Icon size={18} />
      </div>
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '1.8rem', fontWeight: 800,
          color: 'var(--text-primary)', lineHeight: 1,
        }}
      >
        {count}<span style={{ color: 'var(--accent)' }}>{stat.suffix}</span>
      </div>
      <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
        {stat.label}
      </div>
    </div>
  );
};

const About = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      style={{ padding: '6rem 1.5rem', background: 'var(--bg-secondary)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            alignItems: 'start',
          }}
        >
          {/* ── Left Column ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {/* Profile Image */}
            <div
              style={{
                position: 'relative',
                width: 'fit-content',
                marginBottom: '2rem',
              }}
            >
              <img
                src={profileImg}
                alt="Saad Bin Saeed Khan"
                style={{
                  width: 260,
                  height: 260,
                  objectFit: 'cover',
                  borderRadius: 24,
                  display: 'block',
                  boxShadow: 'var(--shadow-lg)',
                }}
              />
              {/* Accent corner */}
              <div
                style={{
                  position: 'absolute',
                  bottom: -12, right: -12,
                  width: 80, height: 80,
                  borderRadius: 16,
                  background: 'var(--accent)',
                  opacity: 0.15,
                  zIndex: -1,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: -12, left: -12,
                  width: 80, height: 80,
                  borderRadius: 16,
                  background: '#A78BFA',
                  opacity: 0.15,
                  zIndex: -1,
                }}
              />
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {STATS.map((s) => (
                <CounterCard key={s.label} stat={s} active={inView} />
              ))}
            </div>
          </motion.div>

          {/* ── Right Column ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="section-tag">Who I Am</span>
            <h2 className="section-title">
              Turning ideas into{' '}
              <span className="accent-text">digital reality</span>
            </h2>

            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.25rem', fontSize: '1.02rem' }}>
              I'm a passionate Full Stack MERN Developer based in Pakistan with 2+ years of experience
              building production-grade web applications. I specialize in crafting scalable backend
              architectures, clean REST APIs, and modern, responsive frontends.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '1.02rem' }}>
              Every line of code I write is focused on performance, maintainability, and user experience.
              Whether it's a startup MVP or an enterprise system, I treat every project as if it were my own.
            </p>

            {/* Tech Stack */}
            <div style={{ marginBottom: '2.5rem' }}>
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                Tech Stack
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                {TECH.map(t => (
                  <span key={t} className="tech-badge">{t}</span>
                ))}
              </div>
            </div>

            {/* Journey Timeline */}
            <div style={{ borderLeft: '2px solid var(--border)', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {JOURNEY.map((j, i) => (
                <motion.div
                  key={j.year}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  style={{ position: 'relative' }}
                >
                  {/* Dot */}
                  <div
                    style={{
                      position: 'absolute',
                      left: -21,
                      top: 4,
                      width: 10, height: 10,
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      border: '2px solid var(--bg-secondary)',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.75rem',
                      color: 'var(--accent)',
                      fontWeight: 600,
                    }}
                  >
                    {j.year}
                  </span>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', margin: '0.1rem 0' }}>
                    {j.title}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {j.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
