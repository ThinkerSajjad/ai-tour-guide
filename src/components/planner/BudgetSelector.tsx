
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const budgets = [
  { id: 'budget', name: 'Budget-Friendly', emoji: '💰', description: 'Economical options' },
  { id: 'moderate', name: 'Moderate', emoji: '💰💰', description: 'Mid-range spending' },
  { id: 'luxury', name: 'Luxury', emoji: '💰💰💰', description: 'High-end experiences' },
];

interface BudgetSelectorProps {
  selectedBudget: string;
  onChange: (budget: string) => void;
}

const BudgetSelector: React.FC<BudgetSelectorProps> = ({ selectedBudget, onChange }) => {
  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-center">What's your budget?</h2>
      <p className="text-gray-600 mb-8 text-center">Select a budget range to help us tailor recommendations to your financial comfort.</p>
      
      <RadioGroup
        value={selectedBudget}
        onValueChange={onChange}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {budgets.map((budget) => (
          <div key={budget.id} className="relative">
            <RadioGroupItem
              value={budget.id}
              id={budget.id}
              className="peer sr-only"
            />
            <Label
              htmlFor={budget.id}
              className="flex flex-col items-center p-6 border-2 rounded-lg cursor-pointer peer-data-[state=checked]:border-tour-purple peer-data-[state=checked]:bg-tour-lightPurple/10 hover:bg-gray-50 transition-all"
            >
              <span className="text-2xl mb-2">{budget.emoji}</span>
              <span className="font-medium text-lg">{budget.name}</span>
              <span className="text-gray-500 text-sm text-center">{budget.description}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default BudgetSelector;
