import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    quote:
      "Some artists paint walls.\nSome artists create identity.\nThank you for turning our café wall into something people stop and stare at. 🎨☕",
    name: "Kunal Agrawal",
    title: "THC cafe owner mansarovar",
  },
  {
    quote:
      "The doodle art she created for our office transformed a sterile workspace into something that actually inspires creativity. Our team loves it.",
    name: "Vaibhav Sharma",
    title: "Owner of Ridham and Beats, Jaipur",
  },
  {
    quote:
      "There are a very few artists I have ever came across like Vidhi. \nShe is just brilliant at what she does and the best part was, we didn’t have to sit with her for hours trying to make her understand what we want, we just showed her some references, told her what we really want and she just understood that, next thing we saw was whatever our visions were for our wall art, that was there like an imprint in front of us. \nShe is so dedicated towards her work, that even if she is working, you won’t get to know there’s is someone thats the level of dedication and seriousness she has for her work. \nIf you are willing to hire an artist, for any kind of art, Vidhi is the one you can trust blindfolded. \nWe are really happy with what she has delivered to us.",
    name: "Divyan Kapoor",
    title: "From Jackson's Wearhouse, Jaipur",
  },
  {
    quote:
      "Working with Vidhi was an amazing experience. She understood our vision instantly with just a few references and brought it to life exactly as we imagined. Her dedication, professionalism, and attention to detail truly stand out. If you're looking for an artist you can trust completely, Vidhi is the perfect choice. We're absolutely delighted with the final result.",
    name: "Dhruv Sharma",
    title: "V_GTHR Studio",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const heading = headingRef.current;
    const grid = gridRef.current;
    if (!section || !heading || !grid) return;

    // Heading reveal
    gsap.fromTo(
      heading,
      { clipPath: "inset(0 100% 0 0)", opacity: 0 },
      {
        clipPath: "inset(0 0% 0 0)",
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );

    // Cards fade up with stagger
    const cards = grid.querySelectorAll(".testimonial-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: grid,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );

    return () => {
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === section || st.trigger === grid)
        .forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-gallery"
      style={{ position: "relative", zIndex: 1 }}
    >
      <div className="content-max">
        <h2
          ref={headingRef}
          className="heading-gallery mb-16 lg:mb-24"
          style={{ opacity: 0 }}
        >
          KIND WORDS
        </h2>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="testimonial-card relative p-8 lg:p-10"
              style={{
                opacity: 0,
                backgroundColor: "#1A1410",
                borderRadius: "2px",
              }}
            >
              {/* Decorative quotation mark */}
              <span
                className="font-display text-muted-gold absolute top-6 left-6"
                style={{ fontSize: "4rem", lineHeight: 1, opacity: 0.3 }}
              >
                &ldquo;
              </span>

              <blockquote
                className="font-display italic text-warm-cream relative z-10"
                style={{
                  fontSize: "1.3rem",
                  lineHeight: 1.5,
                  marginTop: "2rem",
                }}
              >
                {t.quote}
              </blockquote>

              <footer className="mt-8">
                <p className="font-body font-semibold uppercase tracking-widest text-sm text-dusty-gold">
                  {t.name}
                </p>
                <p className="font-body font-light text-muted-cream text-sm mt-2">
                  {t.title}
                </p>
              </footer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
