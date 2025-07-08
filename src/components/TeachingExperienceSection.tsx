import { teachingExperience } from "@/lib/data";
import TimelineItem from "./TimelineItem";
import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import MotionWrapper from "./MotionWrapper";

export default function TeachingExperienceSection() {
  return (
    <section
      id="teaching"
      className="py-12 bg-gradient-to-b from-muted/20 to-background"
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
              🎓
            </motion.span>{" "}
            Teaching Experience
          </h2>
        </MotionWrapper>
        <div className="mb-8">
          {teachingExperience.map((teaching, index) => (
            <TimelineItem
              title={`👨‍🏫 ${teaching.position}`}
              subtitle={`🏫 ${teaching.institution} | 👨‍🏫 Instructor: ${teaching.instructor}`}
              date={`📅 ${teaching.period}`}
              isLast={index === teachingExperience.length - 1}
              index={index}
            >
              <motion.div
                className="mt-3 p-4 bg-background/80 backdrop-blur-sm backdrop-filter rounded-lg border border-green-500/20 dark:bg-card/10 dark:border-green-500/10 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-3">
                  <div className="h-6 w-6 flex items-center justify-center rounded-full bg-green-500/10 mr-2">
                    <GraduationCap className="h-4 w-4 text-green-500" />
                  </div>
                  <h4 className="text-sm font-medium">Teaching Role</h4>
                </div>
              </motion.div>
            </TimelineItem>
          ))}
        </div>
      </div>
    </section>
  );
} 