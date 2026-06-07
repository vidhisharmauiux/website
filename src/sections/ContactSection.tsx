import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID as string | undefined;

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    location: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const heading = headingRef.current;
    const left = leftRef.current;
    const form = formRef.current;
    if (!section || !heading || !left || !form) return;

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

    // Left column fade up
    const leftItems = left.querySelectorAll('.reveal-item');
    gsap.fromTo(
      leftItems,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: left,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Form fields reveal one by one
    const formFields = form.querySelectorAll('.form-field');
    gsap.fromTo(
      formFields,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: form,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === section || st.trigger === left || st.trigger === form)
        .forEach((st) => st.kill());
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');

    if (!FORMSPREE_FORM_ID) {
      console.error('Missing VITE_FORMSPREE_FORM_ID in .env — see .env.example');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _replyto: formData.email,
          projectType: formData.projectType,
          location: formData.location,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', projectType: '', location: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-editorial"
      style={{ position: 'relative', zIndex: 1 }}
    >
      <div className="content-max">
        <h2
          ref={headingRef}
          className="heading-editorial mb-12 lg:mb-16"
          style={{ opacity: 0 }}
        >
          Let&rsquo;s create something together
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left column */}
          <div ref={leftRef}>
            <h3
              className="reveal-item font-display font-medium text-ink-black text-2xl mb-4"
              style={{ opacity: 0 }}
            >
              Start a conversation
            </h3>
            <p
              className="reveal-item font-body font-light leading-relaxed mb-8"
              style={{ color: 'rgba(0,0,0,0.6)', fontSize: '1.1rem', lineHeight: 1.6, opacity: 0 }}
            >
              Every great mural starts with a conversation. Tell me about your space, your vision, and the story you want to tell. I&rsquo;ll get back to you within 48 hours.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:vidhiartistwork@gmail.com"
                className="reveal-item flex items-center gap-3 font-body font-medium transition-colors duration-300 hover:text-dusty-gold"
                style={{ color: '#000000', fontSize: '1.1rem', opacity: 0 }}
              >
                <Mail size={18} />
                vidhiartistwork@gmail.com
              </a>
              <a
                href="tel:+916350483564"
                className="reveal-item flex items-center gap-3 font-body font-medium transition-colors duration-300 hover:text-dusty-gold"
                style={{ color: '#000000', fontSize: '1rem', opacity: 0 }}
              >
                <Phone size={18} />
                6350483564
              </a>
              <p
                className="reveal-item flex items-center gap-3 font-body font-light"
                style={{ color: 'rgba(0,0,0,0.6)', fontSize: '1rem', opacity: 0 }}
              >
                <MapPin size={18} />
                Jaipur, Rajasthan — Available across India
              </p>
            </div>

            {/* Social links */}
            <div className="reveal-item flex items-center gap-8 mt-8" style={{ opacity: 0 }}>
              <a
                href="https://www.instagram.com/artisanvidhi?igsh=MWg1OXByYXJjenBpZQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body font-medium uppercase tracking-widest text-sm transition-colors duration-300 hover:text-dusty-gold"
                style={{ color: '#000000' }}
              >
                <Instagram size={16} />
                Instagram
              </a>
            </div>
          </div>

          {/* Right column - Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="form-field" style={{ opacity: 0 }}>
              <label className="block font-body font-medium uppercase tracking-widest text-xs mb-2" style={{ color: 'rgba(0,0,0,0.5)', letterSpacing: '0.06em' }}>
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full font-body text-ink-black py-3 bg-transparent border-b outline-none transition-colors duration-300 focus:border-dusty-gold"
                style={{ borderColor: 'rgba(0,0,0,0.2)' }}
              />
            </div>

            <div className="form-field" style={{ opacity: 0 }}>
              <label className="block font-body font-medium uppercase tracking-widest text-xs mb-2" style={{ color: 'rgba(0,0,0,0.5)', letterSpacing: '0.06em' }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full font-body text-ink-black py-3 bg-transparent border-b outline-none transition-colors duration-300 focus:border-dusty-gold"
                style={{ borderColor: 'rgba(0,0,0,0.2)' }}
              />
            </div>

            <div className="form-field" style={{ opacity: 0 }}>
              <label className="block font-body font-medium uppercase tracking-widest text-xs mb-2" style={{ color: 'rgba(0,0,0,0.5)', letterSpacing: '0.06em' }}>
                Project Type
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                required
                className="w-full font-body text-ink-black py-3 bg-transparent border-b outline-none transition-colors duration-300 focus:border-dusty-gold"
                style={{ borderColor: 'rgba(0,0,0,0.2)' }}
              >
                <option value="">Select a type</option>
                <option value="cafe">Café / Restaurant</option>
                <option value="home">Home / Residential</option>
                <option value="office">Office / Commercial</option>
                <option value="event">Event</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-field" style={{ opacity: 0 }}>
              <label className="block font-body font-medium uppercase tracking-widest text-xs mb-2" style={{ color: 'rgba(0,0,0,0.5)', letterSpacing: '0.06em' }}>
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full font-body text-ink-black py-3 bg-transparent border-b outline-none transition-colors duration-300 focus:border-dusty-gold"
                style={{ borderColor: 'rgba(0,0,0,0.2)' }}
              />
            </div>

            <div className="form-field" style={{ opacity: 0 }}>
              <label className="block font-body font-medium uppercase tracking-widest text-xs mb-2" style={{ color: 'rgba(0,0,0,0.5)', letterSpacing: '0.06em' }}>
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                required
                className="w-full font-body text-ink-black py-3 bg-transparent border-b outline-none transition-colors duration-300 focus:border-dusty-gold resize-none"
                style={{ borderColor: 'rgba(0,0,0,0.2)' }}
              />
            </div>

            {submitStatus === 'success' && (
              <p
                className="form-field font-body text-sm"
                style={{ color: '#4A6741', opacity: 1 }}
                role="status"
              >
                Thank you for reaching out! We will get back to you within 48 hours.
              </p>
            )}
            {submitStatus === 'error' && (
              <p
                className="form-field font-body text-sm"
                style={{ color: '#8B5E3C', opacity: 1 }}
                role="alert"
              >
                {!FORMSPREE_FORM_ID
                  ? 'Form is not configured yet. Add your Formspree ID to .env (see setup steps).'
                  : 'Something went wrong. Please try again or email vidhiartistwork@gmail.com directly.'}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="form-field font-body font-medium uppercase tracking-widest text-sm py-4 px-12 transition-all duration-300 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                opacity: 0,
                backgroundColor: '#D4A853',
                color: '#000000',
                letterSpacing: '0.1em',
                border: 'none',
              }}
              onMouseEnter={(e) => {
                if (isSubmitting) return;
                (e.target as HTMLElement).style.backgroundColor = '#1A1410';
                (e.target as HTMLElement).style.color = '#F5EDE0';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = '#D4A853';
                (e.target as HTMLElement).style.color = '#000000';
              }}
            >
              {isSubmitting ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
