import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    if (prefersReducedMotion) {
      gsap.set([headingRef.current, subtitleRef.current, ctaRef.current], { opacity: 1, y: 0 });
      if (watermarkRef.current) watermarkRef.current.style.opacity = '0.08';
      return;
    }

    // Heading: clipPath reveal from left
    tl.fromTo(
      headingRef.current,
      { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
      { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1.2, ease: 'power4.out' },
      0.3
    );

    // Subtitle: fade up
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      0.8
    );

    // CTAs: fade up with stagger
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.15 },
        1.1
      );
    }

    // Watermark: fade in
    tl.fromTo(
      watermarkRef.current,
      { opacity: 0 },
      { opacity: 0.08, duration: 2, ease: 'none' },
      0.5
    );

    // Video auto-play
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    return () => {
      tl.kill();
    };
  }, []);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#000000',
      }}
    >
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
        poster="/images/quote-background.jpg"
      >
        <source src="/videos/hero-mural-painting.mp4" type="video/mp4" />
      </video>

      {/* Radial dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content layer */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          padding: '3rem',
          zIndex: 2,
          maxWidth: '90vw',
        }}
      >
        <h1
          ref={headingRef}
          className="font-display font-semibold uppercase text-warm-cream"
          style={{
            fontSize: 'clamp(3rem, 8vw, 9rem)',
            lineHeight: 0.9,
            opacity: 0,
          }}
        >
          VIDHI SHARMA
        </h1>
        <p
          ref={subtitleRef}
          className="font-body font-light text-muted-cream mt-4"
          style={{
            fontSize: 'clamp(0.9rem, 1.5vw, 1.5rem)',
            letterSpacing: '0.05em',
            opacity: 0,
          }}
        >
          Mural Artist &bull; Wall Art &bull; Doodle Art &bull; Spatial Storytelling
        </p>
        <div ref={ctaRef} className="flex flex-wrap gap-8 mt-8">
          <a
            href="#works"
            onClick={(e) => handleCtaClick(e, '#works')}
            className="btn-ghost-gold"
          >
            View My Work
          </a>
          <a
            href="#contact"
            onClick={(e) => handleCtaClick(e, '#contact')}
            className="btn-ghost-cream"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Watermark */}
      <span
        ref={watermarkRef}
        className="font-hand text-warm-cream hidden lg:block"
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: '3rem',
          fontSize: '11.5rem',
          opacity: 0,
          transform: 'rotate(-5deg)',
          zIndex: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        vs
      </span>
    </section>
  );
}
