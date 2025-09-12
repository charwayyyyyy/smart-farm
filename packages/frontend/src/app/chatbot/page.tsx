'use client';

import { useState, useRef, useEffect } from 'react';
import Layout from '@/components/Layout';
import { FaPaperPlane, FaRobot, FaUser, FaSpinner, FaLeaf } from 'react-icons/fa';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  sources?: Array<{ title: string; id: string }>;
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: '1',
        text: 'Hello! I am your SmartFarmGH assistant. How can I help with your farming questions today?',
        sender: 'bot',
      },
    ]);
  }, []);

  // This function would be used in production with a real backend
  // Currently using handleDemoSubmit for the demo version
  /*
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // In a real implementation, this would call the backend API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chatbot/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      // Add bot response
      const botMessage: Message = {
        id: Date.now().toString(),
        text: data.message || 'Sorry, I could not process your request at this time.',
        sender: 'bot',
        sources: data.sources || [],
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: 'Sorry, there was an error processing your request. Please try again later.',
        sender: 'bot',
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };
  */

  // For demo purposes, simulate API response
  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      // Generate a contextual response based on common farming questions
      let botResponse = '';
      const userInput = input.toLowerCase();

      if (userInput.includes('tomato') && (userInput.includes('disease') || userInput.includes('pest'))) {
        botResponse = 'Tomatoes in Ghana commonly face early blight, late blight, and attacks from whiteflies. For organic control, try neem oil spray or a mixture of baking soda, vegetable oil, and mild soap. Ensure good air circulation between plants and avoid overhead watering to reduce disease spread.';
      } else if (userInput.includes('fertilizer') || userInput.includes('nutrient')) {
        botResponse = 'For Ghanaian soil conditions, a balanced NPK fertilizer (15-15-15) works well for most crops. Apply organic compost before planting and supplement with NPK during the growing season. For leafy vegetables, nitrogen-rich fertilizers are recommended, while fruiting plants benefit from phosphorus and potassium.';
      } else if (userInput.includes('rain') || userInput.includes('season') || userInput.includes('weather')) {
        botResponse = 'Ghana has two main growing seasons in the south: the major season (March-July) and the minor season (September-November). In the north, there is one main growing season from May to September. Plan your planting according to these rainfall patterns for optimal yields.';
      } else {
        botResponse = 'Thank you for your question. To provide the most accurate advice for your farming situation in Ghana, could you please provide more details about your specific crop, your region, and the particular challenge you are facing?';
      }

      // Add bot response
      const botMessage: Message = {
        id: Date.now().toString(),
        text: botResponse,
        sender: 'bot',
        sources: userInput.includes('tomato') ? [
          { id: '101', title: 'Tomato Disease Management in Ghana' },
          { id: '102', title: 'Organic Pest Control for Vegetables' }
        ] : [],
      };

      setMessages((prev) => [...prev, botMessage]);
      setLoading(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-2xl font-bold text-primary mb-6 flex items-center">
          <FaRobot className="mr-2 text-accent" />
          <span>SmartFarmGH AI Assistant</span>
        </h1>
        
        <div className="bg-white rounded-lg shadow-md border border-gray-200 h-[60vh] flex flex-col transition-all duration-300 hover:shadow-lg">
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div
                  className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${message.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'} animate-fadeIn shadow-sm transition-all duration-300 hover:shadow-md`}
                >
                  <div className="flex items-start">
                    {message.sender === 'bot' && <FaLeaf className="mr-2 mt-1 text-accent flex-shrink-0" />}
                    <p>{message.text}</p>
                    {message.sender === 'user' && <FaUser className="ml-2 mt-1 text-white flex-shrink-0" />}
                  </div>
                </div>
                {message.sources && message.sources.length > 0 && (
                  <div className="mt-2 text-left text-xs text-gray-500">
                    <p className="font-semibold">Sources:</p>
                    <ul className="list-disc pl-4">
                      {message.sources.map((source) => (
                        <li key={source.id}>{source.title}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleDemoSubmit} className="flex">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about farming in Ghana..."
                  className="w-full border border-gray-300 rounded-l-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                className="btn-primary rounded-r-lg px-4 py-2 disabled:opacity-50 transition-all duration-300 hover:shadow-md flex items-center justify-center min-w-[80px]"
                disabled={loading}
              >
                {loading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <>
                    <span className="mr-1">Send</span>
                    <FaPaperPlane className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
            <div className="mt-2 text-xs text-gray-500">
              <p>Try asking about tomato diseases, fertilizer recommendations, or planting seasons in Ghana.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}