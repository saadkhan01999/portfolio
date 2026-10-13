// Personal and professional facts. Everything here comes from the résumé
// (public/resume), the original portfolio or the projects themselves —
// edit this file, not components.

import { certificateImage } from '../lib/images';

export const RESUME_URL = '/resume/saad-bin-saeed-khan-resume.pdf';

export const profile = {
  name: 'Saad Bin Saeed Khan',
  shortName: 'Saad',
  compactName: 'Saad Khan', // used where the full name does not fit (narrow phones)
  role: 'Full Stack Developer',
  stack: 'MERN Stack',
  location: 'Pakistan',
  timeZone: 'Asia/Karachi',
  timeZoneLabel: 'PKT · UTC+5',
  availability: 'Available for freelance & full-time work',
  replyWindow: 'within 24 hours',
  responseTime: 'I typically reply within 24 hours',
  summary:
    'Web application engineer with a strong command of front-end, back-end and database technologies.',
};

// Hero headline: "I build {word} that businesses run on."
export const heroWords = ['custom software', 'SaaS platforms', 'websites', 'POS systems', 'web apps', 'mobile apps'];

export const contact = {
  email: 'saadkhan01999@gmail.com',
  phoneDisplay: '+92 315 091 3280',
  whatsappUrl: 'https://wa.me/923150913280',
};

// `icon` keys map to components in components/ui/Icon.jsx.
export const socials = [
  { label: 'GitHub', handle: '@saadkhan01999', href: 'https://github.com/saadkhan01999', icon: 'github' },
  { label: 'LinkedIn', handle: 'in/saadkhan01', href: 'https://www.linkedin.com/in/saadkhan01/', icon: 'linkedin' },
  { label: 'Email', handle: contact.email, href: `mailto:${contact.email}`, icon: 'mail' },
  { label: 'WhatsApp', handle: contact.phoneDisplay, href: contact.whatsappUrl, icon: 'whatsapp' },
];

export const navItems = [
  { label: 'Work', id: 'work' },
  { label: 'Services', id: 'services' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Journey', id: 'journey' },
  { label: 'Contact', id: 'contact' },
];

export const education = [
  {
    institution: 'Abdul Wali Khan University',
    credential: 'MS / MPhil in Computer Science',
    period: '2023 – 2025',
  },
];

// Certificates with a scan are shown as cards that open in the viewer;
// the rest are listed from the résumé.
export const certificates = [
  {
    id: 'full-stack-digital-pakistan',
    title: 'Full Stack Web Development',
    issuer: 'Digital Pakistan',
    date: '4 September 2025',
    credential: 'Verification ID 800108',
    image: certificateImage('full-stack-digital-pakistan', [600, 900], { width: 900, height: 700 },
      'Digital Pakistan certificate of completion presented to Saad bin Saeed for the Full Stack Web Development course, dated 4 September 2025, verification ID 800108',
      'Full Stack Web Development — Digital Pakistan, 4 September 2025'),
  },
  {
    id: 'backend-mindluster',
    title: 'Backend Development',
    issuer: 'Mindluster',
    date: '8 May 2024',
    credential: 'Certificate No. 17469166955',
    image: certificateImage('backend-mindluster', [800, 1600], { width: 1600, height: 1131 },
      'Mindluster certificate of achievement presented to Saad Bin Saeed Khan for completing a course about Backend Development, dated 8 May 2024, certificate number 17469166955',
      'Backend Development — Mindluster, 8 May 2024'),
  },
];

export const certifications = [
  { title: 'Fundamental JavaScript Programming', issuer: null },
  { title: 'HTML/CSS Essential Training', issuer: null },
];

// Milestones backed by the projects' own history.
export const journey = [
  {
    period: '2023',
    title: 'First websites',
    body: 'Multi-page HTML, CSS and JavaScript sites — a university website with course, blog and contact pages, and a responsive landing page.',
    projectIds: ['university-website', 'frontend-landing'],
  },
  {
    period: '2023 – 2025',
    title: 'MS / MPhil in Computer Science',
    body: 'Postgraduate study at Abdul Wali Khan University alongside hands-on MERN development.',
  },
  {
    period: '2024',
    title: 'Certified in back-end development',
    body: 'Completed Mindluster’s Backend Development course — the server side of the stack: Node.js, APIs and databases.',
    certificateId: 'backend-mindluster',
  },
  {
    period: '2025',
    title: 'React dashboards and a React Native app',
    body: 'A learning-platform dashboard with Redux Toolkit, a plant-nursery admin panel with charts and data tables, and a real-time chat app with React Native, Socket.io and MongoDB.',
    projectIds: ['teche-learning', 'nursery-admin', 'chat-app'],
  },
  {
    period: '2025',
    title: 'Full Stack Web Development, Digital Pakistan',
    body: 'Completed Digital Pakistan’s Full Stack Web Development course on the MERN stack — MongoDB, Express, React and Node.js.',
    certificateId: 'full-stack-digital-pakistan',
  },
  {
    period: '2026',
    title: 'Feather & Bone goes live',
    body: 'A restaurant platform where the storefront, point of sale, kitchen display and back office all run on one Express + MongoDB API — live at featherbonepk.com.',
    projectIds: ['feather-bone'],
  },
  {
    period: '2026',
    title: 'KSF Pharmacy System',
    body: 'A multi-tenant SaaS for pharmacies in Pakistan, built with React, TypeScript, Node.js and MongoDB — a pharmacy workspace plus a super admin console for the whole platform.',
    projectIds: ['ksf-pharmacy'],
  },
  {
    period: '2026',
    title: 'Adeena Traders',
    body: 'An instalment and retail management system for a retailer in Mardan — instalment plans, inventory, a digital wallet, English / Urdu agreements and print-ready invoices, on desktop and phone.',
    projectIds: ['adeena-traders'],
  },
];

// Services offered to clients. Each one names a project above where it has
// already been shipped (`proof`), so nothing here is a promise without work behind it.
export const services = [
  {
    icon: 'cpu',
    title: 'Custom software',
    pitch: 'Software built around the way your business actually works — not the other way round.',
    points: ['POS, inventory, instalment and billing systems', 'Roles, reports, printing and WhatsApp reminders', 'Runs on your counter PC, tablet and phone'],
    proof: 'Adeena Traders, KSF Pharmacy System',
    featured: true,
  },
  {
    icon: 'globe',
    title: 'Business websites',
    pitch: 'A website for any business that turns visitors into customers, calls and orders.',
    points: ['Shops, restaurants, clinics, schools, agencies and services', 'WhatsApp, contact forms and Google Maps built in', 'Fast, SEO-ready and easy to update'],
    proof: 'Feather & Bone, Technical University Website',
    featured: true,
  },
  {
    icon: 'layers',
    title: 'Web apps & SaaS',
    pitch: 'Web apps with accounts, roles, dashboards and payments — multi-tenant when you need it.',
    points: ['React front end, Node.js / Express API, MongoDB', 'Secure sign-in, permissions and audit logs', 'Deployed, documented and ready to grow'],
    proof: 'KSF Pharmacy System, Teche Learning Dashboard',
  },
  {
    icon: 'palette',
    title: 'Custom website design',
    pitch: 'A one-of-a-kind design that looks like your brand — never a template.',
    points: ['Built from your brand, Figma, XD or PSD', 'Pixel-perfect on every screen size', 'Smooth animations, light and dark themes'],
    proof: 'This portfolio, Web Studio landing page',
  },
  {
    icon: 'cart',
    title: 'E-commerce & online ordering',
    pitch: 'Sell online with a store your customers enjoy using.',
    points: ['Catalogue, cart, checkout and order tracking', 'JazzCash, EasyPaisa, card and cash payments', 'Admin for products, stock and orders'],
    proof: 'Feather & Bone',
  },
  {
    icon: 'user',
    title: 'Portfolio & personal websites',
    pitch: 'A portfolio that makes clients and employers want to work with you.',
    points: ['For professionals, freelancers and creators', 'Case studies, galleries and a working contact form', 'Personal branding, SEO and social sharing'],
    proof: 'This portfolio',
  },
  {
    icon: 'chart',
    title: 'Dashboards & admin panels',
    pitch: 'See your whole business at a glance — and decide faster.',
    points: ['KPIs, charts, data tables, filters and exports', 'Printable reports, invoices and receipts', 'Live numbers where they matter'],
    proof: 'Adeena Traders, Plant Nursery Admin Panel',
  },
  {
    icon: 'smartphone',
    title: 'Mobile apps',
    pitch: 'Your product on Android and iOS from a single codebase.',
    points: ['Cross-platform React Native (Expo)', 'Connected to your API, with real-time features', 'Same brand and data as your website'],
    proof: 'Real-time Chat App',
  },
];

// Included in every project.
export const promises = [
  { icon: 'responsive', title: 'Mobile-responsive', body: 'Looks and works perfectly on phones, tablets, laptops and big screens.' },
  { icon: 'zap', title: 'Fast & SEO-ready', body: 'Quick to load and easy for customers to find on Google.' },
  { icon: 'shield', title: 'Secure by design', body: 'Protected sign-in, role-based access and validated data.' },
  { icon: 'whatsapp', title: 'Clear communication', body: 'Regular updates in plain language, from the first call to launch day.' },
];

export const process = [
  { title: 'Discover', body: 'Understand your users, goals and constraints before any code is written.' },
  { title: 'Plan', body: 'Agree on scope, milestones and the stack that fits — in plain language.' },
  { title: 'Design', body: 'Translate requirements into layouts and data models you can review early.' },
  { title: 'Build', body: 'Ship in small, working increments you can try as the project grows.' },
  { title: 'Test', body: 'Check behaviour, edge cases and responsiveness across devices.' },
  { title: 'Deliver', body: 'Deploy to production and hand over everything you need to run it.' },
];
