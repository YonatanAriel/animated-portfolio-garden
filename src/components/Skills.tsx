import { motion } from "framer-motion";

export const Skills = () => {
  const skills = [
    { name: "React.js", icon: "⚛️" },
    { name: "TypeScript", icon: "👽" },
    { name: "JavaScript", icon: "🎋" },
    { name: "Node.js", icon: "🟢" },
    { name: "Express", icon: "🚂" },
    { name: "MongoDB", icon: "🍃" },
    { name: "SQL", icon: "📊" },
    { name: "HTML", icon: "🌐" },
    { name: "CSS", icon: "🎨" },
    { name: "Tailwind", icon: "🌊" },
  ];

  return (
    <section id="skills" className="py-20 px-4  bg-black">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center"
        >
          Skills & Technologies
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className=" card-gradient rounded-xl p-4 text-center hover:scale-105 transition-transform hover:shadow-lg hover:shadow-primary/20 group"
            >
              <div className="text-2xl mb-2 group-hover:animate-bounce">
                {skill.icon}
              </div>
              <div className="text-sm font-medium text-primary">
                {skill.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
