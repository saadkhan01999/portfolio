import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ─── GitHub API thunk ─────────────────────────────────────────────────────────
export const fetchGitHubRepos = createAsyncThunk(
  'portfolio/fetchGitHubRepos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://api.github.com/users/saadkhan01999/repos?sort=updated&per_page=12'
      );
      if (!response.ok) throw new Error('Failed to fetch repositories');
      const data = await response.json();
      // Sort by stars, then by updated date
      return data
        .filter(r => !r.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ─── Featured projects (hand-curated, shown first) ───────────────────────────
const featuredProjects = [
  {
    id: 'feat-1',
    name: 'E-Commerce Platform',
    description: 'Full-stack MERN e-commerce with cart, auth, payments, and admin dashboard. Deployed on Vercel + Railway.',
    html_url: 'https://github.com/saadkhan01999',
    homepage: null,
    topics: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux', 'Stripe'],
    stargazers_count: 0,
    forks_count: 0,
    language: 'JavaScript',
    isFeatured: true,
  },
  {
    id: 'feat-2',
    name: 'Task Management App',
    description: 'Real-time task manager with drag-and-drop boards, team collaboration, and role-based access control.',
    html_url: 'https://github.com/saadkhan01999',
    homepage: null,
    topics: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'Tailwind'],
    stargazers_count: 0,
    forks_count: 0,
    language: 'JavaScript',
    isFeatured: true,
  },
  {
    id: 'feat-3',
    name: 'Portfolio Website',
    description: 'This very portfolio — built with React, Redux Toolkit, Framer Motion, and Tailwind CSS with dark mode support.',
    html_url: 'https://github.com/saadkhan01999',
    homepage: null,
    topics: ['React', 'Redux', 'Tailwind', 'Framer Motion', 'Vite'],
    stargazers_count: 0,
    forks_count: 0,
    language: 'JavaScript',
    isFeatured: true,
  },
];

// ─── Language → color map ─────────────────────────────────────────────────────
export const langColor = {
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Python:     '#3776AB',
  CSS:        '#1572B6',
  HTML:       '#E34F26',
  Shell:      '#4EAA25',
  default:    '#6B7280',
};

const initialState = {
  repositories: [],
  featuredProjects,
  loading: false,
  error: null,
  testimonials: [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Senior Product Manager',
      company: 'TechCorp',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      quote: 'Exceptional developer with great attention to detail. Delivered a high-quality project on time and exceeded our expectations in every way.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'CTO',
      company: 'Startup Inc.',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      quote: 'Outstanding technical skills and excellent communication. A true pleasure to work with on complex, high-pressure projects.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Emily Davis',
      role: 'Lead Designer',
      company: 'DesignStudio',
      avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      quote: 'Brought our vision to life with pixel-perfect execution. The collaboration between design and development was seamless and professional.',
      rating: 5,
    },
    {
      id: 4,
      name: 'Ahmed Al-Rashid',
      role: 'Founder',
      company: 'Digital Agency',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      quote: 'Saad is a reliable, fast, and skilled developer. He consistently delivers clean code and always brings creative solutions to complex problems.',
      rating: 5,
    },
  ],
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGitHubRepos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGitHubRepos.fulfilled, (state, action) => {
        state.loading = false;
        state.repositories = action.payload;
      })
      .addCase(fetchGitHubRepos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch repositories';
      });
  },
});

export default portfolioSlice.reducer;
