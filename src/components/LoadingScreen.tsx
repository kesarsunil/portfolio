import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate the text first
    tl.fromTo(textRef.current, 
      { 
        opacity: 0, 
        y: 30,
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

    // Animate progress bar
    tl.to(progressBarRef.current, {
      width: "100%",
      duration: 2.5,
      ease: "power2.out",
    }, "-=0.5");

    // Exit animation
    tl.to([textRef.current, progressBarRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.in"
    }, "+=0.3");

    tl.to(containerRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        onComplete();
      }
    }, "-=0.2");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      style={{
        background: 'linear-gradient(135deg, hsl(235 30% 8%) 0%, hsl(235 25% 12%) 50%, hsl(235 20% 16%) 100%)'
      }}
    >
      <div className="text-center">
        <div 
          ref={textRef}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-gradient-primary mb-4">
            Kesar
          </h1>
          <p className="text-foreground-muted text-lg tracking-wider">
            Creative Developer
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-80 h-1 bg-background-secondary rounded-full overflow-hidden mx-auto">
          <div 
            ref={progressBarRef}
            className="h-full w-0 loading-bar"
          />
        </div>

        {/* Floating orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-float" 
               style={{ animationDelay: '0s' }} />
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-secondary/30 rounded-full animate-float" 
               style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-accent/30 rounded-full animate-float" 
               style={{ animationDelay: '2s' }} />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;