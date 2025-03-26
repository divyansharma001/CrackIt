
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <div className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-24">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full mb-4">
                Master your DSA interviews
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Prepare for tech <br />
              interviews with 
              <span className="text-gradient"> real data</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Access previous DSA interview questions with their frequencies, so you can focus on what matters most for your target companies.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button size="lg" className="px-8 py-6 text-base">
                <a href="#companies">Start practicing now</a> 
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-6 text-base">
                <a href="#pricing">View pricing</a>
                
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1"
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur-xl opacity-50 animate-pulse"></div>
              <div className="glass-card p-6 rounded-xl relative z-10">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="col-span-2 p-4 bg-blue-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Frequency Analysis</h4>
                    <div className="h-4 bg-blue-200 dark:bg-blue-700 rounded-full w-3/4 mb-2"></div>
                    <div className="h-4 bg-blue-200 dark:bg-blue-700 rounded-full w-1/2 mb-2"></div>
                    <div className="h-4 bg-blue-200 dark:bg-blue-700 rounded-full w-5/6"></div>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-gray-800 rounded-lg flex flex-col justify-center items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-gray-700 flex items-center justify-center mb-2">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">85%</span>
                    </div>
                    <span className="text-xs text-center">Success rate</span>
                  </div>
                </div>
                
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Top questions at Google</h4>
                    <span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">Updated</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                      <span className="text-sm">Two Sum</span>
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400">32 times</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                      <span className="text-sm">LRU Cache</span>
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400">28 times</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                      <span className="text-sm">Merge Intervals</span>
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400">24 times</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-gray-700 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs mr-2">200+</div>
                    <span className="text-sm">Companies</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-gray-700 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs mr-2">5k+</div>
                    <span className="text-sm">Questions</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
