'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HEADSHOT_URL = '/images/headshot.png';

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '100M', label: 'Users Impacted' },
  { value: '20+', label: 'Teams Led' },
  { value: '20%', label: 'Dev Time Saved' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
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

      // Photo animation
      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: photoRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Bio paragraphs animation
      if (bioRef.current) {
        const paragraphs = bioRef.current.querySelectorAll('p');
        gsap.fromTo(
          paragraphs,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bioRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Stats animation
      if (statsRef.current) {
        const statItems = statsRef.current.querySelectorAll('.stat-item');
        gsap.fromTo(
          statItems,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
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
    <section
      ref={sectionRef}
      id="about"
      className="section-padding bg-concrete relative"
    >
      {/* Section number */}
      <span className="absolute top-8 right-8 font-mono text-8xl font-bold text-ink/5 select-none hidden lg:block">
        01
      </span>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - Heading & Photo */}
          <div>
            <h2
              ref={headingRef}
              className="heading-lg mb-8"
            >
              <span className="block text-muted font-mono text-sm uppercase tracking-wider mb-4">
                About
              </span>
              I Turn Complex
              <br />
              <span className="text-accent-red">Technical Challenges</span>
              <br />
              Into Delivered Products
            </h2>

            {/* Professional Headshot */}
            <div ref={photoRef} className="relative mt-10 max-w-sm hidden lg:block">
              {/* Brutalist offset shadow */}
              <div className="absolute inset-0 bg-ink translate-x-3 translate-y-3" />
              {/* Photo container */}
              <div className="relative border-[4px] border-ink overflow-hidden">
                <Image
                  src={HEADSHOT_URL}
                  alt="Ali Saleem - Technical Program Manager"
                  width={400}
                  height={500}
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              {/* Caption */}
              <p className="font-mono text-xs text-muted mt-4 uppercase tracking-wider">
                [ Ali Saleem ]
              </p>
            </div>
          </div>

          {/* Right column - Bio */}
          <div ref={bioRef} className="space-y-6">
            <p className="body-lg">
              I&apos;ve spent the last decade shipping critical infrastructure at
              companies like Hulu, Disney+, and now Dave. Platforms where failure
              isn&apos;t an option and millions of users notice when things break.
            </p>

            <p className="body-md text-ink-soft">
              My path was unconventional: accounting degree to business analyst to
              pursuing a Master&apos;s in Software Engineering while leading platform
              teams. I write code. I understand distributed systems. And I know how
              to coordinate 20+ engineering teams to ship on time.
            </p>

            <p className="body-md text-ink-soft">
              What sets me apart: I don&apos;t just manage projects. I build the systems
              that make entire engineering organizations faster. Traffic management
              platforms, developer tooling, chaos testing frameworks. The infrastructure
              that lets other teams move with confidence.
            </p>

            {/* Divider */}
            <hr className="divider-brutal my-10" />

            {/* Stats Grid */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="stat-item card-brutal p-4 text-center"
                >
                  <span className="block text-3xl md:text-4xl font-bold text-accent-red font-mono">
                    {stat.value}
                  </span>
                  <span className="block text-xs uppercase tracking-wider text-muted mt-2 font-mono">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-ink" />
    </section>
  );
}
