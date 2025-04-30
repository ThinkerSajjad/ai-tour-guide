import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const budgets = [
  { id: 'budget', name: 'Budget-Friendly', emoji: '🙂', description: 'Economical options' },
  { id: 'moderate', name: 'Moderate', emoji: '😎', description: 'Mid-range spending' },
  { id: 'luxury', name: 'Luxury', emoji: '🤑', description: 'High-end experiences' },
];

interface BudgetSelectorProps {
  selectedBudget: string;
  onChange: (budget: string) => void;
}

const BudgetSelector: React.FC<BudgetSelectorProps> = ({ selectedBudget, onChange }) => {
  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-tr from-slate-50 to-slate-300 bg-clip-text text-transparent">
        What's your budget?
      </h2>
      <p className="text-slate-300 mb-8 text-center">
        Select a budget range to help us tailor recommendations to your financial comfort.
      </p>

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
              className="flex flex-col items-center p-6 border-2 border-slate-500 rounded-lg cursor-pointer peer-data-[state=checked]:border-tour-purple peer-data-[state=checked]:bg-gradient-to-b hover:bg-gradient-to-b from-slate-700 to-slate-900 transition-all"
            >
              <span className="text-2xl mb-2">{budget.emoji}</span>
              <span className="font-medium text-lg text-slate-200">{budget.name}</span>
              <span className="text-slate-400 text-sm text-center">{budget.description}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default BudgetSelector;
