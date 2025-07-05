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

    // Particle class
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
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.radius = Math.random() * 3 + 2;
        this.opacity = Math.random() * 0.8 + 0.4;
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
        
        // Theme-based colors with higher opacity
        let color = 'rgba(6, 182, 212, '; // cyan-500
        if (settings.themeVariant === 'blue-professional') {
          color = 'rgba(59, 130, 246, '; // blue-500
        } else if (settings.themeVariant === 'deep-purple') {
          color = 'rgba(147, 51, 234, '; // purple-600
        }
        
        ctx.fillStyle = color + this.opacity + ')';
        ctx.fill();
        
        // Add glow effect
        ctx.shadowColor = color + '0.5)';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Create more particles for better visibility
    const particleCount = Math.min(120, Math.floor((canvas.width * canvas.height) / 10000));
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new Particle(canvas.width, canvas.height));
    }

    // Animation loop
    function animate() {
      if (!running) return;
      
      // Clear with slight trail effect
      ctx!.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      
      // Update and draw particles
      particlesRef.current.forEach((particle: any) => {
        particle.update(canvas!.width, canvas!.height);
        particle.draw(ctx!);
      });
      
      // Draw connections between close particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx!.beginPath();
            ctx!.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx!.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            
            const opacity = (1 - distance / 150) * 0.6;
            let strokeColor = 'rgba(6, 182, 212, '; // cyan-500
            if (settings.themeVariant === 'blue-professional') {
              strokeColor = 'rgba(59, 130, 246, '; // blue-500
            } else if (settings.themeVariant === 'deep-purple') {
              strokeColor = 'rgba(147, 51, 234, '; // purple-600
            }
            
            ctx!.strokeStyle = strokeColor + opacity + ')';
            ctx!.lineWidth = 1;
            ctx!.stroke();
          }
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    }
    
    // Start animation after a small delay to ensure canvas is ready
    setTimeout(() => {
      if (running) {
        animationRef.current = requestAnimationFrame(animate);
      }
    }, 100);

    return () => {
      running = false;
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [settings.backgroundAnimation, settings.themeVariant]);

  if (!settings.backgroundAnimation) return null;
  
  return (
    <canvas
      ref={canvasRef}
      id="background-canvas"
      className={`background-canvas theme-${settings.themeVariant} animate-in`}
      aria-hidden="true"
    />
  );
};

export default CanvasBackground;