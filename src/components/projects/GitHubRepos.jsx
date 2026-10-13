import { useEffect, useRef } from 'react';
import { ArrowUpRight, GitFork, Github, RefreshCw, Star } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { fetchGitHubRepos, GITHUB_USER, langColor } from '../../store/slices/portfolioSlice';
import { projectRepoNames } from '../../data/projects';

const PROFILE_URL = `https://github.com/${GITHUB_USER}`;

/** Public repositories not already presented above, fetched live from GitHub. */
export default function GitHubRepos() {
  const dispatch = useAppDispatch();
  const { repositories, status } = useAppSelector((s) => s.portfolio);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          dispatch(fetchGitHubRepos());
          observer.disconnect();
        }
      },
      { rootMargin: '400px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [dispatch]);

  const extra = repositories.filter((r) => !projectRepoNames.has(r.name.toLowerCase())).slice(0, 6);

  return (
    <div ref={sectionRef} className="mt-20 rounded-card border border-line bg-surface-sunken/60 p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-h3">More on GitHub</h3>
          <p className="mt-2 max-w-prose text-caption text-fg-secondary">
            {status === 'succeeded' && extra.length === 0
              ? 'Every public repository is already presented above. New work appears here automatically.'
              : 'Other public repositories, loaded live from GitHub.'}
          </p>
        </div>
        <a href={PROFILE_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary shrink-0">
          <Github size={18} aria-hidden="true" />
          View GitHub profile
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>

      <div aria-live="polite" aria-busy={status === 'loading'}>
        {status === 'loading' && (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Loading repositories">
            {[0, 1, 2].map((i) => (
              <li key={i} className="h-36 animate-pulse rounded-2xl border border-line bg-surface" />
            ))}
          </ul>
        )}

        {status === 'failed' && (
          <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-dashed border-line-strong/50 p-5 text-caption text-fg-secondary sm:flex-row sm:items-center sm:justify-between">
            <p>GitHub could not be reached right now (it limits anonymous requests). The profile link above always works.</p>
            <button type="button" onClick={() => dispatch(fetchGitHubRepos())} className="btn-ghost shrink-0">
              <RefreshCw size={16} aria-hidden="true" />
              Try again
            </button>
          </div>
        )}

        {status === 'succeeded' && extra.length > 0 && (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {extra.map((repo) => (
              <li key={repo.id}>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 transition-[border-color,box-shadow] duration-200 hover:border-line-strong/50 hover:shadow-card"
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="break-words font-display font-semibold text-fg">{repo.name}</span>
                    <ArrowUpRight size={16} aria-hidden="true" className="mt-1 shrink-0 text-fg-muted transition-colors group-hover:text-accent-fg" />
                  </span>
                  <span className="mt-2 line-clamp-2 flex-1 text-caption text-fg-secondary">
                    {repo.description || 'No description provided.'}
                  </span>
                  <span className="mt-4 flex items-center gap-4 font-mono text-[0.75rem] text-fg-muted">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          aria-hidden="true"
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: langColor[repo.language] || langColor.default }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star size={13} aria-hidden="true" />
                      <span className="sr-only">Stars:</span> {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={13} aria-hidden="true" />
                      <span className="sr-only">Forks:</span> {repo.forks}
                    </span>
                  </span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
