import React, { useEffect, useRef, useState } from 'react';

interface HeartParticle {
  id: number;
  x: number;
  y: number;
  originX: number;
  size: number;
  scale: number;
  speedY: number;
  wobbleSpeed: number;
  wobbleAmp: number;
  wobblePhase: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  alpha: number;
  maxAlpha: number;
  age: number;
  lifespan: number;
  evaporating: boolean;
}

interface HeartParticlesProps {
  /** Density multiplier: 'subtle' for standard pages, 'festive' for quiz results */
  density?: 'subtle' | 'festive';
  /** Optional custom class names */
  className?: string;
  /** Allow clicking/tapping anywhere to spawn interactive evaporating hearts */
  interactive?: boolean;
}

const HEART_COLORS = [
  '#FF6B8A', // Coral Love
  '#FFA8BA', // Soft Blush
  '#FFCCD5', // Pastel Rose
  '#FF85A1', // Vibrant Love
  '#FFD166', // Golden Sparkle
  '#E63946', // Deep Romance
];

const HEART_SVG_PATH = 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';

export const HeartParticles: React.FC<HeartParticlesProps> = ({
  density = 'subtle',
  className = '',
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Pre-create Path2D for optimal 60fps rendering
    let path2D: Path2D | null = null;
    try {
      path2D = new Path2D(HEART_SVG_PATH);
    } catch {
      // Fallback if Path2D is not supported
      path2D = null;
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const maxParticles = density === 'festive' ? 32 : 18;
    const particles: HeartParticle[] = [];
    let particleIdSeq = 0;

    const createParticle = (spawnX?: number, spawnY?: number, isBurst = false): HeartParticle => {
      const x = spawnX !== undefined ? spawnX : Math.random() * width;
      const y = spawnY !== undefined ? spawnY : height + 20 + Math.random() * 40;
      const size = isBurst ? 14 + Math.random() * 16 : 10 + Math.random() * 16;
      const maxAlpha = isBurst ? 0.75 + Math.random() * 0.2 : 0.35 + Math.random() * 0.35;
      const lifespan = isBurst ? 80 + Math.random() * 60 : 160 + Math.random() * 120;

      return {
        id: ++particleIdSeq,
        x,
        y,
        originX: x,
        size,
        scale: 1,
        speedY: isBurst ? 1.5 + Math.random() * 2.2 : 0.6 + Math.random() * 1.1,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
        wobbleAmp: 12 + Math.random() * 25,
        wobblePhase: Math.random() * Math.PI * 2,
        rotation: (Math.random() - 0.5) * 0.4,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
        alpha: 0,
        maxAlpha,
        age: 0,
        lifespan,
        evaporating: false,
      };
    };

    // Initialize with a staggered distribution so they don't all rise at once
    const initialCount = density === 'festive' ? 16 : 9;
    for (let i = 0; i < initialCount; i++) {
      const p = createParticle(
        Math.random() * width,
        height * 0.2 + Math.random() * height * 0.75
      );
      p.age = Math.floor(Math.random() * p.lifespan * 0.6);
      p.alpha = p.maxAlpha * 0.8;
      particles.push(p);
    }

    // Interactive click/tap handler to spawn heart burst that evaporates
    const handlePointerDown = (e: PointerEvent) => {
      if (!interactive) return;
      const clientX = e.clientX ?? width / 2;
      const clientY = e.clientY ?? height / 2;

      const burstCount = 4 + Math.floor(Math.random() * 3);
      for (let i = 0; i < burstCount; i++) {
        const spreadX = clientX + (Math.random() - 0.5) * 40;
        const spreadY = clientY + (Math.random() - 0.5) * 24;
        const p = createParticle(spreadX, spreadY, true);
        p.speedY = 1.2 + Math.random() * 2.0;
        particles.push(p);
      }
    };

    if (interactive) {
      window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    }

    // Animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Replenish ambient particles
      if (particles.length < maxParticles && Math.random() < 0.12) {
        particles.push(createParticle());
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age++;

        // Upward floating motion with gentle horizontal oscillation
        p.y -= p.speedY;
        p.wobblePhase += p.wobbleSpeed;
        p.x = p.originX + Math.sin(p.wobblePhase) * p.wobbleAmp;
        p.rotation += p.rotationSpeed;

        // Evaporation lifecycle:
        // 1. Birth: fade in smoothly (first 15%)
        // 2. Float: stable alpha
        // 3. Evaporation: as it reaches the last 40% of its life or top of the screen,
        // it fades out and dissolves/expands softly into the air
        const progress = p.age / p.lifespan;

        if (progress < 0.15) {
          p.alpha = (progress / 0.15) * p.maxAlpha;
        } else if (progress > 0.6) {
          // Evaporating phase
          const evapProgress = (progress - 0.6) / 0.4;
          p.alpha = p.maxAlpha * (1 - evapProgress);
          // Gently expands slightly as it evaporates like rising steam/mist
          p.scale = 1 + evapProgress * 0.35;
        } else {
          p.alpha = p.maxAlpha;
        }

        // Draw particle if visible
        if (p.alpha > 0.01 && p.y > -50) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.scale(p.scale, p.scale);
          ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
          ctx.fillStyle = p.color;

          if (path2D) {
            // Center the 24x24 SVG path
            const scaleFactor = p.size / 24;
            ctx.scale(scaleFactor, scaleFactor);
            ctx.translate(-12, -12);
            ctx.fill(path2D);
          } else {
            // Canvas bezier heart fallback
            const s = p.size;
            ctx.beginPath();
            ctx.moveTo(0, s * 0.3);
            ctx.bezierCurveTo(-s * 0.5, -s * 0.3, -s * 0.8, s * 0.4, 0, s);
            ctx.bezierCurveTo(s * 0.8, s * 0.4, s * 0.5, -s * 0.3, 0, s * 0.3);
            ctx.fill();
          }

          ctx.restore();
        }

        // Remove dead or off-screen particles
        if (p.age >= p.lifespan || p.y < -60 || p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('pointerdown', handlePointerDown);
      }
    };
  }, [density, interactive, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-[1] w-full h-full overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
};
