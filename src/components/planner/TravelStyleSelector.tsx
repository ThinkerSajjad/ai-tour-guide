import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const travelStyles = [
  { id: 'solo', name: 'Solo Travel', emoji: '🧳', description: 'You and the world' },
  { id: 'couple', name: 'Couple', emoji: '💑', description: 'Romantic getaway' },
  { id: 'family', name: 'Family', emoji: '👨‍👩‍👧‍👦', description: 'Kid-friendly options' },
  { id: 'friends', name: 'Friends', emoji: '👯‍♀️', description: 'Group adventures' },
];

interface TravelStyleSelectorProps {
  selectedTravelStyle: string;
  onChange: (travelStyle: string) => void;
}

const TravelStyleSelector: React.FC<TravelStyleSelectorProps> = ({ selectedTravelStyle, onChange }) => {
  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-tr from-slate-50 to-slate-300 bg-clip-text text-transparent">
        Who are you traveling with?
      </h2>
      <p className="text-slate-300 mb-8 text-center">
        Select your travel companion style to help us tailor the perfect experience.
      </p>

      <RadioGroup
        value={selectedTravelStyle}
        onValueChange={onChange}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
      >
        {travelStyles.map((style) => (
          <div key={style.id} className="relative">
            <RadioGroupItem
              value={style.id}
              id={style.id}
              className="peer sr-only"
            />
            <Label
              htmlFor={style.id}
              className="flex flex-col items-center p-4 border-2 border-slate-500 rounded-lg cursor-pointer peer-data-[state=checked]:border-tour-purple peer-data-[state=checked]:bg-gradient-to-b hover:bg-gradient-to-b from-slate-700 to-slate-900 transition-all"
            >
              <span className="text-3xl mb-2">{style.emoji}</span>
              <span className="font-medium text-lg text-slate-200">{style.name}</span>
              <span className="text-slate-400 text-sm text-center">{style.description}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default TravelStyleSelector;
