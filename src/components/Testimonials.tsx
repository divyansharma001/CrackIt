import { motion } from "framer-motion";

export function Testimonials() {
  // Selecting three testimonials, ensuring two are Indian names
  const selectedTestimonials = [
    {
      quote: "The frequency analysis and structured approach transformed my interview prep. I went from feeling overwhelmed to confidently tackling DSA problems, ultimately landing my dream role at Google.",
      name: "Priya Sharma",
      role: "Full Stack Developer",
      company: "Google"
    },
    {
      quote: "DSAPrep's pattern recognition feature was a game-changer. Instead of memorizing solutions, I learned to understand the core algorithmic concepts, which made a huge difference in my technical interviews.",
      name: "David Kim",
      role: "Senior Software Engineer",
      company: "Facebook"
    },
    {
      quote: "As a self-taught developer, I found the platform's company-specific insights incredibly valuable. The targeted preparation strategy helped me crack interviews at top tech companies.",
      name: "Rahul Patel",
      role: "Software Engineer",
      company: "Amazon"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Collecting feedbacks...
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 blur">
          {selectedTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 120
              }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6 pb-0">
                <div className="flex items-start mb-4">
                  <svg 
                    className="w-8 h-8 text-blue-500 dark:text-blue-400 mr-3 flex-shrink-0" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-gray-600 dark:text-gray-300 italic text-lg">
                    "{testimonial.quote}"
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900/30 p-4 flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role} at <span className="text-blue-600 dark:text-blue-400">{testimonial.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}