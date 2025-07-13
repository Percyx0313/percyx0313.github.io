import React from "react";
import { projects } from "@/lib/data";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Github } from "lucide-react";
import { GlassCard } from "./ui/glass-card";
import MotionWrapper from "./MotionWrapper";
import { motion } from "framer-motion";

export default function ProjectsSection() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "research":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "industry":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "competition":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <section id="projects" className="py-8 relative">
      <div className="container max-w-4xl mx-auto px-6 md:px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <MotionWrapper key={project.title} delay={index * 0.2}>
              <GlassCard className="group overflow-hidden dark:border-purple-500/10 h-full flex flex-col">
                <CardHeader className="bg-gradient-to-r from-purple-500/5 to-pink-500/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 text-xs rounded-full border ${getTypeColor(project.type)}`}>
                      {project.type.toUpperCase()}
                    </span>
                  </div>
                  <CardTitle className="text-center md:text-left group-hover:text-purple-500 transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="list-disc ml-4 space-y-1 text-sm group-hover:space-y-2 transition-all duration-300 mb-4">
                    {project.description.map((desc, i) => (
                      <motion.li
                        key={i}
                        className="text-muted-foreground"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        {desc}
                      </motion.li>
                    ))}
                  </ul>
                  {project.tech && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="px-2 py-1 text-xs bg-muted rounded-md text-muted-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-center md:justify-start items-center border-t border-border/30 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-muted-foreground hover:text-purple-500 transition-colors group/link pt-8"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="h-4 w-4 mr-2 group-hover/link:rotate-12 transition-transform duration-300" />
                    View on GitHub 🔗
                  </motion.a>
                </CardFooter>
              </GlassCard>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
