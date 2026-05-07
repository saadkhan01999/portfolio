import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, Heart, ArrowUp } from 'lucide-react';
import logo from '../assets/hlogo.png';

const SOCIALS = [
  { icon: Github,   href: 'https://github.com/saadkhan01999',         label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/saadkhan01/',   label: 'LinkedIn' },
  { icon: Mail,     href: 'mailto:saadkhan01999@gmail.com',            label: 'Email' },
  { icon: Phone,    href: 'https://wa.me/923150913280',                label: 'WhatsApp' },
];

const LINKS = [
  { label: 'Home',         id: 'home' },
  { label: 'About',        id: 'about' },
  { label: 'Skills',       id: 'skills' },
  { label: 'Projects',     id: 'projects' },
  { label: 'Testimonials', id: 'testimonials' },
  { label: 'Contact',      id: 'contact' },
];

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
      {/* Main footer content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '3.5rem 1.5rem 2rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem',
          }}
        >
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <img src={logo} alt="Logo" style={{ height: 40, marginBottom: '1rem' }} />
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 220 }}>
              Full Stack MERN Developer crafting scalable, beautiful web experiences.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                   aria-label={label} className="social-btn" style={{ width: 36, height: 36 }}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {LINKS.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    textAlign: 'left', padding: 0,
                    fontSize: '0.88rem', color: 'var(--text-secondary)',
                    fontFamily: "'DM Sans', sans-serif",
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tech */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Built With
            </h4>
            {['React.js', 'Redux Toolkit', 'Framer Motion', 'Tailwind CSS', 'Vite', 'EmailJS'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{t}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Work Together
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
              Have a project? Let's build something great together.
            </p>
            <a href="mailto:saadkhan01999@gmail.com" className="btn-accent" style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem' }}>
              <Mail size={14} /> Hire Me
            </a>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            © {year} Saad Bin Saeed Khan · Made with <Heart size={12} style={{ fill: '#EF4444', color: '#EF4444' }} /> in Pakistan
          </p>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              background: 'rgba(var(--accent-rgb), 0.1)',
              border: '1.5px solid rgba(var(--accent-rgb), 0.2)',
              color: 'var(--accent)',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.8rem', fontWeight: 600,
              padding: '0.45rem 0.9rem',
              borderRadius: 10, cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(var(--accent-rgb), 0.18)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(var(--accent-rgb), 0.1)'; }}
          >
            <ArrowUp size={13} /> Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
