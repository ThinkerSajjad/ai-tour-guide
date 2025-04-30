
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const featuresData = [
  {
    title: "AI-Powered Recommendations",
    description: "Our advanced AI analyzes your preferences to create the perfect travel itinerary.",
    icon: "✨",
  },
  {
    title: "Mood-Based Planning",
    description: "Whether you're feeling adventurous or relaxed, we'll match your journey to your mood.",
    icon: "🧠",
  },
  {
    title: "Budget-Friendly Options",
    description: "Find amazing experiences that fit your budget, from luxury to budget-conscious.",
    icon: "💰",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-tour-softBlue/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="gradient-text">MoodJourney</span> Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform creates personalized travel recommendations based on what matters most to you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <Card key={index} className="border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
