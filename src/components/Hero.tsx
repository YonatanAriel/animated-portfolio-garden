import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-black relative overflow-hidden">
      <div className="absolute  inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />

      <div className="text-center relative z-10 max-w-4xl mx-auto ">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl text-white sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          Hi, I'm{" "}
          <span className="animate-glow text-primary">Yonatan Ariel</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-300  mb-8 max-w-2xl mx-auto px-4"
        >
          I’m a full-stack developer, and code is my true love. Want to be my
          second commit?
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 px-4"
        >
          <a
            href="mailto:yonatanariel1000@gmail.com"
            className="bg-primary text-black px-6 sm:px-8 py-3 rounded-full font-medium transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(57,255,20,0.5)] w-full sm:w-auto"
          >
            Contact Me
          </a>
          <a
            href="https://github.com/YonatanAriel"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-primary text-primary px-6 sm:px-8 py-3 rounded-full font-medium transition-all hover:bg-primary/10 hover:scale-105 w-full sm:w-auto"
          >
            View GitHub
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row justify-center gap-6 px-4"
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
