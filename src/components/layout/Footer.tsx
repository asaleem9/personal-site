'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const currentYear = new Date().getFullYear();

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (footerRef.current) {
        gsap.fromTo(
          footerRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 95%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="bg-ink text-concrete border-t-[3px] border-concrete/20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <button
              onClick={scrollToTop}
              className="font-mono text-xl font-bold mb-4 hover:text-accent-red transition-colors"
            >
              [AS]
            </button>
            <p className="text-concrete/60 text-sm leading-relaxed">
              Ali Saleem. Lead TPM shipping infrastructure for 100M+ users.
              Currently at Dave, previously Hulu/Disney.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-concrete/40 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {['About', 'Expertise', 'Experience', 'Work', 'Contact'].map(
                (item) => (
                  <li key={item}>
                    <button
                      onClick={() => {
                        document
                          .getElementById(item.toLowerCase())
                          ?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-concrete/60 hover:text-accent-red transition-colors text-sm"
                    >
                      {item}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-concrete/40 mb-4">
              Connect
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.linkedin.com/in/alisaleem4412/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-concrete/60 hover:text-accent-red transition-colors text-sm"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/alisaleem4412"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-concrete/60 hover:text-accent-red transition-colors text-sm"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="mailto:alisaleem4412@gmail.com"
                  className="text-concrete/60 hover:text-accent-red transition-colors text-sm"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-concrete/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-concrete/40">
            &copy; {currentYear} Ali Saleem. All rights reserved.
          </p>

          {/* Tech Stack Credit */}
          <p className="font-mono text-xs text-concrete/40">
            Built with{' '}
            <span className="text-concrete/60">
              Next.js + Three.js + GSAP + Tailwind
            </span>
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="font-mono text-xs text-concrete/40 hover:text-accent-red transition-colors flex items-center gap-2"
          >
            Back to top
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
