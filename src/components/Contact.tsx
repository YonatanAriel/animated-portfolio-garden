import { motion } from "framer-motion";

export const Contact = () => {
  return (
    <section id="contact" className="py-20 px-4 bg-black">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-8 gradient-text"
        >
          Get In Touch
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="card-gradient rounded-2xl p-8 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
        >
          <p className="text-lg text-gray-300 mb-8">
            I'm always open to new opportunities and interesting projects. Feel
            free to reach out!
          </p>
          <a
            href="mailto:yonatanariel1000@gmail.com"
            className="inline-block bg-primary hover:bg-primary/90 text-black px-8 py-3 rounded-full font-medium transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(57,255,20,0.5)]"
          >
            Say Hello
          </a>
        </motion.div>
      </div>
    </section>
  );
};
