'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { GitHubRepo } from '@/app/api/github/route';
import RepoCard from './RepoCard';
import RepoFilters, { type SortOption } from './RepoFilters';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function SkeletonCard() {
  return (
    <div className="card-brutal p-6 animate-pulse">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="h-6 bg-ink/10 rounded w-2/3" />
        <div className="h-4 bg-ink/10 rounded w-16" />
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-ink/10 rounded w-full" />
        <div className="h-4 bg-ink/10 rounded w-4/5" />
      </div>
      <div className="flex gap-4 mb-4">
        <div className="h-4 bg-ink/10 rounded w-12" />
        <div className="h-4 bg-ink/10 rounded w-12" />
        <div className="h-4 bg-ink/10 rounded w-20" />
      </div>
      <div className="h-4 bg-ink/10 rounded w-32" />
    </div>
  );
}

export default function GitHub() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('updated');

  // Fetch repos
  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch('/api/github');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setRepos(data);
      } catch (err) {
        setError('Failed to load repositories');
      } finally {
        setIsLoading(false);
      }
    }

    fetchRepos();
  }, []);

  // Extract unique languages
  const languages = useMemo(() => {
    const langSet = new Set<string>();
    repos.forEach((repo) => {
      if (repo.language) langSet.add(repo.language);
    });
    return Array.from(langSet).sort();
  }, [repos]);

  // Filter and sort repos
  const filteredRepos = useMemo(() => {
    let result = [...repos];

    // Filter by language
    if (selectedLanguage) {
      result = result.filter((repo) => repo.language === selectedLanguage);
    }

    // Sort
    switch (sortBy) {
      case 'stars':
        result.sort((a, b) => b.stargazers_count - a.stargazers_count);
        break;
      case 'forks':
        result.sort((a, b) => b.forks_count - a.forks_count);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'updated':
      default:
        result.sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
    }

    return result;
  }, [repos, selectedLanguage, sortBy]);

  // GSAP animations
  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Filters animation
      if (filtersRef.current) {
        gsap.fromTo(
          filtersRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: filtersRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Cards animation
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.repo-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading, filteredRepos]);

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    fetch('/api/github')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => setRepos(data))
      .catch(() => setError('Failed to load repositories'))
      .finally(() => setIsLoading(false));
  };

  return (
    <section
      ref={sectionRef}
      id="github"
      className="section-padding bg-concrete relative"
    >
      {/* Section number */}
      <span className="absolute top-8 right-8 font-mono text-8xl font-bold text-ink/5 select-none hidden lg:block">
        05
      </span>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-12 max-w-2xl">
          <span className="block text-muted font-mono text-sm uppercase tracking-wider mb-4">
            Open Source
          </span>
          <h2 className="heading-lg">
            GitHub <span className="text-accent-red">Repositories</span>
          </h2>
          <p className="body-lg text-ink-soft mt-6">
            Personal projects, experiments, and contributions to open source.
          </p>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="card-brutal p-12 text-center">
            <div className="font-mono text-2xl mb-4">
              <span className="text-accent-red">[</span>
              <span className="text-ink"> CONNECTION FAILED </span>
              <span className="text-accent-red">]</span>
            </div>
            <p className="text-muted mb-6">{error}</p>
            <button onClick={handleRetry} className="btn-brutal">
              Retry
            </button>
          </div>
        )}

        {/* Content */}
        {!isLoading && !error && (
          <>
            {/* Filters */}
            <div ref={filtersRef} className="mb-8">
              <RepoFilters
                languages={languages}
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>

            {/* Grid */}
            {filteredRepos.length > 0 ? (
              <div
                ref={gridRef}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredRepos.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
              </div>
            ) : (
              <div className="card-brutal p-12 text-center">
                <div className="font-mono text-2xl mb-4">
                  <span className="text-accent-red">[</span>
                  <span className="text-ink"> NO REPOS MATCH FILTERS </span>
                  <span className="text-accent-red">]</span>
                </div>
                <button
                  onClick={() => setSelectedLanguage(null)}
                  className="btn-brutal btn-brutal--outline mt-4"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-ink" />
    </section>
  );
}
