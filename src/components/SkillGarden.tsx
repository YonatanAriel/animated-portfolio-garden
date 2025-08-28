import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Skill data with plant types and growth stages
const skills = [
  { name: "React", emoji: "🌸", type: "flower", color: "#61DAFB", level: 95 },
  { name: "TypeScript", emoji: "🌿", type: "vine", color: "#3178C6", level: 90 },
  { name: "JavaScript", emoji: "🌻", type: "sunflower", color: "#F7DF1E", level: 95 },
  { name: "Node.js", emoji: "🌲", type: "tree", color: "#339933", level: 85 },
  { name: "MongoDB", emoji: "🍃", type: "leaf", color: "#47A248", level: 80 },
  { name: "Express", emoji: "🌱", type: "sprout", color: "#000000", level: 85 },
  { name: "Next.js", emoji: "⚡", type: "lightning", color: "#000000", level: 80 },
  { name: "Tailwind", emoji: "💨", type: "wind", color: "#06B6D4", level: 90 },
];

// Particle component for floating effects
const Particle = ({ delay, x, y }: { delay: number; x: number; y: number }) => {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-primary rounded-full opacity-60"
      style={{ left: x, top: y }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1, 0],
        opacity: [0, 0.8, 0],
        y: [0, -100],
        x: [0, Math.random() * 40 - 20],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 5 + 2,
      }}
    />
  );
};

// Individual skill plant component
const SkillPlant = ({ skill, index }: { skill: typeof skills[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasGrown, setHasGrown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHasGrown(true), index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <motion.div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ scale: 0, opacity: 0 }}
      animate={hasGrown ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: "backOut" }}
    >
      {/* Plant Container */}
      <motion.div
        className="relative bg-secondary/30 backdrop-blur-lg rounded-2xl p-6 border border-primary/20 hover:border-primary/60 transition-all duration-300"
        animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
        style={{
          background: isHovered 
            ? `linear-gradient(135deg, ${skill.color}15, transparent)`
            : undefined,
        }}
      >
        {/* Skill Icon/Emoji with animations */}
        <motion.div
          className="text-4xl mb-3 inline-block"
          animate={
            isHovered
              ? { scale: 1.2, rotate: [0, 5, -5, 0] }
              : { rotate: [0, 1, -1, 0] }
          }
          transition={
            isHovered
              ? { duration: 0.6 }
              : { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }
        >
          {skill.emoji}
        </motion.div>

        {/* Skill Name */}
        <h3 className="text-lg font-semibold text-white mb-2">{skill.name}</h3>

        {/* Animated Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-2 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            animate={hasGrown ? { width: `${skill.level}%` } : {}}
            transition={{ duration: 1.5, delay: index * 0.1 }}
            style={{
              boxShadow: isHovered
                ? `0 0 10px ${skill.color}, 0 0 20px ${skill.color}`
                : undefined,
            }}
          />
        </div>

        {/* Skill Level */}
        <motion.p
          className="text-sm text-gray-400"
          animate={isHovered ? { color: skill.color } : {}}
        >
          {skill.level}% Proficiency
        </motion.p>

        {/* Floating Particles on Hover */}
        {isHovered && (
          <>
            {Array.from({ length: 5 }).map((_, i) => (
              <Particle
                key={i}
                delay={i * 0.2}
                x={Math.random() * 200}
                y={Math.random() * 100}
              />
            ))}
          </>
        )}

        {/* Bloom Effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-primary/40"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.1, opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Growth animation lines/roots */}
      <motion.div
        className="absolute -bottom-4 left-1/2 w-0.5 bg-gradient-to-b from-primary to-transparent"
        initial={{ height: 0 }}
        animate={hasGrown ? { height: "20px" } : {}}
        transition={{ duration: 1, delay: index * 0.1 }}
      />
    </motion.div>
  );
};

// Background particles
const BackgroundParticles = () => {
  const particleCount = 15;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: particleCount }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: `radial-gradient(circle, ${
              Math.random() > 0.5 ? "#39FF14" : "#00FF41"
            }, transparent)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export const SkillGarden = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <section
      ref={containerRef}
      className="py-20 px-4 bg-black relative overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ y: y1, rotate }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      </motion.div>

      {/* Background Particles */}
      <BackgroundParticles />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 text-primary animate-glow"
            style={{ y: y2 }}
          >
            🌱 My Digital Skill Garden 🌱
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Watch my skills grow and bloom! Hover over each plant to see them come alive with animations.
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {skills.map((skill, index) => (
            <SkillPlant key={skill.name} skill={skill} index={index} />
          ))}
        </motion.div>

        {/* Garden Floor Effect */}
        <motion.div
          className="mt-12 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent relative"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          {/* Grass effect */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-3 bg-primary/30"
              style={{ left: `${(i / 20) * 100}%` }}
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: "12px", opacity: 0.6 }}
              transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};