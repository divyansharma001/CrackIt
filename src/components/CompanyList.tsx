import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const companies = [
  { name: 'Accolite', slug: 'accolite' },
  { name: 'Adobe', slug: 'adobe' },
  { name: 'Aetion', slug: 'aetion' },
  { name: 'Affinity', slug: 'affinity' },
  { name: 'Affirm', slug: 'affirm' },
  { name: 'Airbnb', slug: 'airbnb' },
  { name: 'Airtel', slug: 'airtel' },
  { name: 'Akamai', slug: 'akamai' },
  { name: 'Akuna Capital', slug: 'akuna-capital' },
  { name: 'Alation', slug: 'alation' },
  { name: 'Alibaba', slug: 'alibaba' },
  { name: 'Amazon', slug: 'amazon' },
  { name: 'American Express', slug: 'american-express' },
  { name: 'AppDynamics', slug: 'appdynamics' },
  { name: 'Apple', slug: 'apple' },
  { name: 'Arista Networks', slug: 'arista-networks' },
  { name: 'Arista', slug: 'arista' },
  { name: 'Asana', slug: 'asana' },
  { name: 'Atlassian', slug: 'atlassian' },
  { name: 'Audible', slug: 'audible' },
  { name: 'Baidu', slug: 'baidu' },
  { name: 'Barclays', slug: 'barclays' },
  { name: 'Blackrock', slug: 'blackrock' },
  { name: 'Blizzard', slug: 'blizzard' },
  { name: 'Bloomberg', slug: 'bloomberg' },
  { name: 'Bloomreach', slug: 'bloomreach' },
  { name: 'Booking', slug: 'booking' },
  { name: 'Bookingcom', slug: 'bookingcom' },
  { name: 'Box', slug: 'box' },
  { name: 'Bytedance', slug: 'bytedance' },
  { name: 'Bytedancetoutiao', slug: 'bytedancetoutiao' },
  { name: 'C3 Iot', slug: 'c3-iot' },
  { name: 'C3ai', slug: 'c3ai' },
  { name: 'Capital One', slug: 'capital-one' },
  { name: 'Cisco', slug: 'cisco' },
  { name: 'Citadel', slug: 'citadel' },
  { name: 'Citrix', slug: 'citrix' },
  { name: 'Cloudera', slug: 'cloudera' },
  { name: 'Clutter', slug: 'clutter' },
  { name: 'Codenation', slug: 'codenation' },
  { name: 'Cohesity', slug: 'cohesity' },
  { name: 'Coupang', slug: 'coupang' },
  { name: 'Coursera', slug: 'coursera' },
  { name: 'Cruise Automation', slug: 'cruise-automation' },
  { name: 'Databricks', slug: 'databricks' },
  { name: 'Dataminr', slug: 'dataminr' },
  { name: 'De Shaw', slug: 'de-shaw' },
  { name: 'Deliveryhero', slug: 'deliveryhero' },
  { name: 'Dell', slug: 'dell' },
  { name: 'Deutsche Bank', slug: 'deutsche-bank' },
  { name: 'Didi', slug: 'didi' },
  { name: 'Docusign', slug: 'docusign' },
  { name: 'Doordash', slug: 'doordash' },
  { name: 'Drawbridge', slug: 'drawbridge' },
  { name: 'Dropbox', slug: 'dropbox' },
  { name: 'Druva', slug: 'druva' },
  { name: 'Ebay', slug: 'ebay' },
  { name: 'Electronic Arts', slug: 'electronic-arts' },
  { name: 'Emc', slug: 'emc' },
  { name: 'Epic Systems', slug: 'epic-systems' },
  { name: 'Evernote', slug: 'evernote' },
  { name: 'Expedia', slug: 'expedia' },
  { name: 'F5 Networks', slug: 'f5-networks' },
  { name: 'Facebook', slug: 'facebook' },
  { name: 'Factset', slug: 'factset' },
  { name: 'Fallible', slug: 'fallible' },
  { name: 'Fidessa', slug: 'fidessa' },
  { name: 'Flexport', slug: 'flexport' },
  { name: 'Flipkart', slug: 'flipkart' },
  { name: 'Forusall', slug: 'forusall' },
  { name: 'Garena', slug: 'garena' },
  { name: 'Ge Digital', slug: 'ge-digital' },
  { name: 'Gilt Groupe', slug: 'gilt-groupe' },
  { name: 'Godaddy', slug: 'godaddy' },
  { name: 'Goldman Sachs', slug: 'goldman-sachs' },
  { name: 'Google', slug: 'google' },
  { name: 'Grab', slug: 'grab' },
  { name: 'Groupon', slug: 'groupon' },
  { name: 'Gsn Games', slug: 'gsn-games' },
  { name: 'Hbo', slug: 'hbo' },
  { name: 'Helix', slug: 'helix' },
  { name: 'Honey', slug: 'honey' },
  { name: 'Hotstar', slug: 'hotstar' },
  { name: 'Houzz', slug: 'houzz' },
  { name: 'Hrt', slug: 'hrt' },
  { name: 'Huawei', slug: 'huawei' },
  { name: 'Hulu', slug: 'hulu' },
  { name: 'Ibm', slug: 'ibm' },
  { name: 'Iit Bombay', slug: 'iit-bombay' },
  { name: 'Indeed', slug: 'indeed' },
  { name: 'Infosys', slug: 'infosys' },
  { name: 'Inmobi', slug: 'inmobi' },
  { name: 'Intel', slug: 'intel' },
  { name: 'Intuit', slug: 'intuit' },
  { name: 'Ixl', slug: 'ixl' },
  { name: 'Jane Street', slug: 'jane-street' },
  { name: 'Jingchi', slug: 'jingchi' },
  { name: 'Jp Morgan Chase', slug: 'jp-morgan-chase' },
  { name: 'Jpmorgan', slug: 'jpmorgan' },
  { name: 'Jump Trading', slug: 'jump-trading' },
  { name: 'Kakao', slug: 'kakao' },
  { name: 'Karat', slug: 'karat' },
  { name: 'Leap Motion', slug: 'leap-motion' },
  { name: 'Limebike', slug: 'limebike' },
  { name: 'Linkedin', slug: 'linkedin' },
  { name: 'Liveramp', slug: 'liveramp' },
  { name: 'Lyft', slug: 'lyft' },
  { name: 'Machine Zone', slug: 'machine-zone' },
  { name: 'Machinezone', slug: 'machinezone' },
  { name: 'Maq Software', slug: 'maq-software' },
  { name: 'Mathworks', slug: 'mathworks' },
  { name: 'Mckinsey', slug: 'mckinsey' },
  { name: 'Medianet', slug: 'medianet' },
  { name: 'Meituan', slug: 'meituan' },
  { name: 'Microsoft', slug: 'microsoft' },
  { name: 'Microstrategy', slug: 'microstrategy' },
  { name: 'Morgan Stanley', slug: 'morgan-stanley' },
  { name: 'National Instruments', slug: 'national-instruments' },
  { name: 'Netease', slug: 'netease' },
  { name: 'Netflix', slug: 'netflix' },
  { name: 'Netsuite', slug: 'netsuite' },
  { name: 'Nutanix', slug: 'nutanix' },
  { name: 'Nvidia', slug: 'nvidia' },
  { name: 'Opendoor', slug: 'opendoor' },{ name: 'Oracle', slug: 'oracle' },
  { name: 'Palantir Technologies', slug: 'palantir-technologies' },
  { name: 'Palantir', slug: 'palantir' },
  { name: 'Paypal', slug: 'paypal' },
  { name: 'Paytm', slug: 'paytm' },
  { name: 'Phonepe', slug: 'phonepe' },
  { name: 'Pinterest', slug: 'pinterest' },
  { name: 'Pocket Gems', slug: 'pocket-gems' },
  { name: 'Point72', slug: 'point72' },
  { name: 'Ponyai', slug: 'ponyai' },
  { name: 'Poshmark', slug: 'poshmark' },
  { name: 'Postmates', slug: 'postmates' },
  { name: 'Poynt', slug: 'poynt' },
  { name: 'Pramp', slug: 'pramp' },
  { name: 'Pure Storage', slug: 'pure-storage' },
  { name: 'Qualcomm', slug: 'qualcomm' },
  { name: 'Qualtrics', slug: 'qualtrics' },
  { name: 'Quantcast', slug: 'quantcast' },
  { name: 'Quip', slug: 'quip' },
  { name: 'Quora', slug: 'quora' },
  { name: 'Rackspace', slug: 'rackspace' },
  { name: 'Radius', slug: 'radius' },
  { name: 'Reddit', slug: 'reddit' },
  { name: 'Redfin', slug: 'redfin' },
  { name: 'Riot Games', slug: 'riot-games' },
  { name: 'Robinhood', slug: 'robinhood' },
  { name: 'Roblox', slug: 'roblox' },
  { name: 'Rubrik', slug: 'rubrik' },
  { name: 'Salesforce', slug: 'salesforce' },
  { name: 'Samsung', slug: 'samsung' },
  { name: 'Sap', slug: 'sap' },
  { name: 'Sapient', slug: 'sapient' },
  { name: 'Servicenow', slug: 'servicenow' },
  { name: 'Snapchat', slug: 'snapchat' },
  { name: 'Snapdeal', slug: 'snapdeal' },
  { name: 'Splunk', slug: 'splunk' },
  { name: 'Spotify', slug: 'spotify' },
  { name: 'Square', slug: 'square' },
  { name: 'Sumologic', slug: 'sumologic' },
  { name: 'Symantec', slug: 'symantec' },
  { name: 'Tableau', slug: 'tableau' },
  { name: 'Tandemg', slug: 'tandemg' },
  { name: 'Tencent', slug: 'tencent' },
  { name: 'Tesla', slug: 'tesla' },
  { name: 'Thumbtack', slug: 'thumbtack' },
  { name: 'Traveloka', slug: 'traveloka' },
  { name: 'Tripadvisor', slug: 'tripadvisor' },
  { name: 'Triplebyte', slug: 'triplebyte' },
  { name: 'Turvo', slug: 'turvo' },
  { name: 'Twilio', slug: 'twilio' },
  { name: 'Twitch', slug: 'twitch' },
  { name: 'Twitter', slug: 'twitter' },
  { name: 'Two Sigma', slug: 'two-sigma' },
  { name: 'Uber', slug: 'uber' },
  { name: 'Uipath', slug: 'uipath' },
  { name: 'United Health Group', slug: 'united-health-group' },
  { name: 'Valve', slug: 'valve' },
  { name: 'Virtu', slug: 'virtu' },
  { name: 'Visa', slug: 'visa' },
  { name: 'Vmware', slug: 'vmware' },
  { name: 'Walmart', slug: 'walmart' },
  { name: 'Wayfair', slug: 'wayfair' },
  { name: 'Wish', slug: 'wish' },
  { name: 'Works Applications', slug: 'works-applications' },
  { name: 'Yahoo', slug: 'yahoo' },
  { name: 'Yandex', slug: 'yandex' },
  { name: 'Yatra', slug: 'yatra' },
  { name: 'Yelp', slug: 'yelp' },
  { name: 'Zalando', slug: 'zalando' },
  { name: 'Zappos', slug: 'zappos' },
  { name: 'Zenefits', slug: 'zenefits' },
  { name: 'Zillow', slug: 'zillow' },
  { name: 'Zoho', slug: 'zoho' },
  { name: 'Zscaler', slug: 'zscaler' },
  { name: 'Zulily', slug: 'zulily' }
].sort((a, b) => a.name.localeCompare(b.name));

// These will be our featured companies
const featuredCompanies = [
  'Google', 'Facebook', 'Amazon', 'Microsoft', 'Apple', 'Netflix', 'Uber', 'LinkedIn', 'Twitter'
].map(name => ({ name, slug: name.toLowerCase().replace(/\s+/g, '-') }));

export function CompanyList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewAll, setViewAll] = useState(false);

  const filteredCompanies = viewAll
    ? companies.filter(company => 
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : featuredCompanies.filter(company => 
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            <Link
              to={`/company/${company.slug}`}
              key={company.slug}
              className="block"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.05 * (index % 10) }}
                whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700 cursor-pointer"
              >
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold mx-auto mb-2">
                    {company.name.charAt(0)}
                  </div>
                  <h3 className="font-medium truncate">{company.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {Math.floor(Math.random() * 200) + 20} questions
                  </p>
                </div>
              </motion.div>
            </Link>
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