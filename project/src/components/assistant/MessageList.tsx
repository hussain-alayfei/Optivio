import React from 'react';
import { Message } from '../../types';
import { Bot, User } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isTyping }) => {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);
  
  return (
    <div className="flex-1 overflow-y-auto" dir="rtl">
      <div className="space-y-4 p-4">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-start' : 'justify-end'} animate-fade-in`}
          >
            <div className={`
              max-w-[85%] rounded-2xl p-4
              ${message.sender === 'user' 
                ? 'bg-violet-700/30 text-violet-100 ml-2 border border-violet-500/20' 
                : 'bg-gradient-to-br from-violet-950/50 to-purple-950/50 backdrop-blur-sm border border-violet-500/10 text-violet-100 mr-2'}
            `}>
              <div className="flex items-center mb-2">
                {message.sender === 'assistant' ? (
                  <Bot size={12} className="ml-2 text-violet-400" />
                ) : (
                  <User size={12} className="ml-2 text-violet-400" />
                )}
                <span className={`text-[10px] ${message.sender === 'user' ? 'text-violet-300' : 'text-violet-400'}`}>
                  {message.sender === 'user' ? 'أنت' : 'المساعد الذكي'}
                </span>
                <span className="text-[10px] text-violet-500 mr-auto">
                  {new Date(message.timestamp).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              
              {message.sender === 'assistant' ? (
                <MarkdownRenderer markdown={message.text} />
              ) : (
                <p className="text-right text-xs leading-relaxed">{message.text}</p>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-end animate-fade-in">
            <div className="max-w-[85%] rounded-2xl p-4 bg-gradient-to-br from-violet-950/50 to-purple-950/50 backdrop-blur-sm border border-violet-500/10 text-violet-100 mr-2">
              <div className="flex items-center mb-2">
                <Bot size={12} className="ml-2 text-violet-400" />
                <span className="text-[10px] text-violet-400">المساعد الذكي</span>
              </div>
              <div className="flex items-center gap-1 h-6">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="w-0.5 h-4 bg-violet-400 rounded-full animate-pulse"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      height: `${Math.sin((i / 7) * Math.PI) * 16 + 8}px`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;