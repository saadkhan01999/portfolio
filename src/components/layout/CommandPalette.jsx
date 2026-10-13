import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Copy,
  CornerDownLeft,
  Download,
  FolderOpen,
  Github,
  Hash,
  Linkedin,
  Mail,
  MessageCircle,
  Moon,
  Search,
} from 'lucide-react';
import { contact, navItems, RESUME_URL, socials } from '../../data/profile';
import { projects } from '../../data/projects';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { closePalette, openCaseStudy } from '../../store/slices/uiSlice';
import { useToggleTheme } from '../../hooks/useToggleTheme';
import { renderAllSections } from '../../lib/renderAll';

/**
 * ⌘K / Ctrl+K command palette: jump to a section, open a project case study,
 * switch theme, copy the email address or grab the résumé — all from the keyboard.
 * Built on <dialog> with the ARIA combobox + listbox pattern.
 */
export default function CommandPalette() {
  const dispatch = useAppDispatch();
  const open = useAppSelector((s) => s.ui.paletteOpen);
  const toggleTheme = useToggleTheme();
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [notice, setNotice] = useState('');

  const commands = useMemo(() => {
    const go = (id) => () => {
      renderAllSections();
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    const link = (href) => () => window.open(href, '_blank', 'noopener,noreferrer');
    const social = (icon) => socials.find((s) => s.icon === icon).href;
    return [
      { group: 'Go to', label: 'Top of the page', icon: Hash, run: go('home'), keywords: 'home start hero' },
      ...navItems.map((n) => ({ group: 'Go to', label: n.label, icon: Hash, run: go(n.id), keywords: n.id })),
      ...projects.map((p) => ({
        group: 'Projects',
        label: p.title,
        hint: p.category,
        icon: FolderOpen,
        run: () => dispatch(openCaseStudy(p.id)),
        keywords: `${p.category} ${p.stack.join(' ')}`,
      })),
      { group: 'Actions', label: 'Switch light / dark theme', icon: Moon, run: () => toggleTheme(), keywords: 'theme dark light mode' },
      {
        group: 'Actions',
        label: 'Copy email address',
        hint: contact.email,
        icon: Copy,
        keep: true,
        run: async () => {
          try {
            await navigator.clipboard.writeText(contact.email);
            setNotice('Email address copied');
          } catch {
            setNotice(`Copy failed — the address is ${contact.email}`);
          }
        },
        keywords: 'mail contact',
      },
      {
        group: 'Actions',
        label: 'Download résumé (PDF)',
        icon: Download,
        run: () => {
          const a = Object.assign(document.createElement('a'), { href: RESUME_URL, download: 'Saad-Bin-Saeed-Khan-Resume.pdf' });
          a.click();
        },
        keywords: 'cv resume pdf',
      },
      { group: 'Actions', label: 'Send an email', icon: Mail, run: () => (window.location.href = `mailto:${contact.email}`), keywords: 'contact hire' },
      { group: 'Social', label: 'WhatsApp', icon: MessageCircle, run: link(contact.whatsappUrl), keywords: 'chat phone' },
      { group: 'Social', label: 'LinkedIn', icon: Linkedin, run: link(social('linkedin')), keywords: 'profile' },
      { group: 'Social', label: 'GitHub profile', icon: Github, run: link(social('github')), keywords: 'profile' },
    ];
  }, [dispatch, toggleTheme]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.hint ?? ''} ${c.group} ${c.keywords ?? ''}`.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setQuery('');
      setActive(0);
      setNotice('');
      dialog.showModal();
      inputRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const run = (cmd) => {
    if (!cmd) return;
    if (!cmd.keep) dispatch(closePalette());
    // Let the dialog close before scrolling or opening something else.
    requestAnimationFrame(() => cmd.run());
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      run(results[active]);
    }
  };

  // Keep result order but render them in ARIA groups (listbox → group → option).
  const groups = [];
  results.forEach((cmd, index) => {
    const last = groups[groups.length - 1];
    if (last && last.name === cmd.group) last.items.push({ cmd, index });
    else groups.push({ name: cmd.group, items: [{ cmd, index }] });
  });

  return (
    <dialog
      ref={dialogRef}
      onClose={() => dispatch(closePalette())}
      onClick={(e) => e.target === dialogRef.current && dispatch(closePalette())}
      aria-label="Command palette"
      className="m-0 mx-auto mt-[12vh] w-[min(40rem,calc(100vw-2rem))] max-w-none overflow-visible bg-transparent p-0 backdrop:bg-[rgb(5_8_18/0.55)] backdrop:backdrop-blur-sm"
    >
      <div className="overflow-hidden rounded-2xl border border-line bg-surface-elevated text-fg shadow-overlay">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search size={18} aria-hidden="true" className="shrink-0 text-fg-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[active] ? `palette-item-${active}` : undefined}
            aria-autocomplete="list"
            aria-label="Search sections, projects and actions"
            placeholder="Search sections, projects and actions…"
            className="h-14 w-full bg-transparent text-[1rem] text-fg placeholder:text-fg-muted focus:outline-none"
          />
          <kbd className="kbd shrink-0">Esc</kbd>
        </div>

        <ul ref={listRef} id="palette-list" role="listbox" aria-label="Results" className="max-h-[min(26rem,60vh)] overflow-y-auto p-2">
          {results.length === 0 && (
            <li role="presentation" className="px-3 py-8 text-center text-caption text-fg-secondary">
              No matches for “{query}”.
            </li>
          )}
          {groups.map((g) => (
            <li key={g.name} role="presentation">
              <p aria-hidden="true" className="px-3 pb-1 pt-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-fg-muted">
                {g.name}
              </p>
              <ul role="group" aria-label={g.name}>
                {g.items.map(({ cmd, index: i }) => {
                  const Icon = cmd.icon;
                  const selected = i === active;
                  return (
                    <li
                      key={`${cmd.group}-${cmd.label}`}
                      id={`palette-item-${i}`}
                      data-index={i}
                      role="option"
                      aria-selected={selected}
                      onMouseMove={() => setActive(i)}
                      onClick={() => run(cmd)}
                      className={`flex min-h-[2.75rem] cursor-pointer items-center gap-3 rounded-xl px-3 py-2 ${
                        selected ? 'bg-accent-subtle text-fg' : 'text-fg-secondary'
                      }`}
                    >
                      <Icon size={18} aria-hidden="true" className={selected ? 'text-accent-fg' : 'text-fg-muted'} />
                      <span className="min-w-0 flex-1 truncate font-medium">{cmd.label}</span>
                      {cmd.hint && <span className="hidden truncate text-[0.8125rem] text-fg-muted sm:block">{cmd.hint}</span>}
                      {selected ? <CornerDownLeft size={16} aria-hidden="true" className="text-accent-fg" /> : <ArrowRight size={16} aria-hidden="true" className="opacity-0" />}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-2.5 text-[0.75rem] text-fg-muted">
          <span className="flex items-center gap-1.5">
            <kbd className="kbd">↑</kbd>
            <kbd className="kbd">↓</kbd> to move <kbd className="kbd ml-2">↵</kbd> to open
          </span>
          <span role="status" aria-live="polite" className="font-medium text-success">
            {notice}
          </span>
        </div>
      </div>
    </dialog>
  );
}
