'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const principles = [
  {
    number: '01',
    title: 'Build Platforms, Not Projects',
    description:
      'I think beyond the immediate deliverable. The best programs create infrastructure that makes every future project easier—like Project Margaret cutting dev time by 20%.',
  },
  {
    number: '02',
    title: 'Technical Depth Earns Trust',
    description:
      'I pursue an MS in Software Engineering and write code because understanding architecture isn\'t optional. Engineers trust TPMs who can review their PRs and speak their language.',
  },
  {
    number: '03',
    title: 'Prove It Before You Need It',
    description:
      'SuperBowl-scale traffic doesn\'t wait for you to be ready. I drive chaos testing and reliability frameworks so we know our systems work before the stakes are highest.',
  },
  {
    number: '04',
    title: 'Ship Relentlessly',
    description:
      'Plans are worthless without execution. I measure success in production deployments, user impact, and teams unblocked—not decks delivered or meetings held.',
  },
];

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Quote animation
      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: quoteRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Principles animation
      if (principlesRef.current) {
        const items = principlesRef.current.querySelectorAll('.principle-item');
        gsap.fromTo(
          items,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: principlesRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative bg-ink text-concrete overflow-hidden"
    >
      {/* Section number */}
      <span className="absolute top-8 right-8 font-mono text-8xl font-bold text-concrete/5 select-none hidden lg:block">
        07
      </span>

      {/* Main Quote Section */}
      <div className="section-padding border-b border-concrete/10">
        <div className="max-w-7xl mx-auto">
          <div ref={quoteRef} className="max-w-4xl">
            <span className="block text-concrete/50 font-mono text-sm uppercase tracking-wider mb-8">
              Philosophy
            </span>

            <blockquote className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8">
              &ldquo;I don&apos;t just manage projects—I{' '}
              <span className="text-accent-red">build the systems</span> that
              make entire engineering organizations{' '}
              <span className="text-accent-blue">move faster</span>.&rdquo;
            </blockquote>

            <p className="body-lg text-concrete/60 max-w-2xl">
              A decade of shipping taught me that the best TPMs are multipliers.
              Traffic management platforms, developer tooling, chaos testing
              frameworks—these aren&apos;t just projects, they&apos;re force
              multipliers. When I build a system that cuts internal app
              development time by 20%, that&apos;s thousands of engineering
              hours returned to actual innovation.
            </p>
          </div>
        </div>
      </div>

      {/* Principles Grid */}
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          <h3 className="heading-md text-concrete mb-12">How I Work</h3>

          <div ref={principlesRef} className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {principles.map((principle, index) => (
              <div
                key={index}
                className="principle-item group flex gap-6"
              >
                {/* Number */}
                <span className="font-mono text-4xl font-bold text-concrete/10 group-hover:text-accent-red/30 transition-colors duration-300">
                  {principle.number}
                </span>

                {/* Content */}
                <div>
                  <h4 className="text-xl font-bold mb-3 group-hover:text-accent-red transition-colors duration-300">
                    {principle.title}
                  </h4>
                  <p className="text-concrete/60 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-[3px] h-32 bg-accent-red/20 hidden lg:block" />
      <div className="absolute bottom-1/4 right-10 w-32 h-[3px] bg-accent-blue/20 hidden lg:block" />
    </section>
  );
}
