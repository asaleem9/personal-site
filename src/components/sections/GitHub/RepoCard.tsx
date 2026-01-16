'use client';

import type { GitHubRepo } from '@/app/api/github/route';

// Language color mapping
const languageColors: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-yellow-400',
  Python: 'bg-green-500',
  Rust: 'bg-orange-600',
  Go: 'bg-cyan-500',
  Java: 'bg-red-500',
  'C++': 'bg-pink-500',
  C: 'bg-gray-500',
  Ruby: 'bg-red-600',
  PHP: 'bg-indigo-400',
  Swift: 'bg-orange-500',
  Kotlin: 'bg-purple-500',
  HTML: 'bg-orange-400',
  CSS: 'bg-blue-400',
  Shell: 'bg-green-400',
  Dockerfile: 'bg-blue-600',
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

interface RepoCardProps {
  repo: GitHubRepo;
}

export default function RepoCard({ repo }: RepoCardProps) {
  const languageColor = repo.language
    ? languageColors[repo.language] || 'bg-gray-400'
    : null;

  return (
    <div className="repo-card card-brutal p-6 flex flex-col h-full group">
      {/* Header with language badge */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-mono text-lg font-bold group-hover:text-accent-red transition-colors duration-200 truncate">
          {repo.name}
        </h3>
        {repo.language && (
          <span className="flex items-center gap-2 flex-shrink-0">
            <span className={`w-3 h-3 rounded-full ${languageColor}`} />
            <span className="font-mono text-xs text-muted">{repo.language}</span>
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-ink-soft mb-4 line-clamp-2 flex-grow">
        {repo.description || 'No description provided'}
      </p>

      {/* Metrics */}
      <div className="flex items-center gap-4 text-xs text-muted font-mono mb-4">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
          </svg>
          {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
          </svg>
          {repo.forks_count}
        </span>
        <span className="flex items-center gap-1">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {formatDate(repo.updated_at)}
        </span>
      </div>

      {/* View on GitHub button */}
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink hover:text-accent-red transition-colors duration-200 group/link"
      >
        <span className="relative">
          View on GitHub
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent-red group-hover/link:w-full transition-all duration-300" />
        </span>
        <svg
          className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </a>
    </div>
  );
}
