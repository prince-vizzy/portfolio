<<<<<<< HEAD
import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null });
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Track mouse position
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor(canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.baseColor = `rgba(36, 104, 43, ${Math.random() * 0.5 + 0.3})`;
        this.originalX = this.x;
        this.originalY = this.y;
        this.variance = Math.random() * Math.PI * 2;
        this.angle = Math.random() * Math.PI * 2;
      }

      update(canvasWidth, canvasHeight, mouseX, mouseY) {
        // Normal movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x < 0) this.x = canvasWidth;
        if (this.x > canvasWidth) this.x = 0;
        if (this.y < 0) this.y = canvasHeight;
        if (this.y > canvasHeight) this.y = 0;

        // Cursor attraction - particles follow the cursor
        if (mouseX !== null && mouseY !== null) {
          const dx = mouseX - this.x;
          const dy = mouseY - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 200;
          
          if (distance < maxDistance) {
            // Stronger attraction when closer
            const force = (maxDistance - distance) / maxDistance;
            const angle = Math.atan2(dy, dx);
            const moveX = Math.cos(angle) * force * 1.5;
            const moveY = Math.sin(angle) * force * 1.5;
            this.x += moveX;
            this.y += moveY;
          }
        }
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.baseColor;
        ctx.fill();
        
        // Add glow effect
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#24682b';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const initParticles = () => {
      const particles = [];
      const particleCount = 250;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
      particlesRef.current = particles;
    };

    // Draw connecting lines between nearby particles
    const drawConnections = (ctx, particles, mouseX, mouseY) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.25;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(36, 104, 43, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw connections to cursor
      if (mouseX !== null && mouseY !== null) {
        particles.forEach(particle => {
          const dx = particle.x - mouseX;
          const dy = particle.y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.35;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = `rgba(36, 104, 43, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      }
    };

    // Draw cursor glow and trailing particles
    const drawCursorEffects = (ctx, mouseX, mouseY) => {
      if (mouseX !== null && mouseY !== null) {
        // Cursor glow
        const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 100);
        gradient.addColorStop(0, 'rgba(36, 104, 43, 0.25)');
        gradient.addColorStop(0.5, 'rgba(36, 104, 43, 0.1)');
        gradient.addColorStop(1, 'rgba(36, 104, 43, 0)');
        
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 100, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw ring around cursor
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 15, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(36, 104, 43, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 8, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(36, 104, 43, 0.6)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Add subtle background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(5, 5, 5, 0.95)');
      gradient.addColorStop(1, 'rgba(10, 10, 10, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.update(canvas.width, canvas.height, mouseRef.current.x, mouseRef.current.y);
        particle.draw(ctx);
      });
      
      // Draw connections
      drawConnections(ctx, particlesRef.current, mouseRef.current.x, mouseRef.current.y);
      
      // Draw cursor effects
      drawCursorEffects(ctx, mouseRef.current.x, mouseRef.current.y);
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const init = () => {
      resizeCanvas();
      initParticles();
      animate();
    };

    init();

    window.addEventListener('resize', () => {
      resizeCanvas();
      particlesRef.current = [];
      initParticles();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block'
      }}
    />
  );
};

=======
import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null });
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Track mouse position
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor(canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.baseColor = `rgba(36, 104, 43, ${Math.random() * 0.5 + 0.3})`;
        this.originalX = this.x;
        this.originalY = this.y;
        this.variance = Math.random() * Math.PI * 2;
        this.angle = Math.random() * Math.PI * 2;
      }

      update(canvasWidth, canvasHeight, mouseX, mouseY) {
        // Normal movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x < 0) this.x = canvasWidth;
        if (this.x > canvasWidth) this.x = 0;
        if (this.y < 0) this.y = canvasHeight;
        if (this.y > canvasHeight) this.y = 0;

        // Cursor attraction - particles follow the cursor
        if (mouseX !== null && mouseY !== null) {
          const dx = mouseX - this.x;
          const dy = mouseY - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 200;
          
          if (distance < maxDistance) {
            // Stronger attraction when closer
            const force = (maxDistance - distance) / maxDistance;
            const angle = Math.atan2(dy, dx);
            const moveX = Math.cos(angle) * force * 1.5;
            const moveY = Math.sin(angle) * force * 1.5;
            this.x += moveX;
            this.y += moveY;
          }
        }
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.baseColor;
        ctx.fill();
        
        // Add glow effect
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#24682b';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const initParticles = () => {
      const particles = [];
      const particleCount = 250;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
      particlesRef.current = particles;
    };

    // Draw connecting lines between nearby particles
    const drawConnections = (ctx, particles, mouseX, mouseY) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.25;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(36, 104, 43, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw connections to cursor
      if (mouseX !== null && mouseY !== null) {
        particles.forEach(particle => {
          const dx = particle.x - mouseX;
          const dy = particle.y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.35;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = `rgba(36, 104, 43, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      }
    };

    // Draw cursor glow and trailing particles
    const drawCursorEffects = (ctx, mouseX, mouseY) => {
      if (mouseX !== null && mouseY !== null) {
        // Cursor glow
        const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 100);
        gradient.addColorStop(0, 'rgba(36, 104, 43, 0.25)');
        gradient.addColorStop(0.5, 'rgba(36, 104, 43, 0.1)');
        gradient.addColorStop(1, 'rgba(36, 104, 43, 0)');
        
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 100, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw ring around cursor
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 15, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(36, 104, 43, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 8, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(36, 104, 43, 0.6)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Add subtle background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(5, 5, 5, 0.95)');
      gradient.addColorStop(1, 'rgba(10, 10, 10, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.update(canvas.width, canvas.height, mouseRef.current.x, mouseRef.current.y);
        particle.draw(ctx);
      });
      
      // Draw connections
      drawConnections(ctx, particlesRef.current, mouseRef.current.x, mouseRef.current.y);
      
      // Draw cursor effects
      drawCursorEffects(ctx, mouseRef.current.x, mouseRef.current.y);
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const init = () => {
      resizeCanvas();
      initParticles();
      animate();
    };

    init();

    window.addEventListener('resize', () => {
      resizeCanvas();
      particlesRef.current = [];
      initParticles();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block'
      }}
    />
  );
};

>>>>>>> 12e07bc573124e378ab29574986787b29ee87cc9
export default ParticleBackground;