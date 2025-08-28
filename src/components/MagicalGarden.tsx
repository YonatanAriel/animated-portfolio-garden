import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Enhanced particle component with more variety
const EnhancedParticle = ({ 
  delay, 
  x, 
  y, 
  type = "sparkle" 
}: { 
  delay: number; 
  x: number; 
  y: number; 
  type?: "sparkle" | "pollen" | "magic" | "star";
}) => {
  const particleVariants = {
    sparkle: {
      char: "✨",
      size: "text-xs",
      color: "#39FF14",
    },
    pollen: {
      char: "🌟",
      size: "text-xs",
      color: "#FFD700",
    },
    magic: {
      char: "💫",
      size: "text-sm",
      color: "#00FF41",
    },
    star: {
      char: "⭐",
      size: "text-xs",
      color: "#FFFFFF",
    },
  };

  const variant = particleVariants[type];

  return (
    <motion.div
      className={`absolute ${variant.size} pointer-events-none select-none`}
      style={{ 
        left: x, 
        top: y,
        color: variant.color,
        filter: "drop-shadow(0 0 4px currentColor)",
      }}
      initial={{ scale: 0, opacity: 0, rotate: 0 }}
      animate={{
        scale: [0, 1.2, 0.8, 0],
        opacity: [0, 1, 0.8, 0],
        y: [0, -120],
        x: [0, Math.random() * 60 - 30],
        rotate: [0, 360],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 8 + 3,
        ease: "easeOut",
      }}
    >
      {variant.char}
    </motion.div>
  );
};

// Floating island/garden bed component
const FloatingIsland = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <motion.div
      className="relative"
      initial={{ y: 0 }}
      animate={{ 
        y: [0, -8, 0],
        rotateX: [0, 2, 0],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

// Animated connection lines between skills
const SkillConnection = ({ 
  from, 
  to, 
  delay = 0 
}: { 
  from: { x: number; y: number }; 
  to: { x: number; y: number }; 
  delay?: number;
}) => {
  const pathLength = useMotionValue(0);
  const pathSpring = useSpring(pathLength, { damping: 20, stiffness: 100 });

  useEffect(() => {
    const timer = setTimeout(() => {
      pathLength.set(1);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, pathLength]);

  return (
    <motion.svg
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    >
      <motion.path
        d={`M ${from.x} ${from.y} Q ${(from.x + to.x) / 2} ${Math.min(from.y, to.y) - 50} ${to.x} ${to.y}`}
        stroke="url(#gradient)"
        strokeWidth="2"
        fill="none"
        style={{ pathLength: pathSpring }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0.3] }}
        transition={{ duration: 2, delay }}
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#39FF14" stopOpacity="0" />
          <stop offset="50%" stopColor="#39FF14" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00FF41" stopOpacity="0" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};

// Enhanced weather effects
const WeatherEffects = () => {
  const [currentWeather, setCurrentWeather] = useState<"rain" | "wind" | "sparkles">("sparkles");

  useEffect(() => {
    const weatherCycle = setInterval(() => {
      setCurrentWeather(prev => {
        const weathers: typeof currentWeather[] = ["rain", "wind", "sparkles"];
        const currentIndex = weathers.indexOf(prev);
        return weathers[(currentIndex + 1) % weathers.length];
      });
    }, 8000);

    return () => clearInterval(weatherCycle);
  }, []);

  const raindrops = Array.from({ length: 15 }).map((_, i) => (
    <motion.div
      key={`rain-${i}`}
      className="absolute w-0.5 h-8 bg-gradient-to-b from-blue-400 to-transparent opacity-60"
      style={{
        left: `${Math.random() * 100}%`,
        top: "-10px",
      }}
      animate={{
        y: ["0vh", "110vh"],
        opacity: [0, 0.8, 0],
      }}
      transition={{
        duration: 1.5,
        delay: Math.random() * 2,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  ));

  const windParticles = Array.from({ length: 20 }).map((_, i) => (
    <motion.div
      key={`wind-${i}`}
      className="absolute w-1 h-1 bg-gray-400 rounded-full opacity-40"
      style={{
        left: "-10px",
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        x: ["0vw", "110vw"],
        y: [0, Math.random() * 40 - 20],
        opacity: [0, 0.6, 0],
      }}
      transition={{
        duration: 3,
        delay: Math.random() * 2,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  ));

  const sparkleParticles = Array.from({ length: 12 }).map((_, i) => (
    <EnhancedParticle
      key={`weather-sparkle-${i}`}
      delay={Math.random() * 3}
      x={Math.random() * window.innerWidth}
      y={Math.random() * 400}
      type={Math.random() > 0.5 ? "sparkle" : "magic"}
    />
  ));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {currentWeather === "rain" && raindrops}
      {currentWeather === "wind" && windParticles}
      {currentWeather === "sparkles" && sparkleParticles}
    </div>
  );
};

export const MagicalGarden = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Enhanced parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);

  // Mouse tracking for interactive effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left) / width - 0.5);
    mouseY.set((clientY - top) / height - 0.5);
  };

  return (
    <motion.section
      ref={containerRef}
      className="py-20 px-4 bg-black relative overflow-hidden min-h-screen"
      onMouseMove={handleMouseMove}
      style={{ scale }}
    >
      {/* Enhanced Multi-layer Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ y: y1, rotate }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_var(--tw-gradient-stops))] from-accent/15 via-transparent to-transparent" />
      </motion.div>

      {/* Weather Effects */}
      <WeatherEffects />

      {/* Aurora Background Effect */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "linear-gradient(45deg, #39FF14, transparent, #00FF41)",
            "linear-gradient(135deg, #00FF41, transparent, #39FF14)",
            "linear-gradient(225deg, #39FF14, transparent, #00FF41)",
            "linear-gradient(315deg, #00FF41, transparent, #39FF14)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Enhanced Header with Interactive Elements */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "backOut" }}
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-8 text-primary animate-glow relative"
            style={{ 
              y: y2,
              rotateX: useTransform(mouseY, [-0.5, 0.5], [-5, 5]),
              rotateY: useTransform(mouseX, [-0.5, 0.5], [-10, 10]),
            }}
          >
            <motion.span
              className="inline-block"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🌱
            </motion.span>
            {" "}Magical Skill Garden{" "}
            <motion.span
              className="inline-block"
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              🌱
            </motion.span>
            
            {/* Floating decorative elements */}
            <motion.div
              className="absolute -top-4 -left-4 text-2xl"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              ✨
            </motion.div>
            <motion.div
              className="absolute -top-4 -right-4 text-2xl"
              animate={{
                y: [0, -15, 0],
                rotate: [360, 0],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            >
              🌟
            </motion.div>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Welcome to my enchanted digital garden! Each skill is a living plant that grows, blooms, and sparkles with magic. 
            <br />
            <motion.span
              className="text-primary font-semibold"
              animate={{ textShadow: ["0 0 0px #39FF14", "0 0 10px #39FF14", "0 0 0px #39FF14"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Hover to awaken their magic! ✨
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Floating Islands Container */}
        <FloatingIsland delay={0}>
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Skill Connections */}
            <div className="absolute inset-0">
              <SkillConnection 
                from={{ x: 200, y: 200 }} 
                to={{ x: 400, y: 200 }} 
                delay={2} 
              />
              <SkillConnection 
                from={{ x: 600, y: 200 }} 
                to={{ x: 800, y: 200 }} 
                delay={2.5} 
              />
            </div>

            {/* Enhanced Magical Ground */}
            <motion.div
              className="mb-8 relative"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 1 }}
            >
              <div className="h-2 bg-gradient-to-r from-transparent via-primary/60 to-transparent rounded-full relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/80"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>

              {/* Grass and flower decorations */}
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 bg-green-400"
                  style={{ 
                    left: `${(i / 30) * 100}%`,
                    bottom: "0px",
                  }}
                  initial={{ height: 0, opacity: 0 }}
                  whileInView={{ 
                    height: `${Math.random() * 15 + 8}px`, 
                    opacity: 0.7 
                  }}
                  animate={{
                    rotateZ: [0, 2, -2, 0],
                  }}
                  transition={{ 
                    delay: 1 + i * 0.03, 
                    duration: 0.5,
                    rotateZ: {
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }
                  }}
                />
              ))}

              {/* Scattered flower decorations */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={`flower-${i}`}
                  className="absolute text-sm"
                  style={{ 
                    left: `${Math.random() * 90 + 5}%`,
                    bottom: "8px",
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 0.8 }}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotateZ: [0, 5, -5, 0],
                  }}
                  transition={{ 
                    delay: 1.5 + i * 0.2, 
                    duration: 0.5,
                    scale: {
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                    },
                    rotateZ: {
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }
                  }}
                >
                  {["🌸", "🌼", "🌺", "🌻"][i % 4]}
                </motion.div>
              ))}
            </motion.div>

            {/* Message encouraging interaction */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              <motion.p
                className="text-primary/80 text-sm font-medium"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                ✨ Move your mouse around and hover over the skills to see the magic! ✨
              </motion.p>
            </motion.div>
          </motion.div>
        </FloatingIsland>
      </div>

      {/* Ambient Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <EnhancedParticle
            key={`ambient-${i}`}
            delay={Math.random() * 5}
            x={Math.random() * window.innerWidth}
            y={Math.random() * window.innerHeight}
            type={["sparkle", "pollen", "magic", "star"][Math.floor(Math.random() * 4)] as any}
          />
        ))}
      </div>
    </motion.section>
  );
};