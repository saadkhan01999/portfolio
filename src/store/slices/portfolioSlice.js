import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const GITHUB_USER = 'saadkhan01999';

// ─── GitHub API thunk ─────────────────────────────────────────────────────────
// Public, unauthenticated endpoint (60 requests/hour per visitor IP). Fetched
// only when the section scrolls near the viewport, and cached for an hour so
// repeat visits do not spend the visitor's rate limit.
const CACHE_KEY = 'github-repos-v1';
const CACHE_TTL_MS = 60 * 60 * 1000;

const readCache = () => {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
    return cached && Date.now() - cached.savedAt < CACHE_TTL_MS ? cached.repos : null;
  } catch {
    return null;
  }
};

const writeCache = (repos) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), repos }));
  } catch {
    /* storage unavailable: fetch again next visit */
  }
};

export const fetchGitHubRepos = createAsyncThunk(
  'portfolio/fetchGitHubRepos',
  async (_, { rejectWithValue, signal }) => {
    const cached = readCache();
    if (cached) return cached;
    try {
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=30`,
        { signal, headers: { Accept: 'application/vnd.github+json' } },
      );
      if (!response.ok) throw new Error(`GitHub responded with ${response.status}`);
      const data = await response.json();
      const repos = data
        .filter((r) => !r.fork && !r.archived)
        .map((r) => ({
          id: r.id,
          name: r.name,
          description: r.description,
          url: r.html_url,
          homepage: r.homepage || null,
          language: r.language,
          stars: r.stargazers_count,
          forks: r.forks_count,
          updatedAt: r.updated_at,
        }));
      writeCache(repos);
      return repos;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch repositories');
    }
  },
  // Skip while a request is in flight or after success; a failed fetch may be retried.
  { condition: (_, { getState }) => !['loading', 'succeeded'].includes(getState().portfolio.status) },
);

// ─── Language → color map (GitHub linguist colours) ───────────────────────────
export const langColor = {
  JavaScript: '#F1E05A',
  TypeScript: '#3178C6',
  Python: '#3572A5',
  CSS: '#563D7C',
  HTML: '#E34C26',
  PHP: '#4F5D95',
  Shell: '#89E051',
  default: '#8492AA',
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    repositories: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGitHubRepos.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchGitHubRepos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.repositories = action.payload;
      })
      .addCase(fetchGitHubRepos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch repositories';
      });
  },
});

export default portfolioSlice.reducer;
