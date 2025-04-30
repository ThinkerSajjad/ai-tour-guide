
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="lg:text-4xl text-3xl font-bold gradient-text">Touri</span>
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
          <Button size='sm' className="bg-gradient-to-r from-primaryStart to-primaryEnd hover:bg-transparent text-white py-1 px-4"
          >
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
