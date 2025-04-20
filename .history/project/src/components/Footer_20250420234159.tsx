import React from 'react';
import { Link } from 'react-router-dom';
import Container from './ui/Container';
import { Heart, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-200">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">MindfulMoment</span>
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Your companion for mental wellbeing and mindfulness.
            </p>
          </div>
          
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                Navigation
              </h3>
              <div className="mt-4 space-y-2">
                <Link to="/" className="block text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                  Home
                </Link>
                <Link to="/dashboard" className="block text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                  Dashboard
                </Link>
                <Link to="/exercises" className="block text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                  Exercises
                </Link>
                <Link to="/community" className="block text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                  Community
                </Link>
                <Link to="/resources" className="block text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                  Resources
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                Resources
              </h3>
              <div className="mt-4 space-y-2">
                <a 
                  href="https://www.nami.org/help" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  <span className="flex items-center">
                    NAMI HelpLine <ExternalLink className="ml-1" size={12} />
                  </span>
                </a>
                <a 
                  href="https://988lifeline.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  <span className="flex items-center">
                    988 Lifeline <ExternalLink className="ml-1" size={12} />
                  </span>
                </a>
                <a 
                  href="https://www.crisistextline.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  <span className="flex items-center">
                    Crisis Text Line <ExternalLink className="ml-1" size={12} />
                  </span>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                Legal
              </h3>
              <div className="mt-4 space-y-2">
                <Link to="/privacy" className="block text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="block text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
                <Link to="/disclaimer" className="block text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                  Medical Disclaimer
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} MindfulMoment. All rights reserved. Made with <Heart size={16} className="inline text-red-500" /> for mental health.
          </p>
          <p className="text-center text-gray-400 dark:text-gray-500 mt-2 text-sm">
            This app is not a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;