import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Coffee } from "lucide-react";
import { Link } from "react-router-dom";

export function Pricing() {
  return (
    <section id="pricing" className="py-20 relative">
      <div className="absolute inset-0 z-10 bg-black/50 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl max-w-xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 dark:text-white">
            Placement Season Support
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Preparing for placements? We're here to help! This resource is free for all students during placement season.
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="https://buymeacoffee.com/divyansharma001" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition"
            >
              <Coffee className="mr-2" />
              Support the Creator
            </a>
            <Button variant="outline"><a href="https://discord.gg/bFVFxyDu">Join Community</a></Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            If this resource has helped you, consider supporting the creator's work
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 opacity-30 pointer-events-none select-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full mb-4">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose the plan that's right for your interview preparation needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Existing pricing card content */}
          {/* The content remains the same as in the original component */}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Not sure which plan is right for you?
          </p>
          <Button variant="outline">Contact us</Button>
        </motion.div>
      </div>
    </section>
  );
}