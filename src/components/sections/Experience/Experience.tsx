'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const chapters = [
  {
    id: 1,
    period: '2025 - Present',
    role: 'Lead Technical Program Manager',
    company: 'Dave',
    location: 'Remote',
    highlight: 'Leading DevX, SRE, and Security Engineering for a fintech serving millions',
    description:
      'Driving developer experience, site reliability, and security engineering initiatives at a publicly traded digital banking platform. Building the infrastructure that keeps money moving safely.',
    metrics: [
      { value: 'DevX', label: 'Developer Experience' },
      { value: 'SRE', label: 'Site Reliability' },
      { value: 'Security', label: 'Engineering' },
    ],
  },
  {
    id: 2,
    period: '2019 - 2025',
    role: 'Lead Technical Program Manager',
    company: 'Hulu / Disney Streaming',
    location: 'Santa Monica, CA',
    highlight: 'Shipped the traffic platform that routes every request for 50M+ users',
    description:
      'Owned roadmap for traffic management, drove SuperBowl-ready chaos testing, and built developer tools that cut internal app development time by 20%. Work on metadata platform touched 100M+ users across Hulu, Disney+, and ESPN.',
    metrics: [
      { value: '100M+', label: 'Users Across Disney Portfolio' },
      { value: '20%', label: 'Dev Time Reduced' },
      { value: '3', label: 'Major Platforms' },
    ],
  },
  {
    id: 3,
    period: '2015 - 2019',
    role: 'Senior Technical Program Manager',
    company: 'TrueCar',
    location: 'Santa Monica, CA',
    highlight: 'Led multi-year AWS migration for the entire data platform',
    description:
      'Migrated legacy on-premise data infrastructure to AWS, built the ETL systems powering core billing, and coached 20+ teams on agile practices. Transformed how the engineering org worked.',
    metrics: [
      { value: 'AWS', label: 'Cloud Migration' },
      { value: '20+', label: 'Teams Coached' },
      { value: 'Billing', label: 'Critical Systems' },
    ],
  },
];

function Chapter({
  chapter,
  index,
}: {
  chapter: (typeof chapters)[0];
  index: number;
}) {
  const chapterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chapterRef.current) return;

    const ctx = gsap.context(() => {
      // Content reveal animation
      const content = chapterRef.current?.querySelectorAll('.chapter-content');
      if (content) {
        gsap.fromTo(
          content,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: chapterRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Metrics counter animation
      const metrics = chapterRef.current?.querySelectorAll('.metric-value');
      if (metrics) {
        gsap.fromTo(
          metrics,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: chapterRef.current,
              start: 'top 50%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, chapterRef);

    return () => ctx.revert();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={chapterRef}
      className={`min-h-screen flex items-center py-24 ${
        isEven ? 'bg-concrete' : 'bg-concrete-dark'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div
          className={`grid lg:grid-cols-2 gap-12 lg:gap-24 items-center ${
            isEven ? '' : 'lg:flex-row-reverse'
          }`}
        >
          {/* Content Side */}
          <div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
            {/* Period Tag */}
            <div className="chapter-content">
              <span className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-accent-red border-[2px] border-accent-red px-3 py-1 mb-6">
                {chapter.period}
              </span>
            </div>

            {/* Role & Company */}
            <div className="chapter-content">
              <h3 className="heading-md mb-2">{chapter.role}</h3>
              <p className="font-mono text-sm text-muted mb-6">
                {chapter.company} • {chapter.location}
              </p>
            </div>

            {/* Highlight Quote */}
            <div className="chapter-content">
              <blockquote className="text-2xl lg:text-3xl font-bold leading-tight mb-6 relative pl-6 border-l-[4px] border-ink">
                &ldquo;{chapter.highlight}&rdquo;
              </blockquote>
            </div>

            {/* Description */}
            <div className="chapter-content">
              <p className="body-md text-ink-soft leading-relaxed">
                {chapter.description}
              </p>
            </div>
          </div>

          {/* Metrics Side */}
          <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
            <div className="grid grid-cols-1 gap-4">
              {chapter.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="metric-value card-brutal p-6 lg:p-8 flex items-center gap-6"
                >
                  <span className="text-4xl lg:text-5xl font-bold font-mono text-accent-red">
                    {metric.value}
                  </span>
                  <span className="font-mono text-sm uppercase tracking-wider text-muted">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const chaptersContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="relative">
      {/* Section Header */}
      <div className="section-padding bg-ink text-concrete">
        <div className="max-w-7xl mx-auto">
          <div ref={headerRef} className="max-w-2xl">
            <span className="block text-concrete/60 font-mono text-sm uppercase tracking-wider mb-4">
              Experience
            </span>
            <h2 className="heading-lg text-concrete">
              A Decade of <span className="text-accent-red">Shipping</span>
            </h2>
            <p className="body-lg text-concrete/70 mt-6">
              My journey through technical program management, from
              early startup chaos to enterprise scale.
            </p>
          </div>
        </div>

        {/* Section number */}
        <span className="absolute top-8 right-8 font-mono text-8xl font-bold text-concrete/5 select-none hidden lg:block">
          03
        </span>
      </div>

      {/* Chapters container with timeline */}
      <div ref={chaptersContainerRef} className="relative">
        {/* Timeline indicator - now only within chapters container */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[3px] bg-ink/10 -translate-x-1/2 z-10">
          <div
            className="absolute top-0 left-0 w-full bg-accent-red"
            style={{ height: '100%' }}
          />
        </div>

        {/* Chapters */}
        {chapters.map((chapter, index) => (
          <Chapter key={chapter.id} chapter={chapter} index={index} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="section-padding bg-ink text-concrete text-center relative z-20">
        <p className="font-mono text-sm text-concrete/60 mb-4">
          Want the full picture?
        </p>
        <a
          href="#"
          className="btn-brutal bg-ink text-concrete border-concrete hover:bg-accent-red hover:border-accent-red hover:text-concrete"
        >
          Download Resume
        </a>
      </div>
    </section>
  );
}
