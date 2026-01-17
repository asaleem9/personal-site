'use client';

import { useEffect, useRef, Suspense } from 'react';
import { gsap } from 'gsap';
import dynamic from 'next/dynamic';

// Dynamic import for 3D scene to avoid SSR issues
const BrutalistScene = dynamic(
  () => import('@/components/three/BrutalistScene'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-concrete flex items-center justify-center">
        <div className="font-mono text-sm animate-pulse">Loading 3D...</div>
      </div>
    ),
  }
);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Animate tag
      if (tagRef.current) {
        tl.fromTo(
          tagRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
          0
        );
      }

      // Animate title - split into lines
      if (titleRef.current) {
        const lines = titleRef.current.querySelectorAll('.title-line');
        tl.fromTo(
          lines,
          { opacity: 0, y: 60, rotateX: -15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power4.out',
          },
          0.2
        );
      }

      // Animate subtitle
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          0.6
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Suspense
          fallback={
            <div className="w-full h-full bg-concrete flex items-center justify-center">
              <div className="font-mono text-sm animate-pulse">
                Initializing...
              </div>
            </div>
          }
        >
          <BrutalistScene />
        </Suspense>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-24">
        <div className="max-w-4xl">
          {/* Tag */}
          <span
            ref={tagRef}
            className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-muted mb-6 border-[2px] border-ink px-3 py-1"
          >
            Lead Technical Program Manager
          </span>

          {/* Main Title */}
          <h1
            ref={titleRef}
            className="heading-xl mb-8"
            style={{ perspective: '1000px' }}
          >
            <span className="title-line block">Turning Technical</span>
            <span className="title-line block">
              <span className="text-accent-red">Chaos</span> Into Delivered
            </span>
            <span className="title-line block text-muted">Products</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="body-lg text-ink-soft max-w-xl leading-relaxed"
          >
            I build the platforms that power streaming for 100M+ users and make
            engineering teams 20% more productive. Currently at Dave, previously
            Hulu/Disney.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-10">
            <button
              onClick={() =>
                document
                  .getElementById('work')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="btn-brutal"
            >
              View My Work
            </button>
            <button
              onClick={() =>
                document
                  .getElementById('contact')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="btn-brutal btn-brutal--outline"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>

      {/* Grid overlay hint */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0A0A0A 1px, transparent 1px),
              linear-gradient(to bottom, #0A0A0A 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>
    </section>
  );
}
