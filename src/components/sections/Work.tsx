'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    id: 1,
    title: 'Traffic Management Platform',
    category: 'Platform Engineering',
    description:
      'Owned the roadmap for Hulu\'s traffic management platform, the ingress layer routing every request across public and internal networks via service mesh.',
    challenge:
      'Hulu needed modern traffic routing capabilities including IPv6 support, advanced traffic shaping, and reliable service-to-service communication at massive scale.',
    approach:
      'Built CDN partnerships, implemented company-wide IPv6 strategy, and designed architecture that could handle both public traffic and internal service mesh routing.',
    outcome:
      'Platform became the critical backbone for all Hulu traffic. Enabled confident scaling for SuperBowl and major live events through integrated chaos testing.',
    technologies: ['Service Mesh', 'CDN', 'IPv6', 'AWS', 'Chaos Engineering'],
    metrics: [
      { label: 'Users Served', value: '50M+' },
      { label: 'Request Routing', value: '100%' },
      { label: 'Live Events', value: 'SuperBowl' },
    ],
  },
  {
    id: 2,
    title: 'Metadata Platform',
    category: 'Multi-Brand Infrastructure',
    description:
      'Enhanced the infrastructure powering content discovery and personalization across Disney\'s entire streaming portfolio including Hulu, Disney+, and ESPN.',
    challenge:
      'Content metadata infrastructure needed to scale across multiple brands while maintaining personalization quality for 100M+ combined users.',
    approach:
      'Led cross-functional coordination to improve the foundation for personalized viewing experiences, ensuring changes benefited all three platforms.',
    outcome:
      'Work touched 100M+ users across three major streaming platforms. Improved content discovery and recommendations across Disney\'s portfolio.',
    technologies: ['Data Platforms', 'Personalization', 'Cross-Brand Architecture'],
    metrics: [
      { label: 'Users Impacted', value: '100M+' },
      { label: 'Platforms', value: '3 Major' },
      { label: 'Brands', value: 'Hulu, Disney+, ESPN' },
    ],
  },
  {
    id: 3,
    title: 'AWS Data Migration',
    category: 'Cloud Infrastructure',
    description:
      'Led the multi-year program migrating TrueCar\'s entire data engineering platform from on-premise data centers to AWS.',
    challenge:
      'Legacy on-premise infrastructure was limiting scalability, slowing innovation, and becoming increasingly expensive to maintain.',
    approach:
      'Coordinated across infrastructure, data engineering, and application teams. Managed dependencies and stakeholder communication throughout multi-year journey.',
    outcome:
      'Delivered modern cloud-native data architecture. Enabled the engineering org to move faster with scalable, cost-effective infrastructure.',
    technologies: ['AWS', 'ETL Systems', 'Big Data', 'Cloud Migration'],
    metrics: [
      { label: 'Migration', value: 'Complete' },
      { label: 'Teams Coordinated', value: '20+' },
      { label: 'Duration', value: 'Multi-Year' },
    ],
  },
];

function ProjectCard({
  project,
  index,
  isExpanded,
  onToggle,
}: {
  project: (typeof projects)[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className={`project-card card-brutal overflow-hidden transition-all duration-500 ${
        isExpanded ? 'lg:col-span-2' : ''
      }`}
    >
      {/* Header */}
      <div
        className="p-6 lg:p-8 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-block font-mono text-xs uppercase tracking-wider text-accent-red mb-2">
              {project.category}
            </span>
            <h3 className="heading-sm">{project.title}</h3>
          </div>
          <button
            className="w-10 h-10 border-[3px] border-ink flex items-center justify-center hover:bg-ink hover:text-concrete transition-colors flex-shrink-0"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            <span
              className={`text-2xl font-mono transition-transform duration-300 ${
                isExpanded ? 'rotate-45' : ''
              }`}
            >
              +
            </span>
          </button>
        </div>

        <p className="body-sm text-muted mt-4">{project.description}</p>

        {/* Quick metrics */}
        <div className="flex flex-wrap gap-4 mt-6">
          {project.metrics.slice(0, 3).map((metric, i) => (
            <div key={i} className="flex items-baseline gap-2">
              <span className="font-mono text-lg font-bold text-accent-red">
                {metric.value}
              </span>
              <span className="text-xs text-muted">{metric.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded Content */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 lg:px-8 pb-6 lg:pb-8 border-t-[3px] border-ink pt-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Challenge */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-muted mb-2">
                Challenge
              </h4>
              <p className="body-sm">{project.challenge}</p>
            </div>

            {/* Approach */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-muted mb-2">
                Approach
              </h4>
              <p className="body-sm">{project.approach}</p>
            </div>

            {/* Outcome */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-muted mb-2">
                Outcome
              </h4>
              <p className="body-sm">{project.outcome}</p>
            </div>
          </div>

          {/* Technologies */}
          <div className="mt-6 pt-6 border-t border-ink/10">
            <h4 className="font-mono text-xs uppercase tracking-wider text-muted mb-3">
              Technologies & Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="font-mono text-xs px-3 py-1 bg-ink text-concrete"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

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

      // Cards animation
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.project-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
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
  }, []);

  const handleToggle = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="section-padding bg-concrete relative"
    >
      {/* Section number */}
      <span className="absolute top-8 right-8 font-mono text-8xl font-bold text-ink/5 select-none hidden lg:block">
        04
      </span>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-16 max-w-2xl">
          <span className="block text-muted font-mono text-sm uppercase tracking-wider mb-4">
            Selected Work
          </span>
          <h2 className="heading-lg">
            Programs <span className="text-accent-red">That Shipped</span>
          </h2>
          <p className="body-lg text-ink-soft mt-6">
            Key programs I&apos;ve shipped across infrastructure and platforms.
          </p>
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isExpanded={expandedId === project.id}
              onToggle={() => handleToggle(project.id)}
            />
          ))}
        </div>

        {/* Note */}
        <p className="font-mono text-xs text-muted text-center mt-12">
          * Details adjusted for confidentiality. Happy to discuss specifics in
          conversation.
        </p>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-ink" />
    </section>
  );
}
