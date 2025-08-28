import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
  type: 'star' | 'comet' | 'sparkle' | 'meteor';
}

export const CosmicCursor = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isActive, setIsActive] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth spring animations for cursor trail
  const springConfig = { damping: 20, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Create constellation lines between nearby particles
  const createConstellationLines = (particleList: Particle[]) => {
    const lines: { from: Particle; to: Particle; distance: number }[] = [];
    for (let i = 0; i < particleList.length; i++) {
      for (let j = i + 1; j < particleList.length; j++) {
        const p1 = particleList[i];
        const p2 = particleList[j];
        const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
        if (distance < 150) {
          lines.push({ from: p1, to: p2, distance });
        }
      }
    }
    return lines;
  };

  const createParticle = (x: number, y: number): Particle => {
    const types: Particle['type'][] = ['star', 'comet', 'sparkle', 'meteor'];
    const colors = ['#39FF14', '#00FF41', '#FFFFFF', '#FFD700', '#00FFFF'];
    
    return {
      id: Math.random(),
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 4 + 2,
      life: 60,
      maxLife: 60,
      color: colors[Math.floor(Math.random() * colors.length)],
      type: types[Math.floor(Math.random() * types.length)],
    };
  };

  const updateParticles = () => {
    setParticles(prev => {
      return prev
        .map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life - 1,
          vy: particle.vy + 0.02, // Gentle gravity
        }))
        .filter(particle => particle.life > 0);
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x);
    mouseY.set(y);
    setIsActive(true);

    // Create particles on mouse movement
    if (Math.random() < 0.3) {
      const newParticle = createParticle(x, y);
      setParticles(prev => [...prev.slice(-20), newParticle]); // Keep max 20 particles
    }
  };

  const handleMouseLeave = () => {
    setIsActive(false);
  };

  useEffect(() => {
    const interval = setInterval(updateParticles, 16); // ~60fps
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const constellationLines = createConstellationLines(particles);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      style={{ mixBlendMode: 'screen' }}
    >
      {/* Cursor glow effect */}
      {isActive && (
        <motion.div
          className="absolute w-8 h-8 rounded-full pointer-events-none"
          style={{
            x: useTransform(cursorX, x => x - 16),
            y: useTransform(cursorY, y => y - 16),
            background: 'radial-gradient(circle, rgba(57, 255, 20, 0.6) 0%, rgba(57, 255, 20, 0.2) 50%, transparent 100%)',
            filter: 'blur(8px)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
        />
      )}

      {/* Constellation Lines */}
      <svg className="absolute inset-0 w-full h-full">
        {constellationLines.map(({ from, to, distance }, index) => (
          <motion.line
            key={`${from.id}-${to.id}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="url(#constellation-gradient)"
            strokeWidth={1}
            opacity={Math.max(0, 1 - distance / 150)}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
        ))}
        <defs>
          <linearGradient id="constellation-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#39FF14" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#00FF41" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>

      {/* Particles */}
      {particles.map(particle => {
        const opacity = particle.life / particle.maxLife;
        const scale = particle.type === 'comet' ? particle.size * 0.5 : particle.size;
        
        return (
          <motion.div
            key={particle.id}
            className="absolute pointer-events-none"
            style={{
              left: particle.x,
              top: particle.y,
              width: scale,
              height: scale,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: opacity * 0.8,
              rotate: particle.type === 'sparkle' ? [0, 360] : 0,
            }}
            transition={{
              rotate: {
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          >
            {particle.type === 'star' && (
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: `radial-gradient(circle, ${particle.color} 0%, transparent 70%)`,
                  boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                }}
              />
            )}
            
            {particle.type === 'comet' && (
              <div className="relative">
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: particle.color,
                    boxShadow: `0 0 ${particle.size}px ${particle.color}`,
                  }}
                />
                <div
                  className="absolute top-1/2 left-full w-8 h-0.5 -translate-y-1/2"
                  style={{
                    background: `linear-gradient(90deg, ${particle.color}80, transparent)`,
                    filter: `blur(1px)`,
                  }}
                />
              </div>
            )}
            
            {particle.type === 'sparkle' && (
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: particle.color,
                    filter: `blur(${particle.size * 0.5}px)`,
                  }}
                />
                <div
                  className="absolute top-1/2 left-1/2 w-0.5 h-4 -translate-x-1/2 -translate-y-1/2 bg-white"
                  style={{ boxShadow: `0 0 4px ${particle.color}` }}
                />
                <div
                  className="absolute top-1/2 left-1/2 w-4 h-0.5 -translate-x-1/2 -translate-y-1/2 bg-white"
                  style={{ boxShadow: `0 0 4px ${particle.color}` }}
                />
              </div>
            )}
            
            {particle.type === 'meteor' && (
              <div className="relative">
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: `linear-gradient(45deg, ${particle.color}, transparent)`,
                    filter: `blur(${particle.size * 0.3}px)`,
                  }}
                />
                <div
                  className="absolute top-0 left-0 w-2 h-2 rounded-full"
                  style={{
                    background: particle.color,
                    boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
                  }}
                />
              </div>
            )}
          </motion.div>
        );
      })}

      {/* Ambient sparkles that appear randomly */}
      <AmbientSparkles />
    </div>
  );
};

const AmbientSparkles = () => {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) {
        const newSparkle = {
          id: Math.random(),
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        };
        setSparkles(prev => [...prev.slice(-10), newSparkle]);
      }
    }, 500);

    const cleanup = setInterval(() => {
      setSparkles(prev => prev.slice(1));
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(cleanup);
    };
  }, []);

  return (
    <>
      {sparkles.map(sparkle => (
        <motion.div
          key={sparkle.id}
          className="absolute w-1 h-1 pointer-events-none"
          style={{
            left: sparkle.x,
            top: sparkle.y,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 3, ease: "easeOut" }}
        >
          <div className="w-full h-full bg-white rounded-full" 
               style={{ boxShadow: '0 0 4px #39FF14' }} />
        </motion.div>
      ))}
    </>
  );
};