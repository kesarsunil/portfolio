import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Hero animations
    tl.fromTo(headlineRef.current,
      { 
        opacity: 0, 
        y: 50, 
        filter: 'blur(10px)' 
      },
      { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)',
        duration: 1.2,
        ease: "power2.out"
      }
    )
    .fromTo(subtitleRef.current,
      { 
        opacity: 0, 
        y: 30 
      },
      { 
        opacity: 1, 
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6"
    )
    .fromTo(ctaRef.current,
      { 
        opacity: 0, 
        scale: 0.9 
      },
      { 
        opacity: 1, 
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, "-=0.4"
    )
    .fromTo(splineRef.current,
      { 
        opacity: 0, 
        x: 100 
      },
      { 
        opacity: 1, 
        x: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=1");

    // Floating background elements
    gsap.to('.floating-orb', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.5
    });

    // CTA button hover effect
    const ctaButton = ctaRef.current;
    if (ctaButton) {
      ctaButton.addEventListener('mouseenter', () => {
        gsap.to(ctaButton, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      ctaButton.addEventListener('mouseleave', () => {
        gsap.to(ctaButton, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fullscreen Spline 3D Background */}
      <div 
        ref={splineRef}
        className="absolute inset-0 w-full h-full"
      >
        <iframe 
          src="https://my.spline.design/orb-XpZ9UBCVC4Xmof5gjx0kCWq5/" 
          frameBorder="0" 
          width="100%" 
          height="100%"
          className="w-full h-full object-cover"
          style={{ background: 'transparent' }}
        />
      </div>

      {/* Centered content overlay */}
      <div className="relative z-10 text-center">
        <h1 
          ref={headlineRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          Hi, I'm{' '}
          <span className="text-gradient-primary">Kesar</span>
          <br />
          <span className="text-3xl md:text-4xl lg:text-5xl text-foreground-muted font-light">
            Web Developer
          </span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl text-foreground-muted mb-8 max-w-2xl mx-auto"
        >
          Crafting digital experiences that inspire and engage through innovative design and cutting-edge technology.
        </p>
        
        <button 
          ref={ctaRef}
          onClick={scrollToProjects}
          className="btn-primary text-lg glow-pulse"
        >
          View My Work
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-foreground-muted rounded-full flex justify-center">
          <div className="w-1 h-3 bg-foreground-muted rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;