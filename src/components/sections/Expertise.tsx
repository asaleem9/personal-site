'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const expertiseAreas = [
  {
    title: 'Delivery Excellence',
    description:
      'Shipping software reliably through structured processes and continuous improvement.',
    icon: '01',
    skills: ['Agile/Scrum', 'Release Management', 'Quality Assurance', 'Incident Response'],
  },
  {
    title: 'Technical Architecture',
    description:
      'Deep technical fluency to drive system design decisions and technical trade-offs.',
    icon: '02',
    skills: ['System Design', 'API Strategy', 'Infrastructure', 'Security & Compliance'],
  },
  {
    title: 'Program Strategy',
    description:
      'Defining roadmaps, setting milestones, and aligning technical initiatives with business objectives.',
    icon: '03',
    skills: ['Roadmap Planning', 'OKR Definition', 'Risk Management', 'Resource Allocation'],
  },
];

function ExpertiseCard({
  expertise,
  index,
}: {
  expertise: (typeof expertiseAreas)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;

    // Hover effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="expertise-card card-brutal p-6 lg:p-8 group cursor-default"
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      {/* Number */}
      <span className="font-mono text-5xl font-bold text-ink/10 group-hover:text-accent-red/20 transition-colors duration-300">
        {expertise.icon}
      </span>

      {/* Title */}
      <h3 className="heading-sm mt-4 mb-3 group-hover:text-accent-red transition-colors duration-300">
        {expertise.title}
      </h3>

      {/* Description */}
      <p className="body-sm text-muted mb-6">{expertise.description}</p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {expertise.skills.map((skill, i) => (
          <span
            key={i}
            className="font-mono text-xs px-2 py-1 border border-ink/20 hover:border-ink hover:bg-ink hover:text-concrete transition-all duration-200"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Hover accent line */}
      <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-accent-red group-hover:w-full transition-all duration-500" />
    </div>
  );
}

export default function Expertise() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Cards stagger animation
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.expertise-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
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
  }, []);

  return (
    <section
      ref={sectionRef}
      id="expertise"
      className="section-padding bg-concrete-dark relative overflow-hidden"
    >
      {/* Section number */}
      <span className="absolute top-8 right-8 font-mono text-8xl font-bold text-ink/5 select-none hidden lg:block">
        02
      </span>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headingRef} className="mb-16 max-w-2xl">
          <span className="block text-muted font-mono text-sm uppercase tracking-wider mb-4">
            Expertise
          </span>
          <h2 className="heading-lg">
            Core <span className="text-accent-red">Competencies</span>
          </h2>
          <p className="body-lg text-ink-soft mt-6">
            A decade of shipping software at scale.
          </p>
        </div>

        {/* Expertise Grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {expertiseAreas.map((expertise, index) => (
            <ExpertiseCard key={index} expertise={expertise} index={index} />
          ))}
        </div>
      </div>

      {/* Decorative grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0A0A0A 1px, transparent 1px),
              linear-gradient(to bottom, #0A0A0A 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-ink" />
    </section>
  );
}
