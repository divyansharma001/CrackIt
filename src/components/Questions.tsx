import React, { useState, useEffect } from "react";
import Papa from "papaparse";

const CSVViewer = () => {
  const [company, setCompany] = useState("adobe_1year"); // Default company
  const [data, setData] = useState([]);

  useEffect(() => {
    loadCSV(company);
  }, [company]);

  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  };

  const loadCSV = async (companyName) => {
    try {
      const response = await fetch(`/csv/${companyName}.csv`);
      if (!response.ok) throw new Error(`Failed to fetch CSV: ${response.status}`);
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => setData(result.data),
        error: (error) => console.error("CSV Parsing Error:", error),
      });
    } catch (error) {
      console.error("Error loading CSV:", error);
    }
  };

  return (
    <div>
      <select onChange={handleCompanyChange} value={company}>
        <option value="adobe_1year">Adobe (1 Year)</option>
        <option value="companyA">Company A</option>
        <option value="companyB">Company B</option>
        <option value="companyC">Company C</option>
      </select>

      {data.length > 0 ? (
        <table border={1}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Acceptance</th>
              <th>Difficulty</th>
              <th>Frequency</th>
              <th>Leetcode Link</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.ID}</td>
                <td>{row.Title}</td>
                <td>{row.Acceptance}</td>
                <td>{row.Difficulty}</td>
                <td>{parseFloat(row.Frequency).toFixed(4)}</td> {/* Format Frequency */}
                <td>
                  <a href={row["Leetcode Question Link"]?.trim()} target="_blank" rel="noopener noreferrer">
                    Link
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading or no data available.</p>
      )}
    </div>
  );
};

export default CSVViewer;
