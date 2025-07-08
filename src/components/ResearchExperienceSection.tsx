import { researchExperience } from "@/lib/data";
import TimelineItem from "./TimelineItem";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import MotionWrapper from "./MotionWrapper";

export default function ResearchExperienceSection() {
  return (
    <section
      id="research"
      className="py-12 bg-gradient-to-b from-background to-muted/20"
    >
      <div className="container max-w-4xl mx-auto px-6 md:px-4">
        <MotionWrapper>
          <h2 className="text-2xl font-bold mb-8 text-center md:text-left flex items-center md:inline-block">
            <motion.span
              className="inline-block mr-2"
              initial={{ rotate: 0 }}
              whileInView={{ rotate: [0, -10, 10, -5, 5, 0] }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              🔬
            </motion.span>{" "}
            Research Experience
          </h2>
        </MotionWrapper>
        <div className="mb-8">
          {researchExperience.map((research, index) => (
            <TimelineItem
              title={`📖 ${research.position} | ${research.institution}`}
              subtitle={`👨‍🏫 Advisor: ${research.advisor} | 🌍 ${research.location}`}
              date={`📅 ${research.period}`}
              isLast={index === researchExperience.length - 1}
              index={index}
            >
              <motion.div
                className="mt-3 p-4 bg-background/80 backdrop-blur-sm backdrop-filter rounded-lg border border-blue-500/20 dark:bg-card/10 dark:border-blue-500/10 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-3">
                  <div className="h-6 w-6 flex items-center justify-center rounded-full bg-blue-500/10 mr-2">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium mb-1">Research Topic</h4>
                    <p className="text-sm text-muted-foreground mb-3">{research.topic}</p>
                  </div>
                </div>
                <div className="mb-3">
                  <h5 className="text-sm font-medium mb-2">Key Achievements</h5>
                  <ul className="list-none ml-4 space-y-2 text-sm">
                    {research.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        className="text-muted-foreground relative pl-6"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * i }}
                        viewport={{ once: true }}
                      >
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </TimelineItem>
          ))}
        </div>
      </div>
    </section>
  );
} 