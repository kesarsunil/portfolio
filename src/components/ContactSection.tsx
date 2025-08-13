import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GithubLogo, LinkedinLogo, TwitterLogo, PaperPlaneTilt } from 'phosphor-react';
gsap.registerPlugin(ScrollTrigger);
const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    tl.fromTo(sectionRef.current, {
      opacity: 0,
      filter: 'blur(10px)'
    }, {
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1,
      ease: "power2.out"
    });

    // Form inputs animation
    tl.fromTo('.form-input', {
      opacity: 0,
      x: -30
    }, {
      opacity: 1,
      x: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out"
    }, "-=0.5");

    // Social icons animation
    tl.fromTo('.social-icon', {
      opacity: 0,
      y: 30,
      scale: 0.8
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.7)"
    }, "-=0.4");

    // Add hover effects for social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
      icon.addEventListener('mouseenter', () => {
        gsap.to(icon, {
          scale: 1.1,
          y: -5,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      icon.addEventListener('mouseleave', () => {
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
    return () => {
      tl.kill();
    };
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Success animation
    gsap.to('.submit-button', {
      scale: 1.1,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
      onComplete: () => {
        setIsSubmitting(false);
        setFormData({
          name: '',
          email: '',
          message: ''
        });

        // Show success message
        gsap.fromTo('.success-message', {
          opacity: 0,
          y: 20
        }, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        });
        setTimeout(() => {
          gsap.to('.success-message', {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: "power2.in"
          });
        }, 3000);
      }
    });
  };
  const socialLinks = [{
    icon: GithubLogo,
    url: 'https://github.com',
    label: 'GitHub'
  }, {
    icon: LinkedinLogo,
    url: 'https://linkedin.com',
    label: 'LinkedIn'
  }, {
    icon: TwitterLogo,
    url: 'https://twitter.com',
    label: 'Twitter'
  }];
  return <section id="contact" ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => <div key={i} className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float" style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${3 + Math.random() * 3}s`
        }} />)}
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gradient-primary mb-6">
              Get In Touch
            </h2>
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
              Have a project in mind or just want to say hello? Drop me a message and let's create something amazing together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="space-y-8">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="form-input">
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Your Name" required className="input-futuristic" />
                </div>

                <div className="form-input">
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Your Email" required className="input-futuristic" />
                </div>

                <div className="form-input">
                  <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Your Message" rows={6} required className="input-futuristic resize-none" />
                </div>

                <button type="submit" disabled={isSubmitting} className="submit-button btn-primary w-full flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? <>
                      <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </> : <>
                      <PaperPlaneTilt size={20} />
                      <span>Send Message</span>
                    </>}
                </button>
              </form>

              {/* Success Message */}
              <div className="success-message opacity-0 glass-card p-4 text-center">
                <p className="text-green-400 font-medium">
                  ✨ Message sent successfully! I'll get back to you soon.
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="glass-card p-8 space-y-6">
                <h3 className="text-2xl font-semibold text-foreground mb-6">
                  Contact Info
                </h3>
                
                 <div className="space-y-4">
                   <div className="flex items-center space-x-4">
                     <div className="w-12 h-12 glass-card flex items-center justify-center">
                       📧
                     </div>
                     <div>
                       <p className="text-foreground-muted text-sm">Email</p>
                       <p className="text-foreground font-medium">kesharsunil1@gmail.com</p>
                     </div>
                   </div>

                   <div className="flex items-center space-x-4">
                     <div className="w-12 h-12 glass-card flex items-center justify-center">
                       📱
                     </div>
                     <div>
                       <p className="text-foreground-muted text-sm">Phone</p>
                       <p className="text-foreground font-medium">+91 7680802189</p>
                     </div>
                   </div>

                   <div className="flex items-center space-x-4">
                     <div className="w-12 h-12 glass-card flex items-center justify-center">
                       📍
                     </div>
                     <div>
                       <p className="text-foreground-muted text-sm">Location</p>
                       <p className="text-foreground font-medium">India</p>
                     </div>
                   </div>
                 </div>
              </div>

              {/* Social Links */}
              <div className="glass-card p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Connect With Me
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map(social => <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer" className="social-icon w-12 h-12 glass-card flex items-center justify-center text-foreground-muted hover:text-foreground transition-colors duration-300 group" aria-label={social.label}>
                      <social.icon size={24} className="group-hover:scale-110 transition-transform duration-300" />
                    </a>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ContactSection;