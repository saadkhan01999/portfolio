import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently under the middle of the viewport.
 * At the very bottom of the page the last section wins, so a short final
 * section (Contact) still becomes active.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join(',');

  useEffect(() => {
    const sectionIds = key.split(',');
    const visible = new Map();

    const pick = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) return setActive(sectionIds[sectionIds.length - 1]);
      const current = sectionIds.find((id) => visible.get(id));
      if (current) setActive(current);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting));
        pick();
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    window.addEventListener('scroll', pick, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', pick);
    };
  }, [key]);

  return active;
}
