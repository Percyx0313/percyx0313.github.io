import { personalInfo } from "@/lib/data";
import { Mail, Github, MapPin, Linkedin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import MotionWrapper from "./MotionWrapper";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [isDark, setIsDark] = useState(false);

  // 檢測主題變化
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();
    
    // 監聽主題變化
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="container max-w-4xl mx-auto px-6 md:px-4 relative z-10">
        <motion.div
          className="flex flex-col md:flex-row md:items-center justify-between mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center md:text-left">
            <motion.h1
              className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
              variants={childVariants}
            >
              MAiTH LAB
              <span className="inline-block animate-pulse ml-2">🌀</span>
            </motion.h1>

            <motion.p
              className="text-2xl text-muted-foreground mb-2"
              variants={childVariants}
            >
              Mathematics & AI Teaching Laboratory
            </motion.p>

            <motion.p
              className="text-lg text-muted-foreground mb-6"
              variants={childVariants}
            >
              Founded by <strong>{personalInfo.name}</strong> 👨‍💻
            </motion.p>

            <motion.div
              className="flex flex-col gap-2 items-center md:items-start mb-4"
              variants={containerVariants}
            >
              <motion.div
                className="flex items-center text-sm text-muted-foreground"
                variants={childVariants}
                whileHover={{ scale: 1.05, color: "#4b5563" }}
              >
                <MapPin className="h-4 w-4 mr-2" />
                📍 {personalInfo.location}
              </motion.div>

              <motion.a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                variants={childVariants}
                whileHover={{ scale: 1.05, color: "#4b5563" }}
              >
                <Mail className="h-4 w-4 mr-2" />
                ✉️ {personalInfo.email}
              </motion.a>

              {personalInfo.github && (
                <motion.a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                  variants={childVariants}
                  whileHover={{ scale: 1.05, color: "#4b5563" }}
                >
                  <Github className="h-4 w-4 mr-2" />
                  🌟 GitHub
                </motion.a>
              )}

              {personalInfo.linkedin && (
                <motion.a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                  variants={childVariants}
                  whileHover={{ scale: 1.05, color: "#4b5563" }}
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  🔗 LinkedIn
                </motion.a>
              )}
            </motion.div>
          </div>

          <motion.div
            className="mt-6 md:mt-0 flex justify-center"
            variants={childVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <img
                src={isDark ? "/images/logos/logo-dark.svg" : "/images/logos/logo-light.svg"}
                alt="MAiTH LAB Logo"
                className="w-64 md:w-80 relative"
                style={{ objectFit: "contain" }}
              />
            </div>
          </motion.div>
        </motion.div>

        <MotionWrapper>
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm backdrop-filter p-6 rounded-lg border border-purple-500/20 dark:border-purple-500/10 shadow-sm">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-center md:text-left">🚀 Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                MAiTH LAB is dedicated to advancing mathematics and artificial intelligence education through 
                cutting-edge research, innovative teaching methods, and practical applications. We bridge the gap 
                between theoretical knowledge and real-world problem-solving.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <h4 className="font-medium mb-2">🔬 Research Areas</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Computer Vision & Neural Rendering</li>
                  <li>• 3D Gaussian Splatting & NeRF</li>
                  <li>• Fairness in AI Systems</li>
                  <li>• Edge AI & Mobile Computing</li>
                </ul>
              </div>
              
              <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <h4 className="font-medium mb-2">🎓 Education Focus</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Mathematics & Statistics</li>
                  <li>• Machine Learning Fundamentals</li>
                  <li>• Computer Vision Applications</li>
                  <li>• Programming & Algorithm Design</li>
                </ul>
              </div>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
