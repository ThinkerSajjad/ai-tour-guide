
import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-hero-pattern bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-b from-tour-darkPurple/80 to-black/70"></div>
      <div className="container mx-auto px-6 py-32 relative z-10 animate-fade-in">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-7xl font-bold mb-6">
            Discover Your Perfect <span className="gradient-text">Journey</span>
          </h1>
          <p className="text-lg md:text-2xl mb-10 text-gray-200">
            Let our AI create a personalized travel experience based on your mood and budget.
            Powered by Gemini 2.0 Flash.
          </p>
          <Button 
            asChild
            size="lg" 
            className="bg-gradient-to-tr from-primaryStart to-primaryEnd hover:bg-tour-purple/80 text-white text-lg px-8 lg:py-6 py-4 rounded-full"
          >
            <Link to="/planner" className="flex items-center">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
