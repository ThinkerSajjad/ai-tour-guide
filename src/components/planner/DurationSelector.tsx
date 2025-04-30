
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const durations = [
  { id: 'weekend', name: 'Weekend', emoji: '🏙️', description: '2-3 days' },
  { id: 'week', name: 'Week', emoji: '🏝️', description: '5-7 days' },
  { id: 'twoWeeks', name: 'Two Weeks', emoji: '✈️', description: '10-14 days' },
  { id: 'month', name: 'Month+', emoji: '🌍', description: 'Extended travel' },
];

interface DurationSelectorProps {
  selectedDuration: string;
  onChange: (duration: string) => void;
}

const DurationSelector: React.FC<DurationSelectorProps> = ({ selectedDuration, onChange }) => {
  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-center">How long will you travel?</h2>
      <p className="text-gray-600 mb-8 text-center">Select the duration of your trip to help us create the perfect itinerary.</p>
      
      <RadioGroup
        value={selectedDuration}
        onValueChange={onChange}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
      >
        {durations.map((duration) => (
          <div key={duration.id} className="relative">
            <RadioGroupItem
              value={duration.id}
              id={duration.id}
              className="peer sr-only"
            />
            <Label
              htmlFor={duration.id}
              className="flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer peer-data-[state=checked]:border-tour-purple peer-data-[state=checked]:bg-tour-lightPurple/10 hover:bg-gray-50 transition-all"
            >
              <span className="text-3xl mb-2">{duration.emoji}</span>
              <span className="font-medium text-lg">{duration.name}</span>
              <span className="text-gray-500 text-sm text-center">{duration.description}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default DurationSelector;
