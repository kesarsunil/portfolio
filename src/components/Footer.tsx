import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GithubLogo, LinkedinLogo, TwitterLogo, Heart } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
        end: "bottom 100%",
        toggleActions: "play none none reverse"
      }
    });

    // Footer slide up animation
    tl.fromTo(footerRef.current,
      { 
        opacity: 0, 
        y: 60,
        filter: 'blur(10px)'
      },
      { 
        opacity: 1, 
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: "power2.out"
      }
    );

    // Floating particles animation
    gsap.to('.footer-particle', {
      y: -10,
      opacity: 0.8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.3
    });

    return () => {
      tl.kill();
    };
  }, []);

  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: GithubLogo, url: 'https://github.com', label: 'GitHub' },
    { icon: LinkedinLogo, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: TwitterLogo, url: 'https://twitter.com', label: 'Twitter' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer ref={footerRef} className="relative py-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background-tertiary to-background"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="footer-particle absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-3xl font-bold text-gradient-primary">
              M Kesar
            </div>
            <p className="text-foreground-muted max-w-md leading-relaxed">
              Creative Developer passionate about crafting digital experiences that inspire and engage through innovative design and cutting-edge technology.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass-card flex items-center justify-center text-foreground-muted hover:text-foreground transition-all duration-300 hover:scale-110 hover:glow-primary"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Navigation</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-foreground-muted hover:text-foreground transition-colors duration-300 text-left relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Get In Touch</h3>
            <div className="space-y-2 text-foreground-muted">
              <p>kesharsunil1@gmail.com</p>
              <p>7680802189</p>
              <p>India</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-glass-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-foreground-muted">
              <span>© {currentYear} M Kesar. Made with</span>
              <Heart size={16} className="text-red-400 animate-pulse" />
              <span>and lots of coffee.</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-foreground-muted">
              <button className="hover:text-foreground transition-colors duration-300">
                Privacy Policy
              </button>
              <button className="hover:text-foreground transition-colors duration-300">
                Terms of Service
              </button>
            </div>
          </div>
        </div>

        {/* Scroll to top button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 glass-card flex items-center justify-center text-foreground-muted hover:text-foreground transition-all duration-300 hover:scale-110 z-50 group"
          aria-label="Scroll to top"
        >
          <div className="transform group-hover:-translate-y-1 transition-transform duration-300">
            ↑
          </div>
        </button>
      </div>
    </footer>
  );
};

export default Footer;