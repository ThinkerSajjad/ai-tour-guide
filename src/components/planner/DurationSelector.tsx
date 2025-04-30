import React from 'react';
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
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-tr from-slate-50 to-slate-300 bg-clip-text text-transparent">
        How long will you travel?
      </h2>
      <p className="text-slate-300 mb-8 text-center">
        Select the duration of your trip to help us create the perfect itinerary.
      </p>

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
              className="flex flex-col items-center p-4 border-2 border-slate-500 rounded-lg cursor-pointer peer-data-[state=checked]:border-tour-purple peer-data-[state=checked]:bg-gradient-to-b hover:bg-gradient-to-b from-slate-700 to-slate-900 transition-all"
            >
              <span className="text-3xl mb-2">{duration.emoji}</span>
              <span className="font-medium text-lg text-slate-200">{duration.name}</span>
              <span className="text-slate-400 text-sm text-center">{duration.description}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default DurationSelector;
