import React from 'react';
import { SuggestedQuestion } from '../../types';

interface SuggestedQuestionsProps {
  questions: SuggestedQuestion[];
  onSelectQuestion: (text: string) => void;
}

const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ 
  questions, 
  onSelectQuestion 
}) => {
  return (
    <div className="py-4 px-6 border-t border-violet-500/10" dir="rtl">
      <h3 className="text-sm text-violet-400 mb-3">أسئلة مقترحة:</h3>
      <div className="flex flex-wrap gap-2">
        {questions.map((question) => (
          <button
            key={question.id}
            onClick={() => onSelectQuestion(question.text)}
            className="text-sm bg-violet-700/20 hover:bg-violet-700/30 text-violet-200 py-2 px-4 rounded-xl border border-violet-500/20 transition-colors"
          >
            {question.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;