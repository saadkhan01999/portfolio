import { asset, phoneScreenshot, screenshot } from '../lib/images';

// Projects shown on the site. Descriptions come from each product itself
// (its code, screens or the owner's own product images). Images live in
// src/assets/projects/<id>/ as <view>-800.webp and <view>-1600.webp
// (phones: <view>-390.webp and <view>-780.webp).
//
// `liveUrl: null` means there is no public link to show yet.
// `theme` art-directs the featured card (always a dark panel, white text).

const WIDE = { width: 1600, height: 900 };

export const filters = [
  { id: 'all', label: 'All' },
  { id: 'full-stack', label: 'Full-stack' },
  { id: 'frontend', label: 'Front-end' },
  { id: 'early', label: 'Early work' },
];

const list = [
  {
    id: 'ksf-pharmacy',
    featured: true,
    title: 'KSF Pharmacy System',
    tagline: 'Run your pharmacy, not your paperwork.',
    category: 'SaaS · Pharmacy management',
    filters: ['full-stack'],
    year: '2026',
    role: 'Full-stack development',
    platforms: 'Phone · Tablet · Desktop · Light & dark',
    summary:
      'A multi-tenant SaaS for pharmacies in Pakistan: a fast barcode till, batch and expiry control, prescriptions, customers and accounts for every pharmacy — plus a super admin console that runs the whole platform.',
    problem:
      'Pharmacies juggle paper registers, expiring stock and customers on credit. KSF puts the till, stock, prescriptions and the books in one place, and gives the platform owner a single console for every pharmacy’s plan, payments and support.',
    highlights: [
      'Till with barcode scanning and a keyboard shortcut back to the sale from anywhere',
      'FEFO batches, expiry control and reorder alerts so stock never quietly expires',
      'Prescriptions checked by a pharmacist, and udhaar (credit) for regular customers',
      'Purchasing, suppliers, salaries and expenses, with profit and loss worked out from the day’s trade',
      'Cash, card, Easypaisa, JazzCash and bank-transfer sales reconciled in the accounts',
      'Super admin console: live plans and pricing, income and invoices, platform accounts, a support desk, team roles and a support mode',
      'Role-based access with permissions checked on the server, and every action audited',
    ],
    metrics: [
      { value: '2', label: 'apps in one — pharmacy workspace and super admin console' },
      { value: '5', label: 'payment methods reconciled in the accounts' },
      { value: '3', label: 'screen sizes — phone, tablet and desktop' },
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    liveUrl: null,
    theme: { from: '#04261B', via: '#08442F', to: '#0E7A52', glow: '#34D399', accent: '#6EE7B7' },
    visual: {
      domain: 'KSF Pharmacy System',
      windows: ['overview', 'pharmacies'],
    },
    gallery: [
      screenshot('ksf-pharmacy', 'workspace', 'KSF product slide reading “Run your pharmacy, not your paperwork” beside the pharmacy dashboard on desktop and the new-sale screen on a phone', 'Pharmacy workspace on desktop and phone', WIDE),
      screenshot('ksf-pharmacy', 'till', 'KSF product slide showing the till with barcode search and the current sale, the accounts with profit and loss, and the dashboard on a phone', 'From the counter to the accounts', WIDE),
      screenshot('ksf-pharmacy', 'overview', 'KSF super admin platform overview with pharmacies, income, recurring revenue, support requests, sales and a breakdown by plan', 'Super admin — platform overview'),
      screenshot('ksf-pharmacy', 'console', 'KSF product slide of the super admin console in dark mode with the accounts window showing profit and loss', 'Super admin console in dark mode', WIDE),
      screenshot('ksf-pharmacy', 'pharmacies', 'KSF list of pharmacies with their admin, plan, 30-day sales and recent activity', 'Every pharmacy on the platform'),
    ],
  },
  {
    id: 'feather-bone',
    featured: true,
    title: 'Feather & Bone',
    tagline: 'Roast · Meat · Sweets · Bakery — one platform behind it all.',
    category: 'Full-stack · Restaurant commerce',
    filters: ['full-stack'],
    year: '2026',
    role: 'Full-stack development',
    platforms: 'Website · POS terminal · Kitchen display · Back office',
    summary:
      'A restaurant commerce suite: customer storefront, point-of-sale terminal, kitchen display and back office, all running on one API — live at featherbonepk.com.',
    problem:
      'Online orders, counter sales, the kitchen and stock usually live in separate systems that disagree. Here every channel reads and writes the same catalogue, orders and inventory.',
    highlights: [
      'Storefront with menu, cart, checkout, wishlist and live order tracking',
      'POS terminal with shifts, open tickets, barcode slips and JazzCash / Easypaisa / cash payments',
      'Kitchen display and order board updated in real time',
      'Back office for products, inventory, offers, stores, staff, roles and PDF reports',
      'Role-based permissions, rate limiting and an automated API test suite',
    ],
    metrics: [
      { value: '4', label: 'surfaces — storefront, till, kitchen and back office' },
      { value: '1', label: 'API behind every channel, updated in real time' },
      { value: 'Live', label: 'serving customers at featherbonepk.com' },
    ],
    stack: ['React', 'Vite', 'Tailwind CSS', 'Redux Toolkit', 'TanStack Query', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
    liveUrl: 'https://featherbonepk.com/',
    theme: { from: '#120D06', via: '#2A1C07', to: '#5C3D0A', glow: '#F5B21B', accent: '#FCD34D' },
    visual: {
      domain: 'featherbonepk.com',
      windows: ['story'],
      phone: 'mobile-home',
      floating: ['food-roast-chicken', 'food-sweets', 'food-chicken-tikka'],
    },
    gallery: [
      screenshot('feather-bone', 'cover', 'Feather & Bone website on desktop and phone, surrounded by dishes from the menu', 'Website on desktop and phone'),
      screenshot('feather-bone', 'story', 'Feather & Bone “The story behind our food” page with a restaurant interior photo', 'Our story page'),
      screenshot('feather-bone', 'storefront', 'Feather & Bone storefront home page with navigation, search, cart and an Order now button over a restaurant photo', 'Customer storefront'),
      screenshot('feather-bone', 'pos', 'Feather & Bone point-of-sale sign-in listing barcode scanning, cash/card/JazzCash payments, slip printing and shared stock', 'POS terminal'),
      phoneScreenshot('feather-bone', 'mobile-about', 'Feather & Bone about page on a phone', 'Mobile — our story'),
      screenshot('feather-bone', 'design-system', 'Feather & Bone design-system page showing colour tokens and button variants', 'Design system'),
      screenshot('feather-bone', 'sign-in', 'Feather & Bone customer sign-in form in the dark gold theme', 'Customer sign-in'),
    ],
  },
  {
    id: 'teche-learning',
    featured: true,
    title: 'Teche Learning Dashboard',
    tagline: 'Courses, live sessions and progress in one view.',
    category: 'Front-end · EdTech dashboard',
    filters: ['frontend'],
    year: '2025',
    role: 'Front-end development',
    platforms: 'Responsive web app',
    summary:
      'A learning-platform dashboard that brings a student’s courses, live sessions, calendar, tasks and achievements into one place.',
    problem:
      'Learners juggle course material, meeting links, deadlines and progress across different tools. The dashboard puts each of these one click away.',
    highlights: [
      'Course creation form with password and one-time-code inputs, plus level-based course tracks',
      'Live-session card with meeting-link copy, participants and scheduling actions',
      'Calendar, a task list with automatic overdue marking, and achievements with points and levels',
      'State organised in feature slices with Redux Toolkit; responsive sidebar navigation',
    ],
    metrics: [
      { value: '8', label: 'Redux feature slices' },
      { value: '5', label: 'views — courses, calendar, tasks, achievements, profile' },
    ],
    stack: ['React', 'Redux Toolkit', 'Tailwind CSS', 'Vite'],
    liveUrl: null,
    theme: { from: '#2A0A10', via: '#4C0F1A', to: '#9F1D2E', glow: '#F87171', accent: '#FCA5A5' },
    visual: { domain: 'Teche', windows: ['dashboard', 'achievements'] },
    gallery: [
      screenshot('teche-learning', 'dashboard', 'Teche dashboard with course creation form, filmmaking course levels, live session card and story books', 'Course dashboard'),
      screenshot('teche-learning', 'calendar', 'Teche calendar view with a month grid and upcoming sessions', 'Calendar'),
      screenshot('teche-learning', 'achievements', 'Teche achievements view showing level, points and an earned badge', 'Achievements and points'),
    ],
  },
  {
    id: 'chat-app',
    featured: true,
    title: 'Real-time Chat App',
    tagline: 'Messages that arrive the moment they are sent.',
    category: 'Mobile · Full-stack',
    filters: ['full-stack'],
    year: '2025',
    status: 'Prototype',
    role: 'Mobile and back-end development',
    platforms: 'iOS & Android (React Native)',
    summary:
      'A React Native chat app where messages appear instantly for everyone connected and are stored on the server.',
    problem:
      'Explores real-time messaging on mobile: a message has to reach every connected device immediately and still be there after the app restarts.',
    highlights: [
      'Instant message delivery with Socket.io broadcast events',
      'Message history persisted in MongoDB through an Express REST API',
      'Bottom-tab navigation with screens scaffolded for gallery, files, location and contacts',
    ],
    metrics: [
      { value: '5', label: 'tabbed screens' },
      { value: '2', label: 'sides — a React Native app and a Node.js server' },
    ],
    stack: ['React Native', 'Expo', 'React Navigation', 'Socket.io', 'Node.js', 'Express', 'MongoDB'],
    liveUrl: null,
    theme: { from: '#06101F', via: '#0D1A2D', to: '#1D3B66', glow: '#60A5FA', accent: '#93C5FD' },
    visual: { phones: ['name', 'conversation'] },
    gallery: [
      screenshot('chat-app', 'cover', 'Two phone screens of the chat app: the name entry screen and a conversation', 'Overview'),
      phoneScreenshot('chat-app', 'name', 'Chat app screen asking the user to enter a name before joining', 'Join screen'),
      phoneScreenshot('chat-app', 'conversation', 'Chat app conversation with two sent messages and a message composer', 'Conversation'),
    ],
  },
  {
    id: 'nursery-admin',
    title: 'Plant Nursery Admin Panel',
    category: 'Front-end · Admin dashboard',
    filters: ['frontend'],
    year: '2025',
    role: 'Front-end development',
    summary:
      'A protected admin dashboard for managing a plant nursery’s categories, plants, nurseries and orders, with sales charts.',
    highlights: [
      'Sign-in with protected routes',
      'Create, edit and delete records against a REST API',
      'Bar and pie charts, sortable data tables and toast feedback',
    ],
    stack: ['React', 'React Router', 'Material UI', 'Chart.js', 'Axios', 'Tailwind CSS'],
    liveUrl: null,
    gallery: [
      screenshot('nursery-admin', 'dashboard', 'Nursery admin dashboard with sales, expenses, customers and orders tiles above bar and pie charts', 'Dashboard'),
      screenshot('nursery-admin', 'plants', 'Nursery admin plants table with search, print and column controls', 'Plants table'),
      screenshot('nursery-admin', 'category', 'Nursery admin category list with edit and delete actions', 'Category management'),
      screenshot('nursery-admin', 'login', 'Nursery admin sign-in card on a green background', 'Sign-in'),
    ],
  },
  {
    id: 'portfolio',
    title: 'This Portfolio',
    category: 'Full-stack · Personal site',
    filters: ['full-stack'],
    year: '2026',
    role: 'Design and development',
    summary:
      'The site you are on: a responsive React portfolio with light and dark themes, case studies, a command palette and a working contact form.',
    highlights: [
      'Semantic design tokens with a no-flash light / dark theme',
      'Accessible carousels, case-study dialogs and a command palette',
      'Contact form via Netlify Forms or an Express + Nodemailer API',
    ],
    stack: ['React', 'Redux Toolkit', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    liveUrl: 'https://ssamportfolio.netlify.app/',
    gallery: [
      screenshot('portfolio', 'home-dark', 'Portfolio home page in the dark theme', 'Dark theme'),
      screenshot('portfolio', 'home-light', 'Portfolio home page in the light theme', 'Light theme'),
    ],
  },
  {
    id: 'university-website',
    title: 'Technical University Website',
    category: 'Front-end · Early work',
    filters: ['frontend', 'early'],
    year: '2023',
    role: 'Front-end development',
    summary:
      'A multi-page university website with home, about, courses, blog and contact pages, built as HTML/CSS practice.',
    highlights: ['Five linked pages with a shared layout', 'Contact form posting to a PHP mail handler', 'Embedded campus map'],
    stack: ['HTML5', 'CSS3', 'PHP'],
    liveUrl: null,
    gallery: [
      screenshot('university-website', 'home', 'University website hero with campus photo and navigation', 'Home page'),
      screenshot('university-website', 'campus', 'University website sections for courses offered and campus photos', 'Courses and campus'),
      screenshot('university-website', 'courses', 'University website courses page header', 'Courses page'),
    ],
  },
  {
    id: 'frontend-landing',
    title: 'Web Studio Landing Page',
    category: 'Front-end · Early work',
    filters: ['frontend', 'early'],
    year: '2023',
    role: 'Front-end development',
    summary: 'A single-page landing site for a web development service with services, pricing, client and contact sections.',
    highlights: ['Curved hero and section transitions in pure CSS', 'Pricing table and a Swiper-based client carousel', 'Contact and newsletter forms'],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Swiper'],
    liveUrl: null,
    gallery: [
      screenshot('frontend-landing', 'home', 'Landing page hero reading We Are The Web Developers on a blue background', 'Hero'),
      screenshot('frontend-landing', 'pricing', 'Landing page pricing section with three plans', 'Pricing section'),
    ],
  },
];

// Resolve image names in `visual` once, so components receive ready <img> data.
const resolveVisual = (p) => {
  if (!p.visual) return null;
  const { windows = [], phones = [], phone, floating = [], domain } = p.visual;
  return {
    domain,
    windows: windows.map((v) => screenshot(p.id, v, '', '')).filter(Boolean),
    phones: [...phones, ...(phone ? [phone] : [])].map((v) => phoneScreenshot(p.id, v, '', '')).filter(Boolean),
    floating: floating.map((f) => asset(p.id, f)).filter(Boolean),
  };
};

export const projects = list.map((p) => {
  const gallery = p.gallery.filter(Boolean);
  return { ...p, gallery, cover: gallery[0] ?? null, visual: resolveVisual(p) };
});

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
export const projectById = Object.fromEntries(projects.map((p) => [p.id, p]));
