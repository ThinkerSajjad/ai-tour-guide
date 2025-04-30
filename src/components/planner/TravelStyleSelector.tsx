
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const travelStyles = [
  { id: 'solo', name: 'Solo Travel', emoji: '🧳', description: 'Just you and the world' },
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
      <h2 className="text-3xl font-bold mb-6 text-center">Who are you traveling with?</h2>
      <p className="text-gray-600 mb-8 text-center">Select your travel companion style to help us tailor the perfect experience.</p>
      
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
              className="flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer peer-data-[state=checked]:border-tour-purple peer-data-[state=checked]:bg-tour-lightPurple/10 hover:bg-gray-50 transition-all"
            >
              <span className="text-3xl mb-2">{style.emoji}</span>
              <span className="font-medium text-lg">{style.name}</span>
              <span className="text-gray-500 text-sm text-center">{style.description}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default TravelStyleSelector;
