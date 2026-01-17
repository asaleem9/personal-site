'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { MediumArticle } from '@/app/api/medium/route';
import ArticleCard from './ArticleCard';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const MEDIUM_PROFILE_URL = 'https://medium.com/@alithetpm';

function SkeletonCard() {
  return (
    <div className="flex-shrink-0 w-[320px] sm:w-[360px]">
      <div className="card-brutal overflow-hidden animate-pulse">
        <div className="h-48 bg-ink/10" />
        <div className="p-5">
          <div className="h-3 bg-ink/10 rounded w-20 mb-3" />
          <div className="h-5 bg-ink/10 rounded w-full mb-2" />
          <div className="h-5 bg-ink/10 rounded w-3/4 mb-4" />
          <div className="flex gap-2">
            <div className="h-4 bg-ink/10 rounded w-16" />
            <div className="h-4 bg-ink/10 rounded w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [articles, setArticles] = useState<MediumArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Fetch articles
  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch('/api/medium');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError('Failed to load articles');
      } finally {
        setIsLoading(false);
      }
    }

    fetchArticles();
  }, []);

  // Update scroll button states
  const updateScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons();
      return () => carousel.removeEventListener('scroll', updateScrollButtons);
    }
  }, [articles]);

  // Scroll functions
  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 380;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // GSAP animations
  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
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

      if (trackRef.current) {
        const cards = trackRef.current.querySelectorAll('.article-card');
        gsap.fromTo(
          cards,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: trackRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading, articles]);

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    fetch('/api/medium')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => setArticles(data))
      .catch(() => setError('Failed to load articles'))
      .finally(() => setIsLoading(false));
  };

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="section-padding bg-ink text-concrete relative overflow-hidden"
    >
      {/* Section number */}
      <span className="absolute top-8 right-8 font-mono text-8xl font-bold text-concrete/5 select-none hidden lg:block">
        06
      </span>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="block text-concrete/50 font-mono text-sm uppercase tracking-wider mb-4">
              Writing
            </span>
            <h2 className="heading-lg text-concrete">
              Latest <span className="text-accent-red">Articles</span>
            </h2>
            <p className="body-lg text-concrete/60 mt-6">
              Thoughts on technology, program management, and life.
            </p>
          </div>

          {/* View all link */}
          <a
            href={MEDIUM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-concrete hover:text-accent-red transition-colors group"
          >
            View All on Medium
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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

        {/* Loading state */}
        {isLoading && (
          <div className="flex gap-6 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="card-brutal bg-concrete text-ink p-12 text-center">
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

        {/* Carousel */}
        {!isLoading && !error && articles.length > 0 && (
          <div className="relative">
            {/* Navigation buttons */}
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 border-[3px] border-concrete bg-ink flex items-center justify-center transition-all duration-200 hidden md:flex ${
                canScrollLeft
                  ? 'hover:bg-concrete hover:text-ink hover:border-ink'
                  : 'opacity-30 cursor-not-allowed'
              }`}
              aria-label="Scroll left"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 border-[3px] border-concrete bg-ink flex items-center justify-center transition-all duration-200 hidden md:flex ${
                canScrollRight
                  ? 'hover:bg-concrete hover:text-ink hover:border-ink'
                  : 'opacity-30 cursor-not-allowed'
              }`}
              aria-label="Scroll right"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Carousel track */}
            <div
              ref={carouselRef}
              className="overflow-x-auto scrollbar-hide scroll-smooth"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <div ref={trackRef} className="flex gap-6 pb-4">
                {articles.map((article, index) => (
                  <ArticleCard key={index} article={article} />
                ))}
              </div>
            </div>

            {/* Scroll hint for mobile */}
            <p className="text-center text-concrete/40 font-mono text-xs mt-4 md:hidden">
              Swipe to see more →
            </p>
          </div>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-[3px] h-32 bg-accent-red/20 hidden lg:block" />
      <div className="absolute bottom-1/4 right-10 w-32 h-[3px] bg-accent-blue/20 hidden lg:block" />
    </section>
  );
}
