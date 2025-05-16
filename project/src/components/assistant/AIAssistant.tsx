import React from 'react';
import MessageList from './MessageList';
import InputArea from './InputArea';
import SuggestedQuestions from './SuggestedQuestions';
import { useChatHistory } from '../../hooks/useChatHistory';
import { Bot } from 'lucide-react';

const AIAssistant: React.FC = () => {
  const { messages, addUserMessage, isTyping, suggestedQuestions } = useChatHistory();
  
  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] overflow-hidden" dir="rtl">
      <div className="bg-gradient-to-br from-violet-950/50 to-purple-950/50 backdrop-blur-sm rounded-3xl overflow-hidden flex flex-col h-full border border-violet-500/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
        <div className="bg-gradient-to-r from-violet-800 to-purple-800 p-4">
          <div className="flex items-center">
            <div className="bg-white/10 rounded-2xl p-2 ml-3">
              <Bot className="h-6 w-6 text-violet-200" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-violet-100">المساعد الذكي</h2>
              <p className="text-xs text-violet-300">مساعدك الشخصي للإجابة عن جميع استفساراتك حول شلل العصب الوجهي ونظارات أوبتيفيو</p>
            </div>
          </div>
        </div>
        
        <MessageList messages={messages} isTyping={isTyping} />
        
        <SuggestedQuestions
          questions={suggestedQuestions}
          onSelectQuestion={addUserMessage}
        />
        
        <InputArea
          onSendMessage={addUserMessage}
          isTyping={isTyping}
        />
      </div>
    </div>
  );
};

export default AIAssistant;