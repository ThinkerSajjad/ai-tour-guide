import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { generateTravelPlan, chatWithTravelAssistant, TravelPreferences } from '@/lib/gemini-service';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, Send, StopCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface ResultsProps {
  preferences: {
    mood: string;
    budget: string;
    duration: string;
    travelStyle: string;
  };
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isTyping?: boolean;
  fullContent?: string;
}

const Results: React.FC<ResultsProps> = ({ preferences }) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [generatedText, setGeneratedText] = useState('');
  const [currentTextLength, setCurrentTextLength] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [fullText, setFullText] = useState<string>('');
  const [userQuestion, setUserQuestion] = useState('');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isChatting, setIsChatting] = useState(false);
  const [isRespondingToChat, setIsRespondingToChat] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Ref to store the generation timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  // Ref to store the chat typing timer
  const chatTypingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate the travel plan using Gemini API
  useEffect(() => {
    const fetchTravelPlan = async () => {
      try {
        setIsGenerating(true);
        setError(null);
        
        // Call the actual Gemini API
        const travelPlanText = await generateTravelPlan(preferences as TravelPreferences);
        setFullText(travelPlanText);
        
      } catch (err) {
        console.error('Error fetching travel plan:', err);
        setError('Failed to generate travel plan. Please try again.');
        setIsGenerating(false);
      }
    };

    fetchTravelPlan();
  }, [preferences]);

  // Simulate the text typing effect for initial plan generation
  useEffect(() => {
    if (isGenerating && fullText && currentTextLength < fullText.length) {
      // Clear any existing timer before setting a new one
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      
      timerRef.current = setTimeout(() => {
        setGeneratedText(fullText.substring(0, currentTextLength + 3));
        setCurrentTextLength(prev => prev + 3);
      }, 10);
      
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    } else if (fullText && currentTextLength >= fullText.length) {
      setIsGenerating(false);
      // Initialize chat when generation is complete
      if (chatMessages.length === 0) {
        setChatMessages([{
          role: 'assistant',
          content: fullText
        }]);
      }
    }
  }, [isGenerating, currentTextLength, fullText, chatMessages.length]);

  // Simulate typing effect for chat messages
  useEffect(() => {
    // Find any message that is currently typing
    const typingMessage = chatMessages.find(msg => msg.isTyping);
    
    if (typingMessage && typingMessage.fullContent) {
      const currentLength = typingMessage.content.length;
      const targetLength = typingMessage.fullContent.length;
      
      if (currentLength < targetLength) {
        // Clear any existing timer
        if (chatTypingTimerRef.current) {
          clearTimeout(chatTypingTimerRef.current);
        }
        
        chatTypingTimerRef.current = setTimeout(() => {
          setChatMessages(prevMessages => 
            prevMessages.map(msg => 
              msg.isTyping 
                ? {
                    ...msg,
                    content: msg.fullContent!.substring(0, currentLength + 3),
                    isTyping: currentLength + 3 < targetLength
                  }
                : msg
            )
          );
        }, 10);
        
        return () => {
          if (chatTypingTimerRef.current) {
            clearTimeout(chatTypingTimerRef.current);
          }
        };
      } else {
        // Typing is complete
        setChatMessages(prevMessages => 
          prevMessages.map(msg => 
            msg.isTyping 
              ? {
                  ...msg,
                  isTyping: false
                }
              : msg
          )
        );
        setIsRespondingToChat(false);
      }
    }
  }, [chatMessages]);

  // Function to regenerate the travel plan
  const handleRegenerate = async () => {
    setCurrentTextLength(0);
    setGeneratedText('');
    setIsGenerating(true);
    setChatMessages([]);
    setIsChatting(false);
    
    try {
      // Call the actual Gemini API
      const travelPlanText = await generateTravelPlan(preferences as TravelPreferences);
      setFullText(travelPlanText);
    } catch (err) {
      console.error('Error regenerating travel plan:', err);
      setError('Failed to regenerate travel plan. Please try again.');
      setIsGenerating(false);
    }
  };

  // Function to stop generation
  const handleStopGeneration = () => {
    // Clear the timer if it exists
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    setIsGenerating(false);
    
    // Initialize chat with the partially generated text
    if (chatMessages.length === 0 && generatedText) {
      setChatMessages([{
        role: 'assistant',
        content: generatedText
      }]);
    }
  };

  // Function to stop chat typing
  const handleStopChatTyping = () => {
    // Clear the chat typing timer if it exists
    if (chatTypingTimerRef.current) {
      clearTimeout(chatTypingTimerRef.current);
      chatTypingTimerRef.current = null;
    }
    
    // Complete any typing message immediately
    setChatMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.isTyping && msg.fullContent 
          ? {
              ...msg,
              content: msg.fullContent,
              isTyping: false
            }
          : msg
      )
    );
    
    setIsRespondingToChat(false);
  };

  // Function to handle user chat input
  const handleChatSubmit = async () => {
    if (!userQuestion.trim()) return;
    
    // Add user message to chat
    const newUserMessage: Message = {
      role: 'user',
      content: userQuestion
    };
    
    setChatMessages(prev => [...prev, newUserMessage]);
    setUserQuestion('');
    setIsRespondingToChat(true);
    
    try {
      // Extract previous messages for context
      const previousMessages = chatMessages.map(msg => 
        `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
      );
      
      // Call the chatWithTravelAssistant function
      const response = await chatWithTravelAssistant(
        previousMessages, 
        newUserMessage.content, 
        preferences as TravelPreferences
      );
      
      // Add assistant message with typing effect
      const newAssistantMessage: Message = {
        role: 'assistant',
        content: '',
        isTyping: true,
        fullContent: response
      };
      
      setChatMessages(prev => [...prev, newAssistantMessage]);
    } catch (err) {
      console.error('Error in chat response:', err);
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm sorry, I couldn't process your request. Please try again."
      }]);
      setIsRespondingToChat(false);
    }
  };

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  // Format the text with Markdown-like formatting
  const formatTextDisplay = (text: string) => {
    // If we're in chat mode, use the chat messages
    if (isChatting && chatMessages.length > 0) {
      return (
        <div className="chat-container space-y-4 bg-gradient-to-bl from-slate-700 to-slate-900">
          {chatMessages.map((message, index) => (
            <div 
              key={index} 
              className={`message ${message.role === 'user' ? 'bg-gradient-to-bl from-slate-700 to-slate-900 ml-12 text-slate-200' : 'bg-gradient-to-bl from-slate-600 to-slate-800 mr-12 text-slate-300'} p-4 rounded-lg`}
            >
              <div className="font-semibold mb-1 flex items-center">
                {message.role === 'user' ? '👨‍⚕️ You' : '💭 Touri'}
                {message.isTyping && (
                  <div className="animate-pulse h-2 w-2 rounded-full bg-tour-purple ml-2"></div>
                )}
              </div>
              <div className="whitespace-pre-wrap">
                {message.content.split('\n\n').map((paragraph, pIndex) => {
                  // Check if paragraph starts with heading markers
                  if (paragraph.startsWith('# ')) {
                    return <h1 key={pIndex} className="text-2xl text-slate-300 font-bold my-4">{paragraph.substring(2)}</h1>;
                  } else if (paragraph.startsWith('## ')) {
                    return <h2 key={pIndex} className="text-xl font-bold my-3">{paragraph.substring(3)}</h2>;
                  } else if (paragraph.startsWith('### ')) {
                    return <h3 key={pIndex} className="text-lg font-bold my-2">{paragraph.substring(4)}</h3>;
                  } else if (paragraph.startsWith('* ')) {
                    // Convert bullet points
                    return (
                      <ul key={pIndex} className="list-disc list-inside my-2">
                        {paragraph.split('\n* ').map((item, iIndex) => (
                          <li key={iIndex} dangerouslySetInnerHTML={{
                            __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          }} />
                        ))}
                      </ul>
                    );
                  } else {
                    // Regular paragraph with bold text support
                    return (
                      <p key={pIndex} className="my-2" dangerouslySetInnerHTML={{
                        __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      }} />
                    );
                  }
                })}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      );
    }
    
    // Otherwise use the generated text with formatting
    return (
      <div className="prose max-w-none">
        {text.split('\n\n').map((paragraph, index) => {
          // Check if paragraph starts with heading markers
          if (paragraph.startsWith('# ')) {
            return <h1 key={index} className="text-2xl text-slate-50 font-bold my-4">{paragraph.substring(2)}</h1>;
          } else if (paragraph.startsWith('## ')) {
            return <h2 key={index} className="text-xl font-bold text-slate-200 my-3">{paragraph.substring(3)}</h2>;
          } else if (paragraph.startsWith('### ')) {
            return <h3 key={index} className="text-lg font-bold my-2 text-slate-300">{paragraph.substring(4)}</h3>;
          } else if (paragraph.startsWith('* ')) {
            // Convert bullet points
            return (
              <ul key={index} className="list-disc list-inside my-2 text-slate-300">
                {paragraph.split('\n* ').map((item, itemIndex) => (
                  <li key={itemIndex} dangerouslySetInnerHTML={{
                    __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  }} />
                ))}
              </ul>
            );
          } else {
            // Regular paragraph with bold text support
            return (
              <p key={index} className="my-2 text-slate-300" dangerouslySetInnerHTML={{
                __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              }} />
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="lg:text-3xl text-2xl font-bold mb-2 text-slate-200">Your Personalized Journey</h2>
        <p className="text-slate-300">
          Based on your preferences, our AI has crafted the perfect travel experience for you.
        </p>
      </div>

      <div className="bg-gradient-to-bl from-slate-700 to-slate-900 min-h-[60vh] rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-5 md:p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-tour-purple to-tour-brightBlue"></div>
        
        {isGenerating && (
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="animate-pulse h-3 w-3 rounded-full bg-tour-purple mr-2"></div>
              <p className="text-sm text-slate-300">Gemini 2.0 Flash is generating your personalized travel plan...</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleStopGeneration}
              className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <StopCircle className="h-4 w-4 mr-1" /> Stop Generation
            </Button>
          </div>
        )}
        
        {isRespondingToChat && chatMessages.some(msg => msg.isTyping) && (
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="animate-pulse h-3 w-3 rounded-full bg-tour-purple mr-2"></div>
              <p className="text-sm text-slate-300">Gemini 2.0 Flash is generating a response...</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleStopChatTyping}
              className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <StopCircle className="h-4 w-4 mr-1" /> Stop Generation
            </Button>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}
        
        <div className="prose max-w-none whitespace-pre-wrap">
          {formatTextDisplay(isGenerating ? generatedText : (isChatting ? '' : fullText))}
        </div>
        
        {!isGenerating && (
          <>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              {!isChatting ? (
                <>
                  <Button 
                    onClick={() => setIsChatting(true)}
                    className="bg-tour-purple hover:bg-tour-purple/80"
                  >
                    Ask Questions About This Plan
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleRegenerate}
                  >
                    Regenerate Options
                  </Button>
                </>
              ) : (
                <Button 
                  variant="outline" 
                  onClick={() => setIsChatting(false)}
                  className="mb-4"
                >
                  Back to Travel Plan
                </Button>
              )}
            </div>
            
            {isChatting && (
              <div className="mt-4 ">
                <Separator className="my-4" />
                <div className="p-4 bg-gradient-to-bl from-slate-700 to-slate-900 rounded-lg">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Ask about specific details, recommendations, or adjustments to your plan..."
                      value={userQuestion}
                      onChange={(e) => setUserQuestion(e.target.value)}
                      className="min-h-[80px] flex-1 bg-gradient-to-bl from-slate-700 to-slate-900 text-slate-200"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.shiftKey === false && !isRespondingToChat) {
                          e.preventDefault();
                          handleChatSubmit();
                        }
                      }}
                    />
                    <Button 
                      onClick={handleChatSubmit}
                      className="bg-tour-purple hover:bg-tour-purple/80 self-end"
                      disabled={!userQuestion.trim() || isRespondingToChat}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-slate-300 mt-2">
                    Press Shift+Enter for a new line. Press Enter to send.
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Results;
