import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Papa from 'papaparse';
import { motion } from 'framer-motion';

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

  const timeFrames = ['6months', '1year', '2year', 'alltime'];

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    loadCSV();
  }, [companyName, timeFrame]);

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

  const filteredData = data.filter(row => {
    const difficultyMatch = filters.difficulty === 'All' || row.Difficulty === filters.difficulty;
    const frequencyMatch = parseFloat(row.Frequency) >= filters.minFrequency;
    return difficultyMatch && frequencyMatch;
  });

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      <div className="container mx-auto px-6 py-12">
        {/* Theme Toggle */}
        {/* <div className="absolute top-6 right-6">
          <motion.button 
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full ${
              theme === 'dark' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </motion.button>
        </div> */}

        {/* Page Title */}
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 capitalize"
        >
          {companyName} Interview Questions
        </motion.h1>

        {/* Time Frame Selector */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex space-x-2 mb-6"
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
                  : `${theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`
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
          className="flex space-x-4 mb-6"
        >
          <select 
            value={filters.difficulty} 
            onChange={(e) => setFilters(prev => ({...prev, difficulty: e.target.value}))}
            className={`p-2 border rounded-lg ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
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
            onChange={(e) => setFilters(prev => ({...prev, minFrequency: parseFloat(e.target.value) || 0}))}
            className={`p-2 border rounded-lg ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
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
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={`overflow-x-auto shadow-lg rounded-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}>
              <table className="w-full">
                <thead className={`${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <tr>
                    {['ID', 'Title', 'Acceptance', 'Difficulty', 'Frequency', 'Leetcode Link'].map((header) => (
                      <th key={header} className="p-3 text-left font-semibold">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, index) => (
                    <motion.tr 
                      key={index} 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className={`border-t ${
                        theme === 'dark' 
                          ? 'hover:bg-gray-700 border-gray-700' 
                          : 'hover:bg-gray-50 border-gray-200'
                      }`}
                    >
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
                          className={`${
                            theme === 'dark' 
                              ? 'text-blue-400 hover:text-blue-300' 
                              : 'text-blue-600 hover:text-blue-700'
                          } transition-colors`}
                        >
                          Link
                        </motion.a>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
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