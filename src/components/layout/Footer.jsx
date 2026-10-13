import { Download } from 'lucide-react';
import { navItems, profile, RESUME_URL } from '../../data/profile';
import { featuredProjects } from '../../data/projects';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { openCaseStudy } from '../../store/slices/uiSlice';
import Logo from '../ui/Logo';
import SocialLinks from '../ui/SocialLinks';

export default function Footer() {
  const dispatch = useAppDispatch();
  const year = new Date().getFullYear();

  return (
    <footer className="defer-render relative overflow-hidden border-t border-line bg-bg">
      <div className="container-page pt-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <a href="#home" className="inline-flex min-h-[2.75rem] items-center gap-3 rounded-lg text-fg">
              <Logo className="h-10 w-10" />
              <span className="font-display text-[1.0625rem] font-bold">{profile.name}</span>
            </a>
            <p className="mt-4 max-w-sm text-caption text-fg-secondary">
              {profile.role} ({profile.stack}) building custom software, web apps and websites for businesses. Based in {profile.location}.
            </p>
            <SocialLinks className="mt-6" />
          </div>

          <nav aria-label="Footer" className="md:col-span-2">
            <h2 className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-fg-muted">Navigate</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 md:grid-cols-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="inline-flex min-h-[2.75rem] items-center text-caption text-fg-secondary transition-colors hover:text-fg">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <h2 className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-fg-muted">Case studies</h2>
            <ul className="mt-4">
              {featuredProjects.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => dispatch(openCaseStudy(p.id))}
                    className="inline-flex min-h-[2.75rem] items-center text-left text-caption text-fg-secondary transition-colors hover:text-fg"
                  >
                    {p.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-fg-muted">Work together</h2>
            <p className="mt-4 text-caption text-fg-secondary">Have a project or a role in mind? I’d like to hear about it.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="#contact" className="btn-primary">
                Get in touch
              </a>
              <a href={RESUME_URL} download="Saad-Bin-Saeed-Khan-Resume.pdf" className="btn-secondary">
                <Download size={18} aria-hidden="true" />
                Résumé <span className="sr-only">(PDF)</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page">
        {/* Right padding keeps the text clear of the floating back-to-top button. */}
        <div className="mt-14 border-t border-line py-7 pr-20">
          <p className="text-[0.8125rem] text-fg-muted">
            © {year} {profile.name}. Designed and built by me — React, Tailwind CSS and Vite.
          </p>
        </div>
      </div>
    </footer>
  );
}
