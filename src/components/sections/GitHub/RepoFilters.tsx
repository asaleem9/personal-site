'use client';

export type SortOption = 'updated' | 'stars' | 'forks' | 'name';

interface RepoFiltersProps {
  languages: string[];
  selectedLanguage: string | null;
  onLanguageChange: (language: string | null) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'updated', label: 'Recently Updated' },
  { value: 'stars', label: 'Most Stars' },
  { value: 'forks', label: 'Most Forks' },
  { value: 'name', label: 'Alphabetical' },
];

export default function RepoFilters({
  languages,
  selectedLanguage,
  onLanguageChange,
  sortBy,
  onSortChange,
}: RepoFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
      {/* Language filter pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onLanguageChange(null)}
          className={`font-mono text-xs px-3 py-1.5 border-[2px] transition-all duration-200 ${
            selectedLanguage === null
              ? 'border-ink bg-ink text-concrete'
              : 'border-ink hover:bg-ink hover:text-concrete'
          }`}
        >
          All
        </button>
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => onLanguageChange(lang)}
            className={`font-mono text-xs px-3 py-1.5 border-[2px] transition-all duration-200 ${
              selectedLanguage === lang
                ? 'border-ink bg-ink text-concrete'
                : 'border-ink hover:bg-ink hover:text-concrete'
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Sort dropdown */}
      <div className="relative">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="appearance-none font-mono text-xs px-4 py-2 pr-8 border-[2px] border-ink bg-concrete cursor-pointer hover:bg-ink hover:text-concrete transition-all duration-200 focus:outline-none"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
