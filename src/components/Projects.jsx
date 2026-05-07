import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star, GitFork, Loader2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { fetchGitHubRepos, langColor } from '../store/slices/portfolioSlice';

// ── Shimmer skeleton ────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="glass-card" style={{ padding: '1.5rem' }}>
    <div className="shimmer-card" style={{ height: 16, borderRadius: 8, width: '60%', marginBottom: 12 }} />
    <div className="shimmer-card" style={{ height: 12, borderRadius: 8, width: '90%', marginBottom: 8 }} />
    <div className="shimmer-card" style={{ height: 12, borderRadius: 8, width: '75%', marginBottom: 20 }} />
    <div style={{ display: 'flex', gap: 6 }}>
      {[1,2,3].map(i => (
        <div key={i} className="shimmer-card" style={{ height: 22, width: 60, borderRadius: 6 }} />
      ))}
    </div>
  </div>
);

// ── Featured project card ───────────────────────────────────────────────────
const FeaturedCard = ({ repo, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="glass-card hover-glow"
    style={{ padding: '1.6rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', position: 'relative', overflow: 'hidden' }}
  >
    {/* Featured badge */}
    <div
      style={{
        position: 'absolute', top: 16, right: 16,
        background: 'rgba(var(--accent-rgb), 0.12)',
        color: 'var(--accent)',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.68rem', fontWeight: 600,
        padding: '0.2rem 0.55rem',
        borderRadius: 6,
        border: '1px solid rgba(var(--accent-rgb), 0.25)',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
      }}
    >
      Featured
    </div>

    {/* Title */}
    <h3
      style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 700, fontSize: '1.05rem',
        color: 'var(--text-primary)',
        paddingRight: '5rem',
      }}
    >
      {repo.name}
    </h3>

    {/* Description */}
    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65, flexGrow: 1 }}>
      {repo.description}
    </p>

    {/* Topics */}
    {repo.topics?.length > 0 && (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
        {repo.topics.map(t => (
          <span key={t} className="tech-badge">{t}</span>
        ))}
      </div>
    )}

    {/* Footer */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.25rem' }}>
      {repo.language && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <div style={{
            width: 10, height: 10, borderRadius: '50%',
            background: langColor[repo.language] || langColor.default,
          }} />
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
            {repo.language}
          </span>
        </div>
      )}
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex', alignItems: 'center', gap: '0.3rem',
          color: 'var(--accent)', fontSize: '0.82rem', fontWeight: 600,
          textDecoration: 'none', transition: 'opacity 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >
        <Github size={14} /> View Code
      </a>
    </div>
  </motion.div>
);

// ── GitHub repo card ────────────────────────────────────────────────────────
const RepoCard = ({ repo, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, delay: index * 0.07 }}
    viewport={{ once: true }}
    className="glass-card"
    style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}
  >
    {/* Name + link */}
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
      <h4
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700, fontSize: '0.95rem',
          color: 'var(--text-primary)',
          wordBreak: 'break-word',
        }}
      >
        {repo.name}
      </h4>
      <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
           style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}
           onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
           onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          <Github size={15} />
        </a>
        {repo.homepage && (
          <a href={repo.homepage} target="_blank" rel="noopener noreferrer"
             style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}
             onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
             onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <ExternalLink size={15} />
          </a>
        )}
      </div>
    </div>

    {/* Description */}
    <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.6, flexGrow: 1 }}>
      {repo.description || 'No description available.'}
    </p>

    {/* Footer */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: 'auto' }}>
      {repo.language && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <div style={{
            width: 9, height: 9, borderRadius: '50%',
            background: langColor[repo.language] || langColor.default,
          }} />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{repo.language}</span>
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
        <Star size={12} /> {repo.stargazers_count}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
        <GitFork size={12} /> {repo.forks_count}
      </div>
    </div>
  </motion.div>
);

// ── Projects section ────────────────────────────────────────────────────────
const Projects = () => {
  const dispatch = useAppDispatch();
  const { repositories, featuredProjects, loading, error } = useAppSelector((s) => s.portfolio);

  useEffect(() => { dispatch(fetchGitHubRepos()); }, [dispatch]);

  return (
    <section id="projects" style={{ padding: '6rem 1.5rem', background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{ marginBottom: '3rem' }}
        >
          <span className="section-tag">What I've Built</span>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 className="section-title">Featured Projects</h2>
              <p className="section-subtitle">Hand-picked highlights of my best work.</p>
            </div>
            <a
              href="https://github.com/saadkhan01999"
              target="_blank" rel="noopener noreferrer"
              className="btn-outline"
              style={{ flexShrink: 0 }}
            >
              <Github size={16} /> GitHub Profile
            </a>
          </div>
        </motion.div>

        {/* Featured grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
            marginBottom: '3.5rem',
          }}
        >
          {featuredProjects.map((repo, i) => (
            <FeaturedCard key={repo.id} repo={repo} index={i} />
          ))}
        </div>

        {/* ── GitHub Repos ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ marginBottom: '1.5rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ height: 1, flex: 1, background: 'var(--border)' }} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.78rem', color: 'var(--text-secondary)',
              fontWeight: 500, letterSpacing: '0.06em',
            }}>
              LIVE FROM GITHUB
            </span>
            <div style={{ height: 1, flex: 1, background: 'var(--border)' }} />
          </div>
        </motion.div>

        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {error && (
          <div style={{
            padding: '1.5rem', borderRadius: 14, textAlign: 'center',
            border: '1.5px dashed var(--border)',
            color: 'var(--text-secondary)', fontSize: '0.9rem',
          }}>
            <Loader2 size={20} style={{ margin: '0 auto 0.5rem', display: 'block', opacity: 0.5 }} />
            Unable to load GitHub repositories. Check out my{' '}
            <a href="https://github.com/saadkhan01999" target="_blank" rel="noopener noreferrer"
               style={{ color: 'var(--accent)' }}>
              profile directly
            </a>.
          </div>
        )}

        {!loading && !error && repositories.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1rem',
          }}>
            {repositories.slice(0, 9).map((repo, i) => (
              <RepoCard key={repo.id} repo={repo} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
