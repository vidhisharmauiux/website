import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const heading = headingRef.current;
    const imageContainer = imageContainerRef.current;
    const text = textRef.current;
    if (!section || !heading || !imageContainer || !text) return;

    const triggers: ScrollTrigger[] = [];

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

    // Image reveal with scale
    gsap.fromTo(
      imageContainer,
      { scale: 1.2, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageContainer,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      },
    );

    // Text fade up
    const textChildren = text.querySelectorAll(".reveal-item");
    gsap.fromTo(
      textChildren,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: text,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );

    return () => {
      triggers.forEach((t) => t.kill());
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
          EVERY WALL DESERVES A STORY
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-center">
          {/* Image */}
          <div
            className="lg:col-span-3"
            ref={imageContainerRef}
            style={{ opacity: 0 }}
          >
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                aspectRatio: "3/2",
              }}
            >
              <img
                src="/images/philosophy-mural.jpg"
                alt="Completed mural in a café interior"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-2" ref={textRef}>
            <p
              className="reveal-item font-hand text-2xl lg:text-3xl text-dusty-gold mb-6"
              style={{ opacity: 0 }}
            >
              &ldquo;I don&rsquo;t just paint walls. I give them a voice.&rdquo;
            </p>
            <p
              className="reveal-item font-body font-light text-muted-cream leading-relaxed"
              style={{ fontSize: "1.25rem", lineHeight: 1.7, opacity: 0 }}
            >
              Every space has a soul — a hidden narrative waiting to be
              expressed. My work transforms blank walls into living stories: a
              café&rsquo;s warmth, a restaurant&rsquo;s energy, a home&rsquo;s
              quiet poetry. Through murals and doodle art, I invite people to
              see their everyday spaces differently.
            </p>
            <p
              className="reveal-item font-hand text-2xl text-warm-cream mt-8"
              style={{ opacity: 0 }}
            >
              — Vidhi
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
