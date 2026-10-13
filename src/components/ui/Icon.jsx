import {
  BarChart3,
  Cpu,
  Database,
  Globe,
  Github,
  Layers,
  LayoutTemplate,
  Linkedin,
  Mail,
  MessageCircle,
  MonitorSmartphone,
  Palette,
  PenTool,
  Server,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  UserRound,
  Wrench,
  Zap,
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
  cpu: Cpu,
  globe: Globe,
  cart: ShoppingCart,
  user: UserRound,
  chart: BarChart3,
  responsive: MonitorSmartphone,
  zap: Zap,
  shield: ShieldCheck,
};

export default function Icon({ name, size = 20, ...props }) {
  const Component = ICONS[name];
  if (!Component) return null;
  return <Component size={size} aria-hidden="true" focusable="false" {...props} />;
}
