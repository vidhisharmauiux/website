import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BLOBS = [
  { color: 'rgba(194, 178, 128, 0.7)', left: '10%', top: '15%', w: 300, h: 400 },
  { color: 'rgba(74, 103, 65, 0.7)', left: '60%', top: '10%', w: 400, h: 300 },
  { color: 'rgba(212, 168, 83, 0.7)', left: '30%', top: '50%', w: 350, h: 350 },
  { color: 'rgba(139, 94, 60, 0.7)', left: '70%', top: '55%', w: 280, h: 380 },
  { color: 'rgba(245, 237, 224, 0.7)', left: '15%', top: '80%', w: 320, h: 280 },
  { color: 'rgba(160, 128, 80, 0.7)', left: '55%', top: '85%', w: 360, h: 320 },
];

const STROKE_PATHS = [
  { d: 'M20,160 Q30,150 40,165 T60,150 T80,170', stroke: '#A08050' },
  { d: 'M70,120 C60,110 50,130 40,115 S20,125 10,110', stroke: '#D4A853' },
  { d: 'M85,80 Q75,70 65,85 T45,75 T25,90', stroke: '#C8B89A' },
];

export default function WatercolorDoodleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const doodleRefs = useRef<(SVGImageElement | null)[]>([]);

  useEffect(() => {
    const contentWrapper = document.querySelector('.content-wrapper');
    if (!contentWrapper) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      blobRefs.current.forEach((b) => { if (b) b.style.opacity = '0.7'; });
      pathRefs.current.forEach((p) => { if (p) { p.style.opacity = '1'; p.style.strokeDashoffset = '0'; } });
      doodleRefs.current.forEach((d) => { if (d) d.style.opacity = '0.15'; });
      return;
    }

    // Blob animations
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: contentWrapper,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      },
    });

    blobRefs.current.forEach((blob, i) => {
      if (!blob) return;
      const verticalDrift = i % 2 === 0 ? 120 : i % 3 === 1 ? -180 : 100;
      const xWobble = i % 2 === 0 ? '3%' : '-2%';

      scrollTl.to(blob, { opacity: 0.7, duration: 0.1 }, 0);
      scrollTl.to(blob, { y: `+=${verticalDrift}`, duration: 0.8, ease: 'none' }, 0.1);
      scrollTl.to(blob, { x: `+=${xWobble}`, duration: 0.6, ease: 'none', yoyo: true, repeat: 1 }, 0.2);
      scrollTl.to(blob, { scale: 1.15, duration: 0.9, ease: 'none' }, 0.1);
    });

    // Stroke draw animations
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: contentWrapper,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    pathRefs.current.forEach((path, i) => {
      if (!path) return;
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 });
      masterTl.to(path, { strokeDashoffset: 0, duration: 0.2, ease: 'none' }, i * 0.05);
    });

    // Doodle fade-in animations
    const doodleTl = gsap.timeline({
      scrollTrigger: {
        trigger: contentWrapper,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    doodleRefs.current.forEach((doodle, i) => {
      if (!doodle) return;
      doodleTl.set(doodle, { opacity: 0, scale: 0.95 }, 0);
      doodleTl.to(doodle, { opacity: 0.15, scale: 1, duration: 0.05, ease: 'none' }, 0.4 + i * 0.1);
    });

    return () => {
      scrollTl.kill();
      masterTl.kill();
      doodleTl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    >
      {/* Dark canvas */}
      <div
        style={{
          position: 'absolute',
          inset: '-50% 0',
          backgroundColor: '#000000',
          zIndex: 0,
        }}
      />

      {/* Blob layer */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        {BLOBS.map((blob, i) => (
          <div
            key={i}
            ref={(el) => { blobRefs.current[i] = el; }}
            style={{
              position: 'absolute',
              left: blob.left,
              top: blob.top,
              width: blob.w,
              height: blob.h,
              borderRadius: 9999,
              backgroundColor: blob.color,
              filter: 'blur(100px)',
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* SVG layer */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
        <svg
          viewBox="0 0 100 200"
          preserveAspectRatio="none"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          <defs>
            <filter id="pencil-roughness">
              <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="8" seed="1" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>

          <g filter="url(#pencil-roughness)">
            {STROKE_PATHS.map((p, i) => (
              <path
                key={i}
                ref={(el) => { pathRefs.current[i] = el; }}
                d={p.d}
                fill="none"
                stroke={p.stroke}
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0}
              />
            ))}
          </g>

          <g>
            <image
              ref={(el) => { doodleRefs.current[0] = el; }}
              href="/images/doodle-floral.png"
              x="15"
              y="30"
              width="25"
              height="25"
              opacity="0"
              style={{ transformOrigin: 'center', filter: 'invert(1)' }}
            />
            <image
              ref={(el) => { doodleRefs.current[1] = el; }}
              href="/images/doodle-abstract.png"
              x="60"
              y="45"
              width="20"
              height="20"
              opacity="0"
              style={{ transformOrigin: 'center', filter: 'invert(1)' }}
            />
          </g>
        </svg>
      </div>

      {/* Grain layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          opacity: 0.04,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px',
        }}
      />
    </div>
  );
}
