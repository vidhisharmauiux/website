import { useEffect, useState, useCallback } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Works', href: '#works' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full flex items-center justify-between transition-all duration-400"
        style={{
          height: 80,
          padding: '0 3rem',
          zIndex: 50,
          backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        {/* Logo */}
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

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-body font-medium uppercase tracking-widest text-sm text-muted-cream hover:text-dusty-gold transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-muted-cream hover:text-dusty-gold transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 flex flex-col items-center justify-center gap-8 md:hidden"
          style={{
            zIndex: 49,
            backgroundColor: '#000000',
          }}
        >
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-body font-medium uppercase tracking-widest text-lg text-muted-cream hover:text-dusty-gold transition-colors duration-300"
              style={{
                animation: `fadeInUp 0.4s ease forwards`,
                animationDelay: `${i * 0.1}s`,
                opacity: 0,
              }}
            >
              {link.label}
            </a>
          ))}
          <style>{`
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
