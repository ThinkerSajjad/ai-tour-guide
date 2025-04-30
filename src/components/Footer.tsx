
import React from 'react';
import { FaFacebook, FaFacebookF, FaGithub, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-700 to-slate-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center w-full flex-col gap-8">
          <div>
            <h3 className="lg:text-4xl text-3xl font-bold mb-4 gradient-text text-center">Touri</h3>
            <p className="gradient-text mb-4 text-center max-w-lg">
              Personalized AI-powered travel recommendations based on your mood and budget. Chat with our AI tour guide!
            </p>
          </div>
          
          
          <div>
            <h4 className="text-lg font-semibold mb-3 text-center text-slate-300">Connect me</h4>
            <ul className="flex items-center justify-center gap-4">
              <li><a href="https://github.com/ThinkerSajjad" target='_blank' className="text-gray-300 hover:text-tour-lightPurple transition-colors"><FaGithub className='h-6 w-6'/></a></li>
              <li><a href="https://www.instagram.com/muhammad_sajjad900" target='_blank' className="text-gray-300 hover:text-tour-lightPurple transition-colors"><FaInstagram className='h-6 w-6'/></a></li>
              <li><a href="https://www.facebook.com/sajjad7287" target='_blank' className="text-gray-300 hover:text-tour-lightPurple transition-colors"><FaFacebook className='h-6 w-6'/></a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-12 pt-8 text-center lg:text-base text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Touri. Developed by Muhammad Sajjad.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
