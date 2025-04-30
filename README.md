# MoodJourney - Travel Planner

An AI-powered travel itinerary generator based on your mood, budget, duration, and travel style.

## Setup Instructions

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   - Get your API key from [Google AI Studio](https://aistudio.google.com/)
   - Make sure you're using the Gemini 2.0 Flash model

4. Start the development server:
   ```
   npm run dev
   ```

## Features

- Personalized travel itineraries based on:
  - Mood preferences
  - Budget constraints
  - Trip duration
  - Travel style
- AI-generated recommendations using Google's Gemini 2.0 Flash model
- Simple step-by-step interface

## Technologies

- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- Google Gemini API