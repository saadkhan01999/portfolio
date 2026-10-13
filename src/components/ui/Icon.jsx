import {
  Database,
  Github,
  Layers,
  LayoutTemplate,
  Linkedin,
  Mail,
  MessageCircle,
  Palette,
  PenTool,
  Server,
  Smartphone,
  Wrench,
} from 'lucide-react';

// Data files reference icons by name so content stays free of component imports.
const ICONS = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  whatsapp: MessageCircle,
  layout: LayoutTemplate,
  layers: Layers,
  server: Server,
  database: Database,
  smartphone: Smartphone,
  palette: Palette,
  pen: PenTool,
  wrench: Wrench,
};

export default function Icon({ name, size = 20, ...props }) {
  const Component = ICONS[name];
  if (!Component) return null;
  return <Component size={size} aria-hidden="true" focusable="false" {...props} />;
}
