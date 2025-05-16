import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  isTyping: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, isTyping }) => {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isTyping) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="border-t border-violet-500/10 p-4">
      <div className="flex bg-black/20 backdrop-blur-sm rounded-xl overflow-hidden">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="اكتب سؤالك هنا..."
          disabled={isTyping}
          className="flex-1 p-4 bg-transparent outline-none text-violet-100 placeholder-violet-400/50 disabled:text-violet-400/30 text-right"
          dir="rtl"
        />
        <button
          type="submit"
          disabled={!message.trim() || isTyping}
          className="px-6 bg-violet-700 text-violet-100 disabled:bg-violet-800/50 disabled:text-violet-400/50 transition-colors"
        >
          <Send size={20} className="rotate-180" />
        </button>
      </div>
    </form>
  );
};

export default InputArea;