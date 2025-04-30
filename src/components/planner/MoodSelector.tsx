
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const moods = [
  { id: 'adventurous', name: 'Adventurous', emoji: '🧗‍♂️', description: 'Seeking thrills and excitement' },
  { id: 'relaxed', name: 'Relaxed', emoji: '🏖️', description: 'Looking for peace and calm' },
  { id: 'romantic', name: 'Romantic', emoji: '💑', description: 'A special getaway for two' },
  { id: 'cultural', name: 'Cultural', emoji: '🏛️', description: 'Rich in history and art' },
  { id: 'foodie', name: 'Foodie', emoji: '🍽️', description: 'Culinary experiences' },
  { id: 'party', name: 'Party', emoji: '🎉', description: 'Nightlife and entertainment' },
];

interface MoodSelectorProps {
  selectedMood: string;
  onChange: (mood: string) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onChange }) => {
  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-center">How are you feeling?</h2>
      <p className="text-gray-600 mb-8 text-center">Select the mood that best describes what you're looking for in your journey.</p>
      
      <RadioGroup
        value={selectedMood}
        onValueChange={onChange}
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
      >
        {moods.map((mood) => (
          <div key={mood.id} className="relative">
            <RadioGroupItem
              value={mood.id}
              id={mood.id}
              className="peer sr-only"
            />
            <Label
              htmlFor={mood.id}
              className="flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer peer-data-[state=checked]:border-tour-purple peer-data-[state=checked]:bg-tour-lightPurple/10 hover:bg-gray-50 transition-all"
            >
              <span className="text-4xl mb-2">{mood.emoji}</span>
              <span className="font-medium text-lg">{mood.name}</span>
              <span className="text-gray-500 text-sm text-center">{mood.description}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default MoodSelector;
