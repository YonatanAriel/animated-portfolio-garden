import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
      
      <div className="text-center relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          Hi, I'm <span className="animate-glow text-primary">Yonatan Ariel</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Code is my true love. As a full-stack developer, I quickly pick up new skills and break down complex problems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a 
            href="mailto:yonatanariel1000@gmail.com"
            className="bg-primary text-black px-8 py-3 rounded-full font-medium transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(57,255,20,0.5)]"
          >
            Contact Me
          </a>
          <a 
            href="https://github.com/YonatanAriel"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-primary text-primary px-8 py-3 rounded-full font-medium transition-all hover:bg-primary/10 hover:scale-105"
          >
            View GitHub
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 flex justify-center gap-6"
        >
          <a 
            href="tel:0585940960"
            className="text-gray-400 hover:text-primary transition-colors"
          >
            058-594-0960
          </a>
          <a 
            href="https://www.linkedin.com/in/yonatan-ariel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-primary transition-colors"
          >
            LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
};