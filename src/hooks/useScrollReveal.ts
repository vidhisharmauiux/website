import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  opacity?: number;
  duration?: number;
  ease?: string;
  triggerStart?: string;
  stagger?: number;
  delay?: number;
  clipPath?: boolean;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const {
      y = 30,
      opacity = 0,
      duration = 0.8,
      ease = 'power3.out',
      triggerStart = 'top 80%',
      delay = 0,
      clipPath = false,
    } = options;

    const fromVars: gsap.TweenVars = {
      opacity,
      y,
      delay,
    };

    if (clipPath) {
      fromVars.clipPath = 'inset(0 100% 0 0)';
    }

    const toVars: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      duration,
      ease,
      scrollTrigger: {
        trigger: el,
        start: triggerStart,
        toggleActions: 'play none none none',
      },
    };

    if (clipPath) {
      toVars.clipPath = 'inset(0 0% 0 0)';
    }

    gsap.fromTo(el, fromVars, toVars);

    return () => {
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === el)
        .forEach((st) => st.kill());
    };
  }, []);

  return ref;
}

export function useStaggerReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(el.children, { opacity: 1, y: 0 });
      return;
    }

    const {
      y = 30,
      opacity = 0,
      duration = 0.8,
      ease = 'power3.out',
      triggerStart = 'top 80%',
      stagger = 0.1,
      delay = 0,
    } = options;

    gsap.fromTo(
      el.children,
      { opacity, y },
      {
        opacity: 1,
        y: 0,
        duration,
        ease,
        stagger,
        delay,
        scrollTrigger: {
          trigger: el,
          start: triggerStart,
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === el)
        .forEach((st) => st.kill());
    };
  }, []);

  return ref;
}
