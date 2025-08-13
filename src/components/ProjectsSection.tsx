import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, GithubLogo } from 'phosphor-react';
import project1 from '@/assets/project-1.png';
import project2 from '@/assets/project-2.png';
import project3 from '@/assets/project-3.png';
import project4 from '@/assets/project-4.png';
import project5 from '@/assets/project-5.png';
import project6 from '@/assets/project-6.png';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "Pizza Builder",
      description: "Interactive 3D pizza customization platform with real-time visualization.",
      image: project1,
      tech: ["React", "Three.js", "Node.js", "MongoDB"],
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "Women Silent Rescue",
      description: "Empowering women through confidential support and immediate assistance.",
      image: project2,
      tech: ["React", "Node.js", "MongoDB", "Socket.io"],
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "EventMarket",
      description: "One-stop solution for event management and booking platform.",
      image: project3,
      tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: 4,
      title: "Gaming Website Platform",
      description: "Complete gaming platform with animated characters and interactive features.",
      image: project4,
      tech: ["React", "Three.js", "WebGL", "MongoDB"],
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: 5,
      title: "Web Animation Tools",
      description: "Advanced animation library and tools for modern web development.",
      image: project5,
      tech: ["GSAP", "CSS3", "JavaScript", "Webpack"],
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: 6,
      title: "Animated Portfolio Tutorial",
      description: "Step-by-step tutorial for creating animated portfolios.",
      image: project6,
      tech: ["HTML5", "CSS3", "GSAP", "JavaScript"],
      demoUrl: "#",
      githubUrl: "#"
    }
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

    // Project cards animation
    tl.fromTo('.project-card',
      { 
        opacity: 0, 
        y: 50,
        scale: 0.9
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.2)"
      }, "-=0.5"
    );

    // Add hover effects for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(card.querySelector('.project-image'), {
          scale: 1.1,
          duration: 0.5,
          ease: "power2.out"
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(card.querySelector('.project-image'), {
          scale: 1,
          duration: 0.5,
          ease: "power2.out"
        });
      });
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gradient-primary mb-6">
            Featured Projects
          </h2>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            A showcase of my recent work, featuring cutting-edge web technologies and innovative design solutions.
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="project-card glass-card group cursor-pointer relative overflow-hidden"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden rounded-xl mb-4">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="project-image w-full h-full object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-4">
                    <a 
                      href={project.demoUrl}
                      className="w-12 h-12 glass-card flex items-center justify-center text-foreground hover:text-primary transition-colors duration-300"
                    >
                      <ArrowUpRight size={20} />
                    </a>
                    <a 
                      href={project.githubUrl}
                      className="w-12 h-12 glass-card flex items-center justify-center text-foreground hover:text-primary transition-colors duration-300"
                    >
                      <GithubLogo size={20} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-gradient-primary transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-foreground-muted text-sm leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 text-xs bg-background-secondary border border-glass-border rounded-full text-foreground-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 blur-xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="btn-secondary">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;