'use client';

import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'github', label: 'GitHub' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Track scroll position for nav background
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Set up ScrollTrigger for each section
    navItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        ScrollTrigger.create({
          trigger: element,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        });
      }
    });

    // Animate nav in on load
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: 'power3.out' }
      );
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Close mobile menu on scroll
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-concrete/95 backdrop-blur-sm border-b-[3px] border-ink'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo/Name */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-mono text-sm font-bold uppercase tracking-wider hover:text-accent-red transition-colors"
            >
              Ali Saleem
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`relative px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
                    activeSection === id
                      ? 'text-accent-red'
                      : 'text-ink hover:text-accent-red'
                  }`}
                >
                  {label}
                  {activeSection === id && (
                    <span className="absolute bottom-0 left-4 right-4 h-[3px] bg-accent-red" />
                  )}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => scrollToSection('contact')}
              className="hidden md:block btn-brutal text-xs py-1.5 px-3"
            >
              Get in Touch
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 border-[3px] border-ink hover:bg-ink hover:text-concrete transition-colors relative z-[60] bg-concrete"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Outside nav for proper z-index */}
      <div
        className={`fixed inset-0 bg-ink/80 z-[100] md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel - Outside nav for proper z-index */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] border-l-[3px] border-ink z-[110] md:hidden transform transition-transform duration-300 ease-out shadow-2xl ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: '#e8e4df' }}
      >
        <div className="flex flex-col h-full pt-24 pb-8 px-6">
          {/* Nav Items */}
          <div className="flex flex-col gap-2">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`text-left py-3 px-4 font-mono text-sm uppercase tracking-wider border-[2px] transition-all duration-200 ${
                  activeSection === id
                    ? 'border-accent-red bg-accent-red text-concrete'
                    : 'border-ink hover:bg-ink hover:text-concrete bg-[#e8e4df]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* CTA at bottom */}
          <div className="mt-auto">
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-brutal btn-brutal--accent w-full text-xs py-2"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
