// Background for a project's art-directed panel, from its `theme` colours.
export const panelBackground = (t) => ({
  backgroundImage: `radial-gradient(80% 70% at 85% 10%, ${t.glow}40, transparent 60%), linear-gradient(135deg, ${t.from} 0%, ${t.via} 55%, ${t.to} 100%)`,
});
