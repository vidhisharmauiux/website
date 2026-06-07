import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function QuoteBreakSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const quote = quoteRef.current;
    if (!section || !quote) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=100%',
        pin: true,
        scrub: true,
      },
    });

    // Quote fades in over first 30%
    tl.fromTo(
      quote,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'none' },
      0
    );

    // Hold for 50%
    tl.to(quote, { duration: 0.5, ease: 'none' }, 0.3);

    // Fade out over last 20%
    tl.to(quote, { opacity: 0, duration: 0.2, ease: 'none' }, 0.8);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="quote-break"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/quote-background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />

      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.55)',
          zIndex: 1,
        }}
      />

      {/* Quote content */}
      <div
        ref={quoteRef}
        className="flex flex-col items-center justify-center text-center px-6"
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          maxWidth: 800,
          margin: '0 auto',
          opacity: 0,
        }}
      >
        <blockquote
          className="font-display italic text-warm-cream"
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
            lineHeight: 1.2,
            textShadow: '0 2px 40px rgba(0,0,0,0.8)',
          }}
        >
          &ldquo;Art is not what you see, but what you make others feel.&rdquo;
        </blockquote>
        <cite
          className="font-hand text-dusty-gold mt-8 not-italic block"
          style={{ fontSize: '1.5rem' }}
        >
          — Vidhi Sharma
        </cite>
      </div>
    </section>
  );
}
