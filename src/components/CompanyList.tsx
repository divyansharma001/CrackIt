
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const companies = [
  'Accolite', 'Adobe', 'Aetion', 'Affinity', 'Affirm', 'Airbnb', 'Airtel', 'Akamai', 
  'Akuna Capital', 'Alation', 'Alibaba', 'Amazon', 'American Express', 'AppDynamics', 
  'Apple', 'Arista Networks', 'Arista', 'Asana', 'Atlassian', 'Audible', 'Baidu', 
  'Barclays', 'Blackrock', 'Blizzard', 'Bloomberg', 'Bloomreach', 'Booking', 
  'Bookingcom', 'Box', 'Bytedance', 'Bytedancetoutiao', 'C3 Iot', 'C3ai', 'Capital One', 
  'Cisco', 'Citadel', 'Citrix', 'Cloudera', 'Clutter', 'Codenation', 'Cohesity', 
  'Coupang', 'Coursera', 'Cruise Automation', 'Databricks', 'Dataminr', 'De Shaw', 
  'Deliveryhero', 'Dell', 'Deutsche Bank', 'Didi', 'Docusign', 'Doordash', 'Drawbridge', 
  'Dropbox', 'Druva', 'Ebay', 'Electronic Arts', 'Emc', 'Epic Systems', 'Evernote', 
  'Expedia', 'F5 Networks', 'Facebook', 'Factset', 'Fallible', 'Fidessa', 'Flexport', 
  'Flipkart', 'Forusall', 'Garena', 'Ge Digital', 'Gilt Groupe', 'Godaddy', 
  'Goldman Sachs', 'Google', 'Grab', 'Groupon', 'Gsn Games', 'Hbo', 'Helix', 'Honey', 
  'Hotstar', 'Houzz', 'Hrt', 'Huawei', 'Hulu', 'Ibm', 'Iit Bombay', 'Indeed', 'Infosys', 
  'Inmobi', 'Intel', 'Intuit', 'Ixl', 'Jane Street', 'Jingchi', 'Jp Morgan Chase', 
  'Jpmorgan', 'Jump Trading', 'Kakao', 'Karat', 'Leap Motion', 'Limebike', 'Linkedin', 
  'Liveramp', 'Lyft', 'Machine Zone', 'Machinezone', 'Maq Software', 'Mathworks', 
  'Mckinsey', 'Medianet', 'Meituan', 'Microsoft', 'Microstrategy', 'Morgan Stanley', 
  'National Instruments', 'Netease', 'Netflix', 'Netsuite', 'Nutanix', 'Nvidia', 
  'Opendoor', 'Oracle', 'Palantir Technologies', 'Palantir', 'Paypal', 'Paytm', 
  'Phonepe', 'Pinterest', 'Pocket Gems', 'Point72', 'Ponyai', 'Poshmark', 'Postmates', 
  'Poynt', 'Pramp', 'Pure Storage', 'Qualcomm', 'Qualtrics', 'Quantcast', 'Quip', 
  'Quora', 'Rackspace', 'Radius', 'Reddit', 'Redfin', 'Riot Games', 'Robinhood', 
  'Roblox', 'Rubrik', 'Salesforce', 'Samsung', 'Sap', 'Sapient', 'Servicenow', 
  'Snapchat', 'Snapdeal', 'Splunk', 'Spotify', 'Square', 'Sumologic', 'Symantec', 
  'Tableau', 'Tandemg', 'Tencent', 'Tesla', 'Thumbtack', 'Traveloka', 'Tripadvisor', 
  'Triplebyte', 'Turvo', 'Twilio', 'Twitch', 'Twitter', 'Two Sigma', 'Uber', 'Uipath', 
  'United Health Group', 'Valve', 'Virtu', 'Visa', 'Vmware', 'Walmart', 'Wayfair', 
  'Wish', 'Works Applications', 'Yahoo', 'Yandex', 'Yatra', 'Yelp', 'Zalando', 
  'Zappos', 'Zenefits', 'Zillow', 'Zoho', 'Zscaler', 'Zulily'
];

// These will be our featured companies
const featuredCompanies = [
  'Google', 'Facebook', 'Amazon', 'Microsoft', 'Apple', 'Netflix', 'Uber', 'LinkedIn', 'Twitter'
];

export function CompanyList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewAll, setViewAll] = useState(false);

  const filteredCompanies = viewAll
    ? companies.filter(company => 
        company.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : featuredCompanies.filter(company => 
        company.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <section 
      id="companies" 
      className="py-20 bg-gray-50 dark:bg-gray-900/30"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full mb-4">
            200+ Companies
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Find questions from top tech companies
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Access a comprehensive database of interview questions from the world's leading technology companies.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-6 text-base"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {filteredCompanies.map((company, index) => (
            <motion.div
              key={company}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.05 * (index % 10) }}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700 cursor-pointer"
            >
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold mx-auto mb-2">
                  {company.charAt(0)}
                </div>
                <h3 className="font-medium truncate">{company}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {Math.floor(Math.random() * 200) + 20} questions
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Button 
            onClick={() => setViewAll(!viewAll)} 
            variant="outline"
            className="px-8"
          >
            {viewAll ? "Show less" : "View all companies"}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
