import { m } from 'framer-motion';

/**
 * Gentle fade-and-rise as content enters the viewport. Uses transform and
 * opacity only; MotionConfig (App.jsx) turns the movement off for visitors who
 * prefer reduced motion.
 */
export default function Reveal({ as = 'div', delay = 0, y = 16, className, children, ...props }) {
  const Component = m[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </Component>
  );
}
