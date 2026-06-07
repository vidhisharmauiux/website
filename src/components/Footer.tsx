import { Instagram } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Works', href: '#works' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      className="w-full"
      style={{
        backgroundColor: '#000000',
        padding: '4rem 3rem',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div className="content-max flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left */}
        <div className="text-center md:text-left">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-display text-2xl font-semibold text-dusty-gold hover:text-warm-cream transition-colors duration-300"
          >
            vidhi
          </a>
          <p className="font-body font-light text-sm mt-2" style={{ color: '#C8B89A' }}>
            &copy; 2026 Vidhi Sharma. All rights reserved.
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-body font-medium uppercase text-sm transition-colors duration-300 hover:text-dusty-gold"
                style={{ color: '#C8B89A' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-dusty-gold"
            style={{ color: '#C8B89A' }}
            aria-label="Instagram"
          >
            <Instagram size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
