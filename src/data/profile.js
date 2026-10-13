// Personal and professional facts. Everything here comes from the résumé
// (public/resume) or the original portfolio — edit this file, not components.

export const RESUME_URL = '/resume/saad-bin-saeed-khan-resume.pdf';

export const profile = {
  name: 'Saad Bin Saeed Khan',
  shortName: 'Saad',
  compactName: 'Saad Khan', // used where the full name does not fit (narrow phones)
  role: 'Full Stack Developer',
  stack: 'MERN Stack',
  location: 'Pakistan',
  availability: 'Available for freelance & full-time work',
  replyWindow: 'within 24 hours',
  responseTime: 'I typically reply within 24 hours',
  summary:
    'Web application engineer with a strong command of front-end, back-end and database technologies.',
};

export const contact = {
  email: 'saadkhan01999@gmail.com',
  phoneDisplay: '+92 315 091 3280',
  whatsappUrl: 'https://wa.me/923150913280',
};

// `icon` keys map to components in components/ui/SocialIcon.jsx.
export const socials = [
  { label: 'GitHub', handle: '@saadkhan01999', href: 'https://github.com/saadkhan01999', icon: 'github' },
  { label: 'LinkedIn', handle: 'in/saadkhan01', href: 'https://www.linkedin.com/in/saadkhan01/', icon: 'linkedin' },
  { label: 'Email', handle: contact.email, href: `mailto:${contact.email}`, icon: 'mail' },
  { label: 'WhatsApp', handle: contact.phoneDisplay, href: contact.whatsappUrl, icon: 'whatsapp' },
];

export const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
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

// Listed on the résumé.
export const certifications = [
  { title: 'Backend Development (Node.js)', issuer: 'Mindluster' },
  { title: 'Fundamental JavaScript Programming', issuer: null },
  { title: 'HTML/CSS Essential Training', issuer: null },
  { title: 'Full Stack / MERN Stack course', issuer: 'Digital Pakistan', note: 'In progress at the time of the résumé' },
];

// Milestones backed by the public repositories' commit history.
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
    period: '2025',
    title: 'React dashboards and a React Native app',
    body: 'Built a learning-platform dashboard with Redux Toolkit, a plant-nursery admin panel with charts and data tables, and a real-time chat app with React Native, Socket.io and MongoDB.',
    projectIds: ['teche-learning', 'nursery-admin', 'chat-app'],
  },
  {
    period: '2026',
    title: 'Feather & Bone commerce suite',
    body: 'A restaurant platform where the storefront, point of sale, kitchen display and back office all run on one Express + MongoDB API.',
    projectIds: ['feather-bone'],
  },
];

// Services map to the "Expertise" list on the résumé.
export const services = [
  {
    icon: 'layers',
    title: 'Full-stack web applications',
    problem: 'You need more than a brochure site: accounts, dashboards, data and business rules.',
    deliverable: 'A responsive React app with a Node.js / Express API and MongoDB, deployed and documented.',
  },
  {
    icon: 'pen',
    title: 'Design to responsive code',
    problem: 'You have PSD, Sketch or XD designs that must look right on every screen.',
    deliverable: 'Clean, responsive HTML5 / CSS3 built with Tailwind CSS or Bootstrap.',
  },
  {
    icon: 'server',
    title: 'Back-end & REST APIs',
    problem: 'Your front end needs a reliable API, authentication and a data model that can grow.',
    deliverable: 'Validated Express endpoints, JWT auth, role-based access and MongoDB schemas.',
  },
  {
    icon: 'smartphone',
    title: 'Mobile apps with React Native',
    problem: 'You want your product on phones without maintaining two native codebases.',
    deliverable: 'A cross-platform React Native (Expo) app connected to your API.',
  },
];

export const process = [
  { title: 'Discover', body: 'Understand your users, goals and constraints before any code is written.' },
  { title: 'Plan', body: 'Agree on scope, milestones and the stack that fits — in plain language.' },
  { title: 'Design', body: 'Translate requirements into layouts and data models you can review early.' },
  { title: 'Build', body: 'Ship in small, working increments you can try as the project grows.' },
  { title: 'Test', body: 'Check behaviour, edge cases and responsiveness across devices.' },
  { title: 'Deliver', body: 'Deploy to production and hand over the source code and setup notes.' },
];
