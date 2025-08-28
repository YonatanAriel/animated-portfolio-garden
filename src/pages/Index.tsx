import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { SkillGarden } from "@/components/SkillGarden";
import { MagicalGarden } from "@/components/MagicalGarden";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  return (
    <main className="min-h-screen w-full bg-background">
      <ThemeToggle />
      <Hero />
      <About />
      <Skills />
      <SkillGarden />
      <MagicalGarden />
      <Projects />
      <Contact />
    </main>
  );
};

export default Index;
