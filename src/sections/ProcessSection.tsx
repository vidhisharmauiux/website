import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    title: "The Conversation",
    desc: "We start with your story — the feeling you want your space to evoke, the colors you love, the themes that resonate.",
    image: "/images/process-conversation.jpeg",
  },
  {
    num: "02",
    title: "The Vision",
    desc: "I translate our conversation into sketches and digital concepts. You'll see your wall before a single drop of paint touches it.",
    image: "/images/process-vision.jpeg",
  },
  {
    num: "03",
    title: "The Creation",
    desc: "On-site painting begins. Days of focused work, layering color and line, building the world your wall will hold.",
    image: "/images/process-creation.png",
  },
  {
    num: "04",
    title: "The Reveal",
    desc: "The moment of transformation — when a blank surface becomes a living story. Your space, reimagined.",
    image: "/images/process-reveal.jpg",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const heading = headingRef.current;
    const steps = stepsRef.current;
    if (!section || !heading || !steps) return;

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

    // Each step
    const stepEls = steps.querySelectorAll(".process-step");
    stepEls.forEach((step) => {
      const image = step.querySelector(".process-image");
      const text = step.querySelector(".process-text");

      if (image) {
        gsap.fromTo(
          image,
          { scale: 1.15, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      if (text) {
        const children = text.querySelectorAll(".reveal-item");
        gsap.fromTo(
          children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: step,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    });

    // Connecting line draw
    const line = steps.querySelector(".connecting-line") as HTMLElement;
    if (line) {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power2.out",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: steps,
            start: "top 70%",
            end: "bottom 50%",
            scrub: true,
          },
        },
      );
    }

    return () => {
      ScrollTrigger.getAll()
        .filter(
          (st) =>
            st.trigger === section ||
            st.trigger === steps ||
            Array.from(stepEls).includes(st.trigger as Element),
        )
        .forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="section-gallery"
      style={{ position: "relative", zIndex: 1 }}
    >
      <div className="content-max">
        <h2
          ref={headingRef}
          className="heading-gallery mb-16 lg:mb-24"
          style={{ opacity: 0 }}
        >
          THE JOURNEY
        </h2>

        <div ref={stepsRef} className="relative">
          {/* Vertical connecting line */}
          <div
            className="connecting-line hidden lg:block absolute left-1/2 top-0 w-px"
            style={{
              height: "100%",
              backgroundColor: "rgba(160, 128, 80, 0.3)",
              transform: "translateX(-50%)",
            }}
          />

          {STEPS.map((step, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={step.num}
                className={`process-step grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 lg:mb-24 last:mb-0 items-center`}
              >
                {/* Image */}
                <div
                  className={`process-image ${isEven ? "lg:order-1" : "lg:order-2"}`}
                  style={{ opacity: 0 }}
                >
                  <div
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      aspectRatio: "16/10",
                    }}
                  >
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Text */}
                <div
                  className={`process-text ${isEven ? "lg:order-2 lg:pl-8" : "lg:order-1 lg:pr-8"}`}
                >
                  <span
                    className="reveal-item font-body font-medium uppercase tracking-widest text-sm text-dusty-gold block mb-3"
                    style={{ opacity: 0 }}
                  >
                    {step.num}
                  </span>
                  <h3
                    className="reveal-item font-display font-medium text-warm-cream text-3xl lg:text-4xl mb-4"
                    style={{ opacity: 0 }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="reveal-item font-body font-light text-muted-cream leading-relaxed"
                    style={{ fontSize: "1.1rem", lineHeight: 1.6, opacity: 0 }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
