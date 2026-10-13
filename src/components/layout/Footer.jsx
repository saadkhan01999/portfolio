import { ArrowUp, Download } from 'lucide-react';
import { navItems, profile, RESUME_URL } from '../../data/profile';
import Logo from '../ui/Logo';
import SocialLinks from '../ui/SocialLinks';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <a href="#home" className="inline-flex items-center gap-3 rounded-lg text-fg">
              <Logo className="h-10 w-10" />
              <span className="font-display text-[1.0625rem] font-bold">{profile.name}</span>
            </a>
            <p className="mt-4 max-w-sm text-caption text-fg-secondary">
              {profile.role} ({profile.stack}) building responsive, reliable web applications. Based in {profile.location}.
            </p>
            <SocialLinks className="mt-6" />
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-fg-muted">Navigate</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 md:grid-cols-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="inline-flex min-h-[2.5rem] items-center text-caption text-fg-secondary transition-colors hover:text-fg">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-fg-muted">Work together</h2>
            <p className="mt-4 text-caption text-fg-secondary">
              Have a project or a role in mind? I’d like to hear about it.
            </p>
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

        <div className="mt-12 flex flex-col-reverse gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8125rem] text-fg-muted">
            © {year} {profile.name}. Built with React, Tailwind CSS and Vite.
          </p>
          <a href="#home" className="btn-ghost -ml-3 self-start text-caption sm:ml-0 sm:self-auto">
            <ArrowUp size={16} aria-hidden="true" />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
