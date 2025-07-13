import { personalInfo } from "@/lib/data";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Footer() {
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

  return (
    <footer className="border-t border-purple-500/10 py-8 bg-gradient-to-b from-background to-muted/20 backdrop-blur-sm">
      <div className="container max-w-4xl mx-auto px-6 md:px-4">
        <motion.div
          className="flex flex-col items-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* MAiTH LAB品牌區域 */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src={isDark ? "/images/logos/icon-dark.svg" : "/images/logos/icon-light.svg"} 
              alt="MAiTH LAB" 
              className="w-10 h-10"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              MAiTH LAB
            </span>
          </motion.div>

          {/* 品牌描述 */}
          <motion.p
            className="text-center text-muted-foreground max-w-md"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Advancing mathematics and AI education through research, innovation, and practical applications.
          </motion.p>

          {/* 版權信息 */}
          <motion.div
            className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.p
              className="text-center"
              whileHover={{ scale: 1.01 }}
            >
              &copy; {new Date().getFullYear()} MAiTH LAB. All rights reserved.
            </motion.p>
            <motion.p
              className="text-center"
              whileHover={{ scale: 1.01 }}
            >
              Founded by {personalInfo.name} 🌀
            </motion.p>
          </motion.div>

          {/* 技術信息 */}
          <motion.p
            className="text-sm text-muted-foreground text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.01 }}
          >
            Built with{" "}
            <motion.span
              className="inline-block"
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              💻
            </motion.span>{" "}
            and{" "}
            <motion.span
              className="inline-block"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1.5,
              }}
            >
              ❤️
            </motion.span>
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}
