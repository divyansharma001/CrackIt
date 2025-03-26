
import { motion } from "framer-motion";
import { Check, BarChart3, Clock, BookOpen, Database, Zap } from "lucide-react";

export function Features() {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to ace your interview
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our platform provides the data and tools you need to prepare efficiently and effectively.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.points.map((point) => (
                  <li key={point} className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20 p-8 bg-blue-50 dark:bg-blue-900/10 rounded-xl relative overflow-hidden"
        >
          <div className="absolute right-0 bottom-0 w-1/3 h-full opacity-10 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-blue-600">
              <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75c-1.036 0-1.875-.84-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75C3.84 21.75 3 20.91 3 19.875v-6.75z" />
            </svg>
          </div>
          
          <div className="relative z-10 max-w-3xl">
            <h3 className="text-2xl font-bold mb-4">Data-driven preparation</h3>
            <p className="text-lg mb-6">
              Stop guessing which problems to solve. Our frequency analysis tells you exactly what to focus on for each company.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                  <span className="font-bold">85%</span>
                </div>
                <div>
                  <h4 className="font-medium">Higher success rate</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">compared to random practice</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                  <span className="font-bold">50%</span>
                </div>
                <div>
                  <h4 className="font-medium">Less time spent</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">with targeted preparation</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: BarChart3,
    title: "Frequency Analysis",
    description: "Know exactly which questions are most frequently asked at each company.",
    points: [
      "See how often each problem appears in interviews",
      "Filter by company, time period, and problem type",
      "Focus on high-frequency questions first"
    ]
  },
  {
    icon: Database,
    title: "Comprehensive Database",
    description: "Access thousands of real interview questions from hundreds of companies.",
    points: [
      "Over 5,000 unique DSA questions",
      "Covering 200+ top tech companies",
      "Regularly updated with new questions"
    ]
  },
  {
    icon: BookOpen,
    title: "Detailed Solutions",
    description: "Learn the optimal approaches to solve each problem effectively.",
    points: [
      "Multiple solution approaches for each problem",
      "Time and space complexity analysis",
      "Step-by-step explanations with code"
    ]
  },
  {
    icon: Clock,
    title: "Time-Saving Preparation",
    description: "Prepare more efficiently by focusing on what matters most.",
    points: [
      "Company-specific preparation paths",
      "Prioritized question lists based on frequency",
      "Mock interview preparation plans"
    ]
  },
  {
    icon: Zap,
    title: "Performance Tracking",
    description: "Monitor your progress and identify areas for improvement.",
    points: [
      "Track problems solved and time spent",
      "Analyze your strengths and weaknesses",
      "Receive personalized recommendations"
    ]
  },
  {
    icon: Database,
    title: "Pattern Recognition",
    description: "Identify common patterns across interview questions.",
    points: [
      "Group questions by solution patterns",
      "Learn reusable strategies",
      "Apply patterns to solve new problems"
    ]
  }
];
