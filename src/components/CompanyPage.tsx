import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Papa from 'papaparse';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from 'usehooks-ts';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronFirst, 
  ChevronLast, 
  Check, 
  Filter, 
  Clock 
} from 'lucide-react';
import { Header } from './Header';

const CompanyPage: React.FC = () => {
  const { companyName } = useParams<{ companyName: string }>();
  const [timeFrame, setTimeFrame] = useState('1year');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    difficulty: 'All',
    minFrequency: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [solvedQuestions, setSolvedQuestions] = useLocalStorage<string[]>('solved-questions', []);
  
  // Enhanced pagination settings
  const itemsPerPage = 15;
  const timeFrames = ['6months', '1year', '2year', 'alltime'];

  const loadCSV = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/csv/${companyName}_${timeFrame}.csv`);
      if (!response.ok) throw new Error(`Failed to fetch CSV: ${response.status}`);
      
      const csvText = await response.text();
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setData(result.data);
          setCurrentPage(1); // Reset to first page on new data load
          setLoading(false);
        },
        error: (error) => {
          console.error("CSV Parsing Error:", error);
          setLoading(false);
        },
      });
    } catch (error) {
      console.error("Error loading CSV:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCSV();
  }, [companyName, timeFrame]);

  const filteredData = useMemo(() => {
    return data.filter(row => {
      const difficultyMatch = filters.difficulty === 'All' || row.Difficulty === filters.difficulty;
      const frequencyMatch = parseFloat(row.Frequency) >= filters.minFrequency;
      return difficultyMatch && frequencyMatch;
    });
  }, [data, filters]);

  // Improved pagination logic
  const totalPages = useMemo(() => Math.ceil(filteredData.length / itemsPerPage), [filteredData]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const toggleSolvedQuestion = (questionId: string) => {
    setSolvedQuestions(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId) 
        : [...prev, questionId]
    );
  };

  // Enhanced pagination rendering
  const renderPagination = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust start page if we're near the end
    if (endPage === totalPages) {
      startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <motion.button
          key={i}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-1 mx-1 rounded-md transition-all duration-300 ${
            currentPage === i 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {i}
        </motion.button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
        <Header/>
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-extrabold mb-10 capitalize text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
        >
          {companyName} Interview Questions
        </motion.h1>

        {/* Time Frame and Filters Container */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 mb-8"
        >
          {/* Time Frame Selector */}
          <div className="flex space-x-2">
            {timeFrames.map(frame => (
              <motion.button 
                key={frame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTimeFrame(frame)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center ${
                  timeFrame === frame 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Clock className="mr-2 w-4 h-4" />
                {frame.replace('time', ' Time')}
              </motion.button>
            ))}
          </div>

          {/* Filters */}
          <div className="flex space-x-4">
            <div className="relative">
              <select 
                value={filters.difficulty} 
                onChange={(e) => {
                  setFilters(prev => ({...prev, difficulty: e.target.value}));
                  setCurrentPage(1);
                }}
                className="p-2 pl-8 border rounded-lg bg-gray-700 border-gray-600 text-white appearance-none"
              >
                <option value="All">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <Filter className="absolute left-2 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <input 
                type="number" 
                placeholder="Min Frequency" 
                value={filters.minFrequency}
                onChange={(e) => {
                  setFilters(prev => ({...prev, minFrequency: parseFloat(e.target.value) || 0}));
                  setCurrentPage(1);
                }}
                className="p-2 pl-8 border rounded-lg bg-gray-700 border-gray-600 text-white w-32"
                step="0.01"
                min="0"
              />
              <Filter className="absolute left-2 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* Data Table */}
        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="animate-pulse text-2xl flex justify-center items-center space-x-4">
              <span>Loading</span>
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-150"></div>
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-300"></div>
            </div>
          </motion.div>
        ) : filteredData.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-x-auto"
            >
              <table className="w-full rounded-lg overflow-hidden shadow-lg">
                <thead className="bg-gray-800">
                  <tr>
                    {['Solved', 'ID', 'Title', 'Acceptance', 'Difficulty', 'Frequency', 'Leetcode Link'].map((header) => (
                      <th key={header} className="p-3 text-left font-semibold">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {paginatedData.map((row, index) => (
                      <motion.tr 
                        key={row.ID} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-t border-gray-700 hover:bg-gray-800"
                      >
                        <td className="p-3">
                          <motion.input 
                            type="checkbox" 
                            checked={solvedQuestions.includes(row.ID)}
                            onChange={() => toggleSolvedQuestion(row.ID)}
                            whileTap={{ scale: 0.9 }}
                            className="form-checkbox h-5 w-5 text-blue-600 bg-gray-700 border-gray-600 rounded"
                          />
                        </td>
                        <td className="p-3">{row.ID}</td>
                        <td className="p-3">{row.Title}</td>
                        <td className="p-3">{row.Acceptance}</td>
                        <td className={`p-3 font-bold ${
                          row.Difficulty === 'Easy' ? 'text-green-500' : 
                          row.Difficulty === 'Medium' ? 'text-yellow-500' : 
                          'text-red-500'
                        }`}>
                          {row.Difficulty}
                        </td>
                        <td className="p-3">{parseFloat(row.Frequency).toFixed(4)}</td>
                        <td className="p-3">
                          <motion.a 
                            href={row["Leetcode Question Link"]?.trim()} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
                          >
                            <Check className="mr-1 w-4 h-4" /> Link
                          </motion.a>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </motion.div>

            {/* Enhanced Pagination Controls */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center items-center mt-8 space-x-2"
            >
              {/* First Page */}
              <motion.button 
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-md bg-gray-700 text-gray-300 disabled:opacity-50"
              >
                <ChevronFirst className="w-5 h-5" />
              </motion.button>

              {/* Previous Page */}
              <motion.button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-md bg-gray-700 text-gray-300 disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              {/* Page Numbers */}
              {renderPagination()}

              {/* Next Page */}
              <motion.button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-md bg-gray-700 text-gray-300 disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>

              {/* Last Page */}
              <motion.button 
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-md bg-gray-700 text-gray-300 disabled:opacity-50"
              >
                <ChevronLast className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </>
        ) : (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600 py-12 text-2xl"
          >
            No data available for the selected filters
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default CompanyPage;