import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const heading = headingRef.current;
    const image = imageRef.current;
    const text = textRef.current;
    if (!section || !heading || !image || !text) return;

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

    // Image reveal
    gsap.fromTo(
      image,
      { scale: 1.15, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: image,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Text paragraphs
    const paragraphs = text.querySelectorAll('.reveal-item');
    gsap.fromTo(
      paragraphs,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: text,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === section || st.trigger === image || st.trigger === text)
        .forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-editorial"
      style={{ position: 'relative', zIndex: 1 }}
    >
      <div className="content-max">
        <h2
          ref={headingRef}
          className="heading-editorial mb-12 lg:mb-16"
          style={{ opacity: 0 }}
        >
          The artist behind the walls
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-start">
          {/* Portrait */}
          <div className="lg:col-span-2" ref={imageRef} style={{ opacity: 0 }}>
            <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4' }}>
              <img
                src="/images/about-portrait.png"
                alt="Vidhi Sharma, mural artist"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Bio text */}
          <div className="lg:col-span-3" ref={textRef}>
            <p
              className="reveal-item font-body font-light leading-relaxed mb-6"
              style={{ color: 'rgba(0,0,0,0.75)', fontSize: '1.25rem', lineHeight: 1.7, opacity: 0 }}
            >
              I&rsquo;m Vidhi Sharma, a mural artist and doodle creator based in Rajasthan, India. What started as sketching in the margins of notebooks grew into a calling to transform the spaces people inhabit every day.
            </p>
            <p
              className="reveal-item font-body font-light leading-relaxed mb-6"
              style={{ color: 'rgba(0,0,0,0.75)', fontSize: '1.25rem', lineHeight: 1.7, opacity: 0 }}
            >
              My work lives at the intersection of fine art and street culture — intricate doodle patterns that flow into bold mural compositions. I&rsquo;ve painted walls in cafés across Jaipur, restored heritage building façades in Udaipur, and created intimate canvas works for collectors in Delhi and Mumbai.
            </p>
            <p
              className="reveal-item font-body font-light leading-relaxed mb-8"
              style={{ color: 'rgba(0,0,0,0.75)', fontSize: '1.25rem', lineHeight: 1.7, opacity: 0 }}
            >
              Each project is a collaboration between my vision and your space&rsquo;s inherent story. When I&rsquo;m not painting, you&rsquo;ll find me exploring Rajasthan&rsquo;s ancient architecture, collecting textures and patterns that find their way into my work.
            </p>
            <a
              href="https://www.instagram.com/artisanvidhi?igsh=MWg1OXByYXJjenBpZQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="reveal-item inline-block font-body font-medium uppercase tracking-widest text-sm transition-colors duration-300"
              style={{
                color: '#000000',
                borderBottom: '1px solid #000000',
                paddingBottom: '4px',
                opacity: 0,
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = '#D4A853';
                (e.target as HTMLElement).style.borderColor = '#D4A853';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = '#000000';
                (e.target as HTMLElement).style.borderColor = '#000000';
              }}
            >
              Follow my journey on Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
