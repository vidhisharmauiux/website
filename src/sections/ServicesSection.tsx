import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    num: '01',
    title: 'Custom Murals',
    desc: 'Large-scale wall paintings for cafés, restaurants, hotels, and homes. Each mural is designed specifically for your space, theme, and vision.',
  },
  {
    num: '02',
    title: 'Doodle Art',
    desc: 'Intricate, flowing line-work compositions that transform ordinary surfaces into visual narratives. Perfect for accent walls and creative spaces.',
  },
  {
    num: '03',
    title: 'Canvas Paintings',
    desc: 'Studio works on canvas — from intimate pieces to large statement works. Available for purchase and commission.',
  },
  {
    num: '04',
    title: 'Live Art Events',
    desc: 'On-site mural and doodle creation for events, festivals, brand activations, and workshops. Watch art come to life in real time.',
  },
  {
    num: '05',
    title: 'Interior Consultation',
    desc: 'Collaborative planning to identify the perfect artistic expression for your space — location, style, color palette, and emotional tone.',
  },
  {
    num: '06',
    title: 'Art Workshops',
    desc: 'Guided creative sessions for individuals and groups. Learn doodling techniques, mural basics, and finding your artistic voice.',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;
    if (!section || !heading || !cards) return;

    // Heading reveal
    gsap.fromTo(
      heading,
      { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
      {
        clipPath: 'inset(0 0% 0 0)',
        opacity: 1,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Cards fade up with stagger
    const cardEls = cards.querySelectorAll('.service-card');
    gsap.fromTo(
      cardEls,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: cards,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === section || st.trigger === cards)
        .forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-editorial section-editorial-dark"
      style={{ position: 'relative', zIndex: 1 }}
    >
      <div className="content-max">
        <h2
          ref={headingRef}
          className="heading-editorial !text-warm-cream mb-16 lg:mb-24"
          style={{ opacity: 0 }}
        >
          What I Create
        </h2>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16"
        >
          {SERVICES.map((service) => (
            <div
              key={service.num}
              className="service-card relative bg-warm-dark-surface p-8 lg:p-10"
              style={{
                opacity: 0,
                border: '1px solid rgba(212, 168, 83, 0.25)',
              }}
            >
              {/* Number */}
              <span
                className="font-display font-bold text-warm-cream block mb-4"
                style={{ fontSize: '4rem', opacity: 0.12, lineHeight: 1 }}
              >
                {service.num}
              </span>

              {/* Title */}
              <h3 className="font-display font-medium text-warm-cream text-2xl mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p
                className="font-body font-light leading-relaxed text-muted-cream"
                style={{ fontSize: '1.1rem', lineHeight: 1.6 }}
              >
                {service.desc}
              </p>

              {/* Accent line */}
              <div
                className="mt-6"
                style={{
                  width: '40px',
                  height: '2px',
                  backgroundColor: '#D4A853',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
