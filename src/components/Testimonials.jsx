import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useAppSelector } from '../hooks/useAppDispatch';

const TestimonialCard = ({ t }) => (
  <div
    style={{
      minWidth: 340,
      maxWidth: 380,
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 20,
      padding: '1.75rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      boxShadow: 'var(--shadow-sm)',
      userSelect: 'none',
    }}
  >
    {/* Quote icon */}
    <div style={{
      width: 36, height: 36, borderRadius: 10,
      background: 'rgba(var(--accent-rgb), 0.1)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'var(--accent)',
    }}>
      <Quote size={18} />
    </div>

    {/* Stars */}
    <div style={{ display: 'flex', gap: 3 }}>
      {[...Array(t.rating)].map((_, i) => (
        <Star key={i} size={14} style={{ fill: '#FBBF24', color: '#FBBF24' }} />
      ))}
    </div>

    {/* Quote text */}
    <p style={{
      fontSize: '0.92rem',
      color: 'var(--text-secondary)',
      lineHeight: 1.75,
      fontStyle: 'italic',
      flexGrow: 1,
    }}>
      "{t.quote}"
    </p>

    {/* Author */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
      <img
        src={t.avatar}
        alt={t.name}
        style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
      />
      <div>
        <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
          {t.name}
        </p>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.05rem' }}>
          {t.role} · {t.company}
        </p>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const { testimonials } = useAppSelector((s) => s.portfolio);
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);

  // Duplicate for seamless infinite scroll
  const doubled = [...testimonials, ...testimonials];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame;
    let pos = 0;
    const speed = 0.5;

    const animate = () => {
      if (!paused) {
        pos += speed;
        // Half-width of original list
        const halfWidth = track.scrollWidth / 2;
        if (pos >= halfWidth) pos = 0;
        track.style.transform = `translateX(-${pos}px)`;
      }
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [paused]);

  return (
    <section id="testimonials" style={{ padding: '6rem 0', background: 'var(--bg-primary)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <span className="section-tag">Client Feedback</span>
          <h2 className="section-title">What People Say</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Proud to have worked with amazing clients who trust me to deliver outstanding results.
          </p>
        </motion.div>
      </div>

      {/* Carousel track */}
      <div
        style={{ position: 'relative', overflow: 'hidden' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Fade edges */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: 120, height: '100%',
          background: 'linear-gradient(90deg, var(--bg-primary), transparent)',
          zIndex: 2, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: 0, right: 0, width: 120, height: '100%',
          background: 'linear-gradient(-90deg, var(--bg-primary), transparent)',
          zIndex: 2, pointerEvents: 'none',
        }} />

        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: '1.25rem',
            width: 'max-content',
            padding: '1rem 0',
            willChange: 'transform',
          }}
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Dots indicator */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', marginTop: '2rem' }}>
        {testimonials.map((_, i) => (
          <div key={i} style={{
            width: i === 0 ? 20 : 6, height: 6,
            borderRadius: 10,
            background: i === 0 ? 'var(--accent)' : 'var(--border)',
            transition: 'all 0.3s',
          }} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
