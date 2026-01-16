import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Easing presets
export const easings = {
  brutal: 'power4.out',
  smooth: 'power2.out',
  bounce: 'elastic.out(1, 0.5)',
  snap: 'power4.inOut',
} as const;

// Animation presets
export const animations = {
  // Fade in from bottom
  fadeUp: {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, duration: 0.8, ease: easings.brutal },
  },

  // Fade in from left
  fadeIn: {
    from: { opacity: 0, x: -30 },
    to: { opacity: 1, x: 0, duration: 0.6, ease: easings.smooth },
  },

  // Scale in
  scaleIn: {
    from: { opacity: 0, scale: 0.9 },
    to: { opacity: 1, scale: 1, duration: 0.5, ease: easings.brutal },
  },

  // Reveal (for text lines)
  reveal: {
    from: { y: '100%', opacity: 0 },
    to: { y: '0%', opacity: 1, duration: 0.8, ease: easings.brutal },
  },
} as const;

// Stagger configuration for lists
export const staggerConfig = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
} as const;

// Create scroll-triggered animation
export function createScrollAnimation(
  trigger: string | Element,
  animation: gsap.TweenVars,
  options?: ScrollTrigger.Vars
) {
  return gsap.fromTo(trigger, animation, {
    ...animation,
    scrollTrigger: {
      trigger,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      ...options,
    },
  });
}

// Batch animation for multiple elements
export function animateOnScroll(
  selector: string,
  animation: typeof animations[keyof typeof animations],
  stagger: number = staggerConfig.normal
) {
  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) return;

  gsap.fromTo(elements, animation.from, {
    ...animation.to,
    stagger,
    scrollTrigger: {
      trigger: elements[0],
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });
}

// Text split animation (reveal each word)
export function splitTextAnimation(element: Element, delay: number = 0) {
  const text = element.textContent || '';
  const words = text.split(' ');

  element.innerHTML = words
    .map(
      (word) =>
        `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`
    )
    .join(' ');

  const innerSpans = element.querySelectorAll('span > span');

  return gsap.fromTo(
    innerSpans,
    { y: '100%', opacity: 0 },
    {
      y: '0%',
      opacity: 1,
      duration: 0.8,
      stagger: 0.03,
      delay,
      ease: easings.brutal,
    }
  );
}

// Parallax effect
export function createParallax(
  element: string | Element,
  speed: number = 0.5,
  direction: 'y' | 'x' = 'y'
) {
  return gsap.to(element, {
    [direction]: () => window.innerHeight * speed * -1,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}

// Pin section during scroll
export function pinSection(
  trigger: string | Element,
  duration: string | number = '+=100%'
) {
  return ScrollTrigger.create({
    trigger,
    start: 'top top',
    end: duration,
    pin: true,
    pinSpacing: true,
  });
}

// Magnetic effect for buttons
export function createMagneticEffect(element: HTMLElement, strength: number = 0.3) {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  // Return cleanup function
  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
}

// Horizontal scroll section
export function createHorizontalScroll(
  container: string | Element,
  panels: string | Element
) {
  const panelElements = gsap.utils.toArray(panels);

  return gsap.to(panelElements, {
    xPercent: -100 * (panelElements.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      snap: 1 / (panelElements.length - 1),
      end: () => `+=${(container as HTMLElement).offsetWidth}`,
    },
  });
}

// Counter animation
export function animateCounter(
  element: Element,
  endValue: number,
  duration: number = 2,
  prefix: string = '',
  suffix: string = ''
) {
  const counter = { value: 0 };

  return gsap.to(counter, {
    value: endValue,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = `${prefix}${Math.round(counter.value)}${suffix}`;
    },
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });
}
