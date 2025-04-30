
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold gradient-text">MoodJourney</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Button variant="link" asChild>
            <Link to="/" className="text-white hover:text-tour-lightPurple transition-colors">
              Home
            </Link>
          </Button>
          <Button variant="link" asChild>
            <Link to="/" className="text-white hover:text-tour-lightPurple transition-colors">
              About
            </Link>
          </Button>
          <Button variant="link" asChild>
            <Link to="/" className="text-white hover:text-tour-lightPurple transition-colors">
              Contact
            </Link>
          </Button>
        </nav>
        <div>
          <Button variant="outline" className="border-white text-white hover:bg-white/10">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
