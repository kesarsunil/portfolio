import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileAvatar from '@/assets/profile.png';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills = [
    { name: 'UI/UX Design', icon: '🎨' },
    { name: 'React.js', icon: '⚛️' },
    { name: 'Three.js', icon: '🎮' },
    { name: 'HTML', icon: '🌐' },
    { name: 'CSS', icon: '💅' },
    { name: 'Tailwind CSS', icon: '🎨' },
    { name: 'GSAP', icon: '🎬' },
    { name: 'Python', icon: '🐍' },
    { name: 'C', icon: '⚙️' },
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse"
      }
    });

    // Section fade in
    tl.fromTo(sectionRef.current,
      { 
        opacity: 0,
        filter: 'blur(10px)'
      },
      { 
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: "power2.out"
      }
    );

    // Image animation
    tl.fromTo(imageRef.current,
      { 
        opacity: 0, 
        x: -50,
        rotation: -5
      },
      { 
        opacity: 1, 
        x: 0,
        rotation: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5"
    );

    // Content animation
    tl.fromTo(contentRef.current,
      { 
        opacity: 0, 
        x: 50 
      },
      { 
        opacity: 1, 
        x: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6"
    );

    // Skills animation
    tl.fromTo('.skill-item',
      { 
        opacity: 0, 
        y: 30,
        scale: 0.9
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.4"
    );

    // Profile image hover effect
    const profileImage = imageRef.current;
    if (profileImage) {
      profileImage.addEventListener('mouseenter', () => {
        gsap.to(profileImage, {
          scale: 1.05,
          rotation: 2,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      profileImage.addEventListener('mouseleave', () => {
        gsap.to(profileImage, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="relative mx-auto w-80 h-80 lg:w-96 lg:h-96">
              {/* Glowing circular frame */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 animate-glow-pulse"></div>
              <div className="absolute inset-2 rounded-full bg-background-secondary"></div>
              
              {/* Profile image */}
              <div className="absolute inset-4 rounded-full overflow-hidden">
                <img 
                  src={profileAvatar}
                  alt="Kesar Suneel - Creative Developer"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating tech icons */}
              <div className="absolute -top-4 -right-4 w-16 h-16 glass-card flex items-center justify-center text-2xl animate-float">
                ⚛️
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 glass-card flex items-center justify-center text-2xl animate-float" style={{ animationDelay: '1s' }}>
                🎬
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gradient-primary mb-6">
                About Me
              </h2>
              <div className="space-y-4 text-foreground-muted text-lg leading-relaxed">
                <p>
                  Hi there! I'm <span className="text-foreground font-medium">Kesar Suneel</span>, a passionate creative developer with over 5 years of experience crafting digital experiences that blend innovative design with cutting-edge technology.
                </p>
                <p>
                  I specialize in creating immersive web applications using modern frameworks like React, Next.js, and Three.js. My expertise extends to advanced animations with GSAP, 3D web experiences, and full-stack development.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge through tech communities.
                </p>
              </div>
            </div>

            {/* Skills Grid */}
            <div ref={skillsRef}>
              <h3 className="text-2xl font-semibold text-foreground mb-6">Tech Stack</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {skills.map((skill, index) => (
                  <div 
                    key={skill.name}
                    className="skill-item glass-card text-center p-4 hover:scale-105 transition-transform duration-300 cursor-pointer group"
                  >
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </div>
                    <p className="text-sm font-medium text-foreground-muted group-hover:text-foreground transition-colors duration-300">
                      {skill.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;