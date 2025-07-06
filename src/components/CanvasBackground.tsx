import { useRef, useEffect } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import '../css/background.css';

const CanvasBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { settings } = useSettings();
  const animationRef = useRef<number>();
  const particlesRef = useRef<any[]>([]);

  useEffect(() => {
    if (!settings.backgroundAnimation) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let running = true;

    // Set canvas size
    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Optimized Particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
      
      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * 0.5; // Reduced speed
        this.vy = (Math.random() - 0.5) * 0.5; // Reduced speed
        this.radius = Math.random() * 2 + 1; // Smaller particles
        this.opacity = Math.random() * 0.6 + 0.2; // Reduced opacity range
      }
      
      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce off edges
        if (this.x < 0 || this.x > canvasWidth) this.vx *= -1;
        if (this.y < 0 || this.y > canvasHeight) this.vy *= -1;
        
        // Keep particles within bounds
        this.x = Math.max(0, Math.min(canvasWidth, this.x));
        this.y = Math.max(0, Math.min(canvasHeight, this.y));
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        // Simplified colors without theme variants
        ctx.fillStyle = `rgba(6, 182, 212, ${this.opacity})`;
        ctx.fill();
        
        // Removed glow effect for performance
      }
    }

    // Reduced particle count for better performance
    const particleCount = Math.min(40, Math.floor((canvas.width * canvas.height) / 25000));
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new Particle(canvas.width, canvas.height));
    }

    let lastTime = 0;
    const targetFPS = 30; // Reduced from 60fps to 30fps
    const frameInterval = 1000 / targetFPS;

    // Optimized animation loop with frame rate limiting
    function animate(currentTime: number) {
      if (!running) return;
      
      if (currentTime - lastTime >= frameInterval) {
        // Clear canvas efficiently
        ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
        
        // Update and draw particles
        particlesRef.current.forEach((particle: any) => {
          particle.update(canvas!.width, canvas!.height);
          particle.draw(ctx!);
        });
        
        // Simplified connection drawing with reduced distance
        for (let i = 0; i < particlesRef.current.length; i++) {
          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const dx = particlesRef.current[i].x - particlesRef.current[j].x;
            const dy = particlesRef.current[i].y - particlesRef.current[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) { // Reduced connection distance
              ctx!.beginPath();
              ctx!.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
              ctx!.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
              
              const opacity = (1 - distance / 100) * 0.3; // Reduced opacity
              ctx!.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
              ctx!.lineWidth = 0.5; // Thinner lines
              ctx!.stroke();
            }
          }
        }
        
        lastTime = currentTime;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    }
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      running = false;
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [settings.backgroundAnimation]);

  if (!settings.backgroundAnimation) return null;
  
  return (
    <canvas
      ref={canvasRef}
      id="background-canvas"
      className="background-canvas animate-in"
      aria-hidden="true"
    />
  );
};

export default CanvasBackground;