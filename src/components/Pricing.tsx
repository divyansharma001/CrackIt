
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function Pricing() {
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
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
            It's <span className="font-semibold text-green-400">FREE</span> for this placement season. Enjoy the benefits of the Pro plan for free.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-xl font-bold mb-2">Basic</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Perfect for individuals just starting out</p>
            
            <div className="mb-6">
              <span className="text-4xl font-bold">$9</span>
              <span className="text-gray-600 dark:text-gray-400">/month</span>
            </div>
            
            <Button className="w-full mb-6">Get started</Button>
            
            <ul className="space-y-3">
              {[
                "Access to top 50 most frequent questions",
                "Basic frequency data",
                "Solutions with explanations",
                "Focus on FAANG companies",
                "Email support"
              ].map((feature) => (
                <li key={feature} className="flex items-start">
                  <Check className="text-green-500 mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-blue-600 text-white p-8 rounded-xl shadow-lg relative border border-blue-500 transform md:-translate-y-4 md:scale-105"
          >
            <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
              <div className="bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-2">Pro</h3>
            <p className="text-blue-100 mb-6">For serious interview preparation</p>
            
            <div className="mb-6">
              <span className="text-4xl font-bold">$19</span>
              <span className="text-blue-100">/month</span>
            </div>
            
            <Button className="w-full mb-6 bg-white hover:bg-gray-100 text-blue-600">Get started</Button>
            
            <ul className="space-y-3">
              {[
                "Access to all questions with frequency data",
                "Company-specific preparation paths",
                "Advanced pattern recognition",
                "Detailed solutions with code",
                "Performance tracking",
                "Weekly mock interviews",
                "Priority email support"
              ].map((feature) => (
                <li key={feature} className="flex items-start">
                  <Check className="text-white mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-xl font-bold mb-2">Enterprise</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">For teams and organizations</p>
            
            <div className="mb-6">
              <span className="text-4xl font-bold">$49</span>
              <span className="text-gray-600 dark:text-gray-400">/month</span>
            </div>
            
            <Button variant="outline" className="w-full mb-6">Contact sales</Button>
            
            <ul className="space-y-3">
              {[
                "Everything in Pro plan",
                "Team management dashboard",
                "Custom company focus",
                "API access to frequency data",
                "Advanced analytics",
                "Dedicated account manager",
                "24/7 priority support"
              ].map((feature) => (
                <li key={feature} className="flex items-start">
                  <Check className="text-green-500 mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            If you still want to support me,
          </p>
          <Button variant="outline"> <a href="https://buymeacoffee.com/divyansharma001">Buy me a coffee</a></Button>
        </motion.div>
      </div>
    </section>
  );
}
