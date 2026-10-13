import { screenshot, phoneScreenshot } from '../lib/images';

// Real projects from github.com/saadkhan01999. Descriptions are based on each
// repository's source code; screenshots were captured from the apps running
// locally. To add a project, append an entry and drop screenshots into
// src/assets/projects/<id>/ as <view>-800.webp and <view>-1600.webp.
//
// `liveUrl: null` means no public deployment is known — add the URL when one exists.

export const filters = [
  { id: 'all', label: 'All' },
  { id: 'full-stack', label: 'Full-stack' },
  { id: 'frontend', label: 'Front-end' },
  { id: 'early', label: 'Early work' },
];

export const projects = [
  {
    id: 'feather-bone',
    featured: true,
    title: 'Feather & Bone',
    category: 'Full-stack · Restaurant commerce',
    filters: ['full-stack'],
    year: '2026',
    role: 'Full-stack development',
    summary:
      'A restaurant commerce suite: customer storefront, point-of-sale terminal, kitchen display and back office, all running on one API.',
    problem:
      'Online orders, counter sales, the kitchen and stock usually live in separate systems that disagree. Here every channel reads and writes the same catalogue, orders and inventory.',
    highlights: [
      'Storefront with menu, cart, checkout, wishlist and live order tracking',
      'POS terminal with shifts, open tickets, barcode slips and JazzCash / Easypaisa / cash payments',
      'Kitchen display and order board updated in real time over Socket.io rooms',
      'Back office for products, inventory, offers, stores, staff, roles and PDF reports',
      'Role-based permissions, rate limiting and an automated API test suite',
    ],
    stack: ['React', 'Vite', 'Tailwind CSS', 'Redux Toolkit', 'TanStack Query', 'Zod', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
    repoUrl: 'https://github.com/saadkhan01999/featherbonepk',
    liveUrl: null,
    gallery: [
      screenshot('feather-bone', 'storefront', 'Feather & Bone storefront home page with navigation, search, cart and an Order now call to action over a restaurant photo', 'Customer storefront'),
      screenshot('feather-bone', 'pos', 'Feather & Bone point-of-sale sign-in screen listing barcode scanning, cash/card/JazzCash payments, slip printing and shared stock', 'POS terminal sign-in'),
      screenshot('feather-bone', 'design-system', 'Feather & Bone design-system page showing colour tokens and button variants', 'Design system and UI tokens'),
      screenshot('feather-bone', 'sign-in', 'Feather & Bone customer sign-in form in the dark gold theme', 'Customer sign-in'),
    ],
  },
  {
    id: 'teche-learning',
    featured: true,
    title: 'Teche Learning Dashboard',
    category: 'Front-end · EdTech dashboard',
    filters: ['frontend'],
    year: '2025',
    role: 'Front-end development',
    summary:
      'A learning-platform dashboard that brings a student’s courses, live sessions, calendar, tasks and achievements into one place.',
    problem:
      'Learners juggle course material, meeting links, deadlines and progress across different tools. The dashboard puts each of these one click away.',
    highlights: [
      'Course creation form with password and one-time-code inputs, plus level-based course tracks',
      'Live-session card with meeting link copy, participants and scheduling actions',
      'Calendar, task list with automatic overdue marking, and achievements with points and levels',
      'State managed in feature slices with Redux Toolkit; responsive sidebar navigation',
    ],
    stack: ['React', 'Redux Toolkit', 'Tailwind CSS', 'Vite', 'Lucide icons'],
    repoUrl: 'https://github.com/saadkhan01999/TecheApp',
    liveUrl: null,
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
    category: 'Mobile · Full-stack',
    filters: ['full-stack'],
    year: '2025',
    status: 'Prototype',
    role: 'Mobile and back-end development',
    summary:
      'A React Native chat app where messages appear instantly for everyone connected and are stored on the server.',
    problem:
      'Explores real-time messaging on mobile: a message has to reach every connected device immediately and still be there after the app restarts.',
    highlights: [
      'Instant message delivery with Socket.io broadcast events',
      'Message history persisted in MongoDB through an Express REST API',
      'Bottom-tab navigation with screens scaffolded for gallery, files, location and contacts',
    ],
    stack: ['React Native', 'Expo', 'React Navigation', 'Socket.io', 'Node.js', 'Express', 'MongoDB'],
    repoUrl: 'https://github.com/saadkhan01999/MobileChatApp',
    liveUrl: null,
    cover: screenshot('chat-app', 'cover', 'Two phone screens of the chat app: the name entry screen and a conversation', 'Chat app overview'),
    gallery: [
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
      'Create, edit and delete records against a REST API (json-server)',
      'Bar and pie charts, sortable data tables and toast feedback',
    ],
    stack: ['React', 'React Router', 'Material UI', 'Chart.js', 'Axios', 'Tailwind CSS'],
    repoUrl: 'https://github.com/saadkhan01999/adminPanel',
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
      'The site you are on: a responsive React portfolio with light and dark themes, project galleries and a working contact form.',
    highlights: [
      'Semantic design tokens with a no-flash light / dark theme',
      'Accessible screenshot carousels and lightbox',
      'Contact form via Netlify Forms, or the optional Express + Nodemailer API',
    ],
    stack: ['React', 'Redux Toolkit', 'Tailwind CSS', 'Framer Motion', 'Vite', 'Express', 'Nodemailer'],
    repoUrl: 'https://github.com/saadkhan01999/portfolio',
    liveUrl: 'https://ssamportfolio.netlify.app/',
    gallery: [
      screenshot('portfolio', 'home-light', 'Portfolio home page in the light theme', 'Light theme'),
      screenshot('portfolio', 'home-dark', 'Portfolio home page in the dark theme', 'Dark theme'),
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
    repoUrl: 'https://github.com/saadkhan01999/university.github.io',
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
    highlights: ['Curved hero and section transitions in pure CSS', 'Pricing table and Swiper-based client carousel', 'Contact and newsletter forms'],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Swiper'],
    repoUrl: 'https://github.com/saadkhan01999/frontend.github.io',
    liveUrl: null,
    gallery: [
      screenshot('frontend-landing', 'home', 'Landing page hero reading We Are The Web Developers on a blue background', 'Hero'),
      screenshot('frontend-landing', 'pricing', 'Landing page pricing section with three plans', 'Pricing section'),
    ],
  },
].map((p) => ({ ...p, gallery: p.gallery.filter(Boolean), cover: p.cover ?? p.gallery.find(Boolean) ?? null }));

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
export const projectRepoNames = new Set(
  projects.map((p) => p.repoUrl?.split('/').pop()?.toLowerCase()).filter(Boolean),
);
