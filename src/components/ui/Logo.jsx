/** SSAM monogram (from the original logo) redrawn in SVG so it follows the theme. */
export default function Logo({ className = 'h-10 w-10' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <circle cx="32" cy="32" r="29" className="fill-surface stroke-teal" strokeWidth="3.5" />
      <text
        x="32"
        y="37.5"
        textAnchor="middle"
        className="fill-current"
        style={{ font: '800 15.5px "Manrope Variable", Manrope, sans-serif', letterSpacing: '0.04em' }}
      >
        SSAM
      </text>
    </svg>
  );
}
