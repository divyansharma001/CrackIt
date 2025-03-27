
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-blue-600 rounded-md rotate-45"></div>
            <div className="absolute inset-1 bg-white dark:bg-gray-900 rounded-sm flex items-center justify-center">
              <span className="text-blue-600 font-bold">⚡︎</span>
            </div>
          </div>
          <h1 className="text-xl font-bold">CrackIt</h1>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </a>
          <a href="#companies" className="text-sm font-medium hover:text-primary transition-colors">
            Companies
          </a>
          <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
          Pricing
          </a>
          <a href="https://github.com/divyansharma001/CrackIt" className="text-sm font-medium hover:text-primary transition-colors">
            Star this project
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
         
        </div>
      </div>
    </motion.header>
  );
}
