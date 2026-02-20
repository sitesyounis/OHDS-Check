
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Message } from '../types';
import { geminiService } from '../services/geminiService';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Welcome to the Oman Highway Construction AI Expert. I am specialized in the 2017 Standard Specifications for Road and Bridge Construction. How can I assist your engineering inquiry today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await geminiService.generateResponse(history, input);

    const modelMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] max-w-4xl mx-auto p-4 md:p-6 bg-white shadow-2xl rounded-t-3xl overflow-hidden border-x border-t border-gray-200">
      <div className="flex-1 overflow-y-auto space-y-6 pb-6 px-2 scrollbar-thin scrollbar-thumb-gray-300">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] px-5 py-4 rounded-2xl shadow-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[#2c3e50] text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200'
              }`}
            >
              <div className="text-xs mb-1 opacity-60 font-medium uppercase tracking-wide">
                {msg.role === 'user' ? 'Engineer' : 'Oman Spec AI'}
              </div>
              <div className="whitespace-pre-wrap text-[15px]">{msg.text}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-5 py-4 rounded-2xl rounded-bl-none border border-gray-200 animate-pulse">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4 relative bg-gray-50 p-4 rounded-2xl border border-gray-200">
        <div className="flex space-x-3 items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask about materials, measurement, or construction requirements..."
            className="flex-1 bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e67e22] focus:border-transparent transition-all duration-200 resize-none max-h-32 min-h-[50px]"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className={`h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-200 shadow-md ${
              isLoading || !input.trim()
                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                : 'bg-[#e67e22] hover:bg-[#d35400] text-white'
            }`}
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
        <div className="mt-2 text-[10px] text-gray-400 text-center uppercase font-medium tracking-tighter">
          Powered by Gemini 3 Flash Preview & Oman Highway Standards 2017
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
