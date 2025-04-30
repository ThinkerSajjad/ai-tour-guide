
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import MoodSelector from '@/components/planner/MoodSelector';
import BudgetSelector from '@/components/planner/BudgetSelector';
import DurationSelector from '@/components/planner/DurationSelector';
import TravelStyleSelector from '@/components/planner/TravelStyleSelector';
import Results from '@/components/planner/Results';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  'mood',
  'budget',
  'duration',
  'travelStyle',
  'results'
];

const Planner = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState({
    mood: 'adventurous',
    budget: 'moderate',
    duration: 'week',
    travelStyle: 'couple',
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleUpdatePreference = (key: keyof typeof preferences, value: string) => {
    setPreferences({
      ...preferences,
      [key]: value,
    });
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-bl from-slate-700 to-slate-900">
      <header className="bg-gradient-to-b from-slate-700 to-slate-900 shadow-sm lg:py-4 py-3">
        <div className="container mx-auto lg:px-6 px-4 flex justify-between items-center">
          <Link to="/" className="lg:text-4xl text-3xl font-bold gradient-text">
            Touri
          </Link>
          <div className="text-sm text-slate-200">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>
        <div className="container mx-auto max-w-md px-6 mt-4">
          <Progress value={progressPercentage} className="h-1 bg-slate-600" />
        </div>
      </header>

      <main className="container mx-auto lg:px-6 px-3 lg:py-16 py-8">
        <div className="step-transition">
          {currentStep === 0 && (
            <MoodSelector 
              selectedMood={preferences.mood}
              onChange={(value) => handleUpdatePreference('mood', value)}
            />
          )}
          
          {currentStep === 1 && (
            <BudgetSelector 
              selectedBudget={preferences.budget}
              onChange={(value) => handleUpdatePreference('budget', value)}
            />
          )}
          
          {currentStep === 2 && (
            <DurationSelector 
              selectedDuration={preferences.duration}
              onChange={(value) => handleUpdatePreference('duration', value)}
            />
          )}
          
          {currentStep === 3 && (
            <TravelStyleSelector 
              selectedTravelStyle={preferences.travelStyle}
              onChange={(value) => handleUpdatePreference('travelStyle', value)}
            />
          )}
          
          {currentStep === 4 && (
            <Results preferences={preferences} />
          )}
        </div>
        
        <div className="flex justify-between mt-16 max-w-3xl mx-auto">
          {currentStep > 0 ? (
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          ) : (
            <Button
              variant="outline"
              asChild
              className="flex items-center"
            >
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" /> Home
              </Link>
            </Button>
          )}
          
          {currentStep < steps.length - 1 ? (
            <Button
              onClick={handleNext}
              className="bg-tour-purple hover:bg-tour-purple/80 flex items-center"
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="outline"
              asChild
              className="flex items-center"
            >
              <Link to="/">
                Create New Plan <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default Planner;
