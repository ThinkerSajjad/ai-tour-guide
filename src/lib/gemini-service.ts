import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI with the API key
// Use .env file to store API key (VITE_GEMINI_API_KEY)
const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);

// Gemini model configuration
const modelName = "gemini-2.5-flash";

export interface TravelPreferences {
  mood: string;
  budget: string;
  duration: string;
  travelStyle: string;
}

export async function generateTravelPlan(preferences: TravelPreferences): Promise<string> {
  try {
    if (!apiKey) {
      throw new Error("Gemini API key is missing. Please check your .env file.");
    }
    
    // Get the model
    const model = genAI.getGenerativeModel({ model: modelName });
    
    // Create the prompt for travel recommendations with markdown formatting instructions
    const prompt = `
    Generate a personalized travel plan based on the following preferences:
    - Mood: ${preferences.mood}
    - Budget: ${preferences.budget}
    - Trip Duration: ${preferences.duration}
    - Travel Style: ${preferences.travelStyle}
    
    Please include:
    1. A main destination that matches these preferences
    2. A day-by-day itinerary
    3. Accommodation suggestions
    4. Best time to visit
    5. An alternative destination option

    Format your response with proper Markdown syntax:
    - Use "# " for the main title
    - Use "## " for section headings
    - Use "### " for subsection headings
    - Use bullet points with "* " at the beginning of each point
    - Use "**bold text**" for emphasis on important elements

    Make the response visually appealing with clear sections and well-structured information.
    Include emoji icons where relevant (e.g., country flags, landmarks, etc.)
    `;
    
    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error("Error generating travel plan:", error);
    return "Sorry, there was an error generating your travel plan. Please try again later.";
  }
}

export async function chatWithTravelAssistant(previousMessages: string[], newQuestion: string, preferences: TravelPreferences): Promise<string> {
  try {
    if (!apiKey) {
      throw new Error("Gemini API key is missing. Please check your .env file.");
    }
    
    // Get the model
    const model = genAI.getGenerativeModel({ model: modelName });
    
    // Create the prompt for travel chat response
    const prompt = `
    You are a helpful travel assistant answering questions about a travel plan. 
    The user has these preferences:
    - Mood: ${preferences.mood}
    - Budget: ${preferences.budget}
    - Trip Duration: ${preferences.duration}
    - Travel Style: ${preferences.travelStyle}
    
    Previous conversation:
    ${previousMessages.join('\n')}
    
    User question: ${newQuestion}
    
    Provide a helpful, detailed response to their specific question about the trip.
    
    Format your response with proper Markdown syntax:
    - Use bullet points with "* " at the beginning of each point
    - Use "**bold text**" for emphasis on important elements
    - Keep your answer concise but informative
    - Include emoji icons where relevant
    `;
    
    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error("Error in chat response:", error);
    return "I'm sorry, I couldn't process your request. Please try again.";
  }
} 