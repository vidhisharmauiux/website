import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORKS = [
  {
    src: "/images/chernobyl-aunt.jpeg",
    caption: '"Chernobyl Aunt"',
    sub: "Café Mural, Jaipur",
    category: "Murals",
  },
  {
    src: "/images/doodle-art.png",
    caption: '"Doodle Art"',
    sub: "Wall Doodle, Udaipur",
    category: "Doodles",
  },
  {
    src: "/images/girl-in-a-forest.jpeg",
    caption: '"Girl in a Forest"',
    sub: "Canvas Series",
    category: "Canvases",
  },
  {
    src: "/images/colorful-doodle.png",
    caption: '"Colorful Doodle"',
    sub: "Restaurant Interior, Jodhpur",
    category: "Murals",
  },
  {
    src: "/images/dark-doodles.png",
    caption: '"Dark Doodles"',
    sub: "Residential Wall, Delhi",
    category: "Murals",
  },
  {
    src: "/images/puta-madre.png",
    caption: '"Puta Madre"',
    sub: "Mixed Media Doodle",
    category: "Doodles",
  },
  {
    src: "/images/black-mask.png",
    caption: '"Black Mask"',
    sub: "Canvas Series",
    category: "Canvases",
  },
  {
    src: "/images/pancake-women.png",
    caption: '"Pancake Women"',
    sub: "Canvas",
    category: "Canvases",
  },
  {
    src: "/images/jaipur-art.jpeg",
    caption: '"Jaipur Art"',
    sub: "Hotel Lobby, Pushkar",
    category: "Murals",
  },
];

const FILTERS = ["All", "Murals", "Café Art", "Doodles", "Canvases"];

export default function FeaturedWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");

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

    // Grid items fade in
    const items = grid.querySelectorAll(".gallery-item");
    gsap.fromTo(
      items,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: grid,
          start: "top 85%",
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

  const filteredWorks =
    activeFilter === "All"
      ? WORKS
      : WORKS.filter((w) => w.category === activeFilter);

  return (
    <section
      ref={sectionRef}
      id="works"
      className="section-gallery"
      style={{ position: "relative", zIndex: 1 }}
    >
      <div className="content-max">
        <h2
          ref={headingRef}
          className="heading-gallery mb-12"
          style={{ opacity: 0 }}
        >
          SELECTED WORKS
        </h2>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="font-body font-medium uppercase tracking-widest text-sm transition-colors duration-300"
              style={{
                color: activeFilter === filter ? "#D4A853" : "#C8B89A",
                borderBottom:
                  activeFilter === filter
                    ? "1px solid #D4A853"
                    : "1px solid transparent",
                paddingBottom: "4px",
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredWorks.map((work, i) => (
            <div
              key={work.src}
              className="gallery-item group"
              style={{
                opacity: 0,
                animationDelay: `${i * 0.2}s`,
              }}
            >
              <div
                className="relative overflow-hidden cursor-pointer"
                style={{ aspectRatio: "4/3" }}
              >
                <img
                  src={work.src}
                  alt={work.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              </div>
              <div className="mt-4">
                <p className="font-display text-warm-cream text-base">
                  {work.caption}
                </p>
                <p className="font-body font-medium text-muted-gold uppercase tracking-widest text-xs mt-1">
                  {work.sub} — {work.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
