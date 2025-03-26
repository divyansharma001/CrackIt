
import { motion } from "framer-motion";

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-900/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Success stories from our users
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join thousands of engineers who have used DSAPrep to land their dream jobs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 relative"
            >
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mr-4">
                  <div className="w-full h-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{testimonial.company}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-lg mb-6 max-w-3xl mx-auto">
            Join over <span className="font-bold">10,000+ engineers</span> who have used DSAPrep to prepare for technical interviews at top companies
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {['Google', 'Amazon', 'Microsoft', 'Facebook', 'Apple'].map((company) => (
              <div key={company} className="text-gray-500 dark:text-gray-400 font-bold">{company}</div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote: "This platform completely changed my interview preparation. I went from struggling with random LeetCode problems to a focused strategy based on frequency data. Landed my dream job at Google!",
    name: "Sarah Chen",
    role: "Software Engineer",
    company: "Google"
  },
  {
    quote: "The frequency analysis saved me so much time. I knew exactly which problems to focus on for Amazon interviews, and I ended up getting multiple questions that were on the high-frequency list.",
    name: "Michael Johnson",
    role: "Backend Developer",
    company: "Amazon"
  },
  {
    quote: "As a self-taught developer, I was overwhelmed by the sheer number of DSA problems out there. DSAPrep helped me create a structured study plan that got me offers from both Microsoft and Uber.",
    name: "Priya Sharma",
    role: "Full Stack Developer",
    company: "Microsoft"
  },
  {
    quote: "I had interviews lined up with Facebook, Google, and Amazon. The company-specific data helped me prioritize my preparation, and I ended up with offers from all three!",
    name: "David Kim",
    role: "Senior Engineer",
    company: "Facebook"
  },
  {
    quote: "The pattern recognition feature helped me understand the underlying patterns instead of just memorizing solutions. This was a game-changer for tackling new problems in interviews.",
    name: "Emily Rodriguez",
    role: "Software Developer",
    company: "LinkedIn"
  },
  {
    quote: "After failing technical interviews at two FAANG companies, I found DSAPrep. Six months later, I passed my Facebook interview with flying colors. The frequency data is absolutely crucial.",
    name: "Jamal Wilson",
    role: "Frontend Engineer",
    company: "Facebook"
  }
];
