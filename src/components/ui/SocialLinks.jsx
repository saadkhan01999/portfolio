import { socials } from '../../data/profile';
import Icon from './Icon';

export default function SocialLinks({ className = '', size = 18, include }) {
  const items = include ? socials.filter((s) => include.includes(s.icon)) : socials;
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
      {items.map((s) => {
        const external = s.href.startsWith('http');
        return (
          <li key={s.label}>
            <a
              href={s.href}
              className="icon-btn"
              aria-label={`${s.label}: ${s.handle}`}
              title={s.label}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <Icon name={s.icon} size={size} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
