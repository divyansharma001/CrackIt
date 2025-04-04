import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Github } from 'lucide-react';
import { motion } from "framer-motion";

export function ProblemSolver() {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('messages');
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    // scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setIsLoading(true);
    setError('');

    const newUserMessage = {
      role: 'user',
      content: userInput
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');

    try {
      const res = await fetch(`https://leet-aid-be.vercel.app/api/v1/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userInput,
          conversationHistory: messages,
        }),
      });
      
      const data = await res.json();
      const newAIMessage = {
        role: 'assistant',
        content: data.response
      };
      
      setMessages(prev => [...prev, newAIMessage]);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearConversation = () => {
    setMessages([]);
    localStorage.removeItem('messages');
  };

  const formatMessageContent = (content) => {
    if (content.includes('```')) {
      const parts = content.split(/(```[\s\S]*?```)/);
      return parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const code = part.slice(3, -3);
          return (
            <pre key={index} className="bg-gray-900 p-4 rounded-lg mt-2 mb-2 overflow-x-auto border border-gray-700">
              <code className="font-mono text-sm text-gray-200">{code}</code>
            </pre>
          );
        }
        return (
          <span key={index} className="whitespace-pre-wrap">
            {part}
          </span>
        );
      });
    }
    return content;
  };

  return (
    <div className="relative overflow-hidden min-h-screen bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]">
      <div className="container mx-auto px-4 pt-8 pb-8">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full mb-4">
            Get unstuck fast
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Solve your <span className="text-gradient">DSA problems</span> with guidance
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Paste your problem or code below and receive hints that guide you toward the solution without giving everything away.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Input Area */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1"
          >
            <div className="glass-card p-6 rounded-xl relative mb-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Paste your code or problem here..."
                    className="w-full bg-white/5 backdrop-blur-sm text-gray-800 dark:text-gray-100 rounded-xl px-6 py-4 resize-none border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors min-h-[240px] placeholder-gray-400 font-sans text-base shadow-lg"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Button 
                    type="button" 
                    onClick={handleClearConversation}
                    variant="outline"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Clear Chat
                  </Button>
                  
                  <Button
                    type="submit"
                    disabled={isLoading || !userInput.trim()}
                    className={`px-6 py-3 ${
                      isLoading || !userInput.trim()
                        ? 'opacity-70 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing
                      </span>
                    ) : 'Get Hint'}
                  </Button>
                </div>
              </form>
              
              {error && (
                <div className="mt-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
            </div>
            
            <div className="glass-card p-6 rounded-xl relative">
              <h3 className="font-medium mb-2">Problem solving tips</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  Start by clearly defining the problem
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  Break down complex problems into smaller parts
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  Consider edge cases and constraints
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  Test your solution with different inputs
                </li>
              </ul>
            </div>
          </motion.div>
          
          {/* Right Column - Conversation History */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex-1"
          >
            <div className="glass-card rounded-xl relative overflow-hidden flex flex-col h-full">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white/5 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Conversation</h3>
                  <div className="flex items-center space-x-2">
                    <a
                      href="https://github.com/divyansharma001"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <Github size={16} />
                      <span className="hidden sm:inline">GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6 max-h-[500px]">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400 space-y-4 py-8">
                    <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg font-medium mb-1">No conversations yet</p>
                      <p className="text-sm">Paste your code or problem to get started</p>
                    </div>
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[90%] ${
                        msg.role === 'user' 
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl rounded-tr-none' 
                          : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl rounded-tl-none'
                      } px-6 py-4 shadow-lg backdrop-blur-sm border border-gray-200 dark:border-gray-700`}>
                        <div className="text-sm mb-1 opacity-70">
                          {msg.role === 'user' ? 'You' : 'CrackIt Assistant'}
                        </div>
                        <div className="text-base">
                          {formatMessageContent(msg.content)}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ProblemSolver;