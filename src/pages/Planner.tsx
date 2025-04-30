
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold gradient-text">
            MoodJourney
          </Link>
          <div className="text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>
        <div className="container mx-auto px-6 mt-4">
          <Progress value={progressPercentage} className="h-2 bg-gray-200" />
        </div>
      </header>

      <main className="container mx-auto px-6 py-16">
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
