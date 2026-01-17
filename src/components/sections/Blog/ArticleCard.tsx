'use client';

import Image from 'next/image';
import type { MediumArticle } from '@/app/api/medium/route';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

interface ArticleCardProps {
  article: MediumArticle;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="article-card group block flex-shrink-0 w-[320px] sm:w-[360px]"
    >
      <div className="card-brutal overflow-hidden h-full flex flex-col">
        {/* Hero Image */}
        <div className="relative h-48 bg-ink/5 overflow-hidden">
          {article.imageUrl ? (
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              sizes="360px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-ink/10">
              <span className="font-mono text-4xl text-ink/20">[IMG]</span>
            </div>
          )}
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-accent-red/0 group-hover:bg-accent-red/10 transition-colors duration-300" />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Date */}
          <span className="font-mono text-xs text-muted mb-2">
            {formatDate(article.pubDate)}
          </span>

          {/* Title */}
          <h3 className="font-bold text-lg leading-tight mb-3 group-hover:text-accent-red transition-colors duration-200 line-clamp-2">
            {article.title}
          </h3>

          {/* Categories */}
          {article.categories.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-auto">
              {article.categories.slice(0, 2).map((cat, i) => (
                <span
                  key={i}
                  className="font-mono text-[10px] px-2 py-0.5 bg-ink/5 text-muted uppercase"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Read on Medium link */}
          <div className="mt-4 pt-3 border-t border-ink/10">
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink group-hover:text-accent-red transition-colors duration-200">
              <span className="relative">
                Read on Medium
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent-red group-hover:w-full transition-all duration-300" />
              </span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
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
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
