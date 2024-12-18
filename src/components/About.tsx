import { motion } from "framer-motion";

export const About = () => {
  return (
    <section id="about" className="py-20 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-8 text-primary animate-glow text-center"
        >
          About Me
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="bg-secondary/50  backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-primary/20 hover:border-primary/40 transition-colors shadow-lg hover:shadow-primary/20">
            <p className="text-lg text-gray-300 leading-relaxed">
              I approach each challenge with full energy, and when something
              seems impossible, I see it as a chance to level up. My experience
              includes developing multilingual websites, creating music
              applications, and building chat platforms with automatic
              translation capabilities.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
