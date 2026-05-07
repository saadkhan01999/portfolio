import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CATEGORIES = [
  {
    title: 'Frontend',
    emoji: '🎨',
    skills: [
      { name: 'React.js',              level: 95 },
      { name: 'JavaScript (ES6+)',     level: 90 },
      { name: 'Tailwind CSS',          level: 100 },
      { name: 'Bootstrap & CSS',       level: 100 },
      { name: 'HTML5 / Semantic Web',  level: 95 },
    ],
  },
  {
    title: 'Backend & Mobile',
    emoji: '⚙️',
    skills: [
      { name: 'Node.js & Express.js',  level: 80 },
      { name: 'MongoDB & Mongoose',    level: 80 },
      { name: 'REST API Design',       level: 85 },
      { name: 'React Native',          level: 75 },
      { name: 'Next.js',               level: 55 },
    ],
  },
  {
    title: 'Tools & Others',
    emoji: '🛠️',
    skills: [
      { name: 'Git & GitHub',          level: 90 },
      { name: 'Redux Toolkit',         level: 85 },
      { name: 'Python',                level: 50 },
      { name: 'Graphic Design',        level: 75 },
      { name: 'MS Office Suite',       level: 100 },
    ],
  },
];

const SkillBar = ({ name, level, delay }) => {
  const [inView, setInView] = useState(false);
  const barRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (barRef.current) obs.observe(barRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={barRef} style={{ marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.9rem', fontWeight: 500,
          color: 'var(--text-primary)',
        }}>
          {name}
        </span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.75rem', fontWeight: 600,
          color: 'var(--accent)',
        }}>
          {level}%
        </span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: inView ? `${level}%` : 0 }}
          transition={{ duration: 1.2, delay: delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
};

const Skills = () => (
  <section id="skills" style={{ padding: '6rem 1.5rem', background: 'var(--bg-primary)' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        style={{ marginBottom: '3.5rem', textAlign: 'center' }}
      >
        <span className="section-tag">What I Know</span>
        <h2 className="section-title" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 1rem' }}>
          Skills & Expertise
        </h2>
        <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto' }}>
          Technologies and tools I use daily to build fast, scalable, and beautiful products.
        </p>
      </motion.div>

      {/* Category Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {CATEGORIES.map((cat, ci) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: ci * 0.12 }}
            viewport={{ once: true }}
            className="glass-card hover-glow"
            style={{ padding: '1.75rem' }}
          >
            {/* Card header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
              <div
                style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: 'rgba(var(--accent-rgb), 0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem',
                  flexShrink: 0,
                }}
              >
                {cat.emoji}
              </div>
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700, fontSize: '1.05rem',
                  color: 'var(--text-primary)',
                }}
              >
                {cat.title}
              </h3>
            </div>

            {/* Skills */}
            {cat.skills.map((skill, si) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                delay={ci * 0.12 + si * 0.08}
              />
            ))}
          </motion.div>
        ))}
      </div>

      {/* Proficiency Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
        style={{
          marginTop: '2.5rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          flexWrap: 'wrap',
        }}
      >
        {[
          { label: 'Beginner',    range: '< 60%',   color: '#8B8BA7' },
          { label: 'Intermediate', range: '60–79%', color: '#3563E9' },
          { label: 'Advanced',    range: '80–94%',   color: '#4F7BF7' },
          { label: 'Expert',      range: '95–100%',  color: '#7EA7FF' },
        ].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: l.color }} />
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              {l.label} <span style={{ opacity: 0.6 }}>({l.range})</span>
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Skills;
