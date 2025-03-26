import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Papa from 'papaparse';
import { motion } from 'framer-motion';
import { useLocalStorage } from 'usehooks-ts';

const CompanyPage: React.FC = () => {
  const { companyName } = useParams<{ companyName: string }>();
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [timeFrame, setTimeFrame] = useState('1year');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    difficulty: 'All',
    minFrequency: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [solvedQuestions, setSolvedQuestions] = useLocalStorage<string[]>('solved-questions', []);
  
  const itemsPerPage = 10;
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

  const filteredData = data.filter(row => {
    const difficultyMatch = filters.difficulty === 'All' || row.Difficulty === filters.difficulty;
    const frequencyMatch = parseFloat(row.Frequency) >= filters.minFrequency;
    return difficultyMatch && frequencyMatch;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const toggleSolvedQuestion = (questionId: string) => {
    setSolvedQuestions(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId) 
        : [...prev, questionId]
    );
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-4 py-2 mx-1 rounded-lg transition-all duration-300 ${
            currentPage === i 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-12">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 capitalize text-center"
        >
          {companyName} Interview Questions
        </motion.h1>

        {/* Time Frame Selector */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center space-x-2 mb-6"
        >
          {timeFrames.map(frame => (
            <motion.button 
              key={frame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTimeFrame(frame)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                timeFrame === frame 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {frame.replace('time', ' Time')}
            </motion.button>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center space-x-4 mb-6"
        >
          <select 
            value={filters.difficulty} 
            onChange={(e) => {
              setFilters(prev => ({...prev, difficulty: e.target.value}));
              setCurrentPage(1); // Reset to first page when filters change
            }}
            className="p-2 border rounded-lg bg-gray-700 border-gray-600 text-white"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <input 
            type="number" 
            placeholder="Min Frequency" 
            value={filters.minFrequency}
            onChange={(e) => {
              setFilters(prev => ({...prev, minFrequency: parseFloat(e.target.value) || 0}));
              setCurrentPage(1); // Reset to first page when filters change
            }}
            className="p-2 border rounded-lg bg-gray-700 border-gray-600 text-white"
            step="0.01"
            min="0"
          />
        </motion.div>

        {/* Data Table */}
        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="animate-pulse text-xl">Loading...</div>
          </motion.div>
        ) : filteredData.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-x-auto"
            >
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    {['Solved', 'ID', 'Title', 'Acceptance', 'Difficulty', 'Frequency', 'Leetcode Link'].map((header) => (
                      <th key={header} className="p-3 text-left font-semibold">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((row, index) => (
                    <motion.tr 
                      key={row.ID} 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-t border-gray-700 hover:bg-gray-800"
                    >
                      <td className="p-3">
                        <input 
                          type="checkbox" 
                          checked={solvedQuestions.includes(row.ID)}
                          onChange={() => toggleSolvedQuestion(row.ID)}
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
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          Link
                        </motion.a>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {/* Pagination Controls */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center mt-6 space-x-2"
            >
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              
              {renderPagination()}
              
              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </motion.div>
          </>
        ) : (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600 py-12"
          >
            No data available
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default CompanyPage;