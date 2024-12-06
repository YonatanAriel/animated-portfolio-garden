import { motion } from "framer-motion";

export const About = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-8 gradient-text"
        >
          About Me
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="card-gradient rounded-2xl p-6 md:p-8"
        >
          <p className="text-lg text-gray-300 leading-relaxed">
            I'm a passionate Full-Stack Developer with expertise in modern web technologies. 
            I love building scalable applications and solving complex problems with clean, efficient code.
          </p>
        </motion.div>
      </div>
    </section>
  );
};