
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-tour-darkPurple text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 gradient-text">MoodJourney</h3>
            <p className="text-gray-300 mb-4">
              Personalized AI-powered travel recommendations based on your mood and budget.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-tour-lightPurple transition-colors">Home</Link></li>
              <li><Link to="/planner" className="text-gray-300 hover:text-tour-lightPurple transition-colors">Plan a Trip</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-tour-lightPurple transition-colors">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-tour-lightPurple transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-tour-lightPurple transition-colors">Terms of Service</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-tour-lightPurple transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-tour-lightPurple transition-colors">Twitter</a></li>
              <li><a href="#" className="text-gray-300 hover:text-tour-lightPurple transition-colors">Instagram</a></li>
              <li><a href="#" className="text-gray-300 hover:text-tour-lightPurple transition-colors">Facebook</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} MoodJourney. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
