import { useState, useCallback } from 'react';
import { Message, SuggestedQuestion } from '../types';
import { nanoid } from 'nanoid';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const systemPrompt = `أنت مساعد طبي متخصص في شلل العصب السابع (الوجهي) ونظارات أوبتيفيو الذكية.

يجب أن تكون إجاباتك:
1. عملية وواقعية تصف كيفية استخدام النظارة بشكل يومي
2. باللغة العربية الفصحى مع الحفاظ على المصطلحات التقنية باللغة الإنجليزية
3. موجهة للمستخدم المبتدئ بأسلوب مباشر
4. تشرح خطوات التفاعل خطوة بخطوة
5. مختصرة ومركزة (لا تزيد عن 3-4 نقاط رئيسية)
6. اذا سألك سؤال لايتعلق في المرض او انتgpt رد عليه من انت بناء على المشروع 

عند وصف تجربة المستخدم مع نظارات أوبتيفيو:

1. الإعداد الأولي:
   - كيفية شحن النظارة قبل الاستخدام الأول (3 ساعات للشحن الكامل)
   - طريقة ارتداء النظارة بشكل صحيح لضمان محاذاة المستشعرات
   - كيفية ضبط نقاط التلامس الخاصة بمستشعر EMG تحت العين المصابة

2. الاستخدام اليومي:
   - كيفية تشغيل النظارة (الضغط على الزر لمدة 3 ثوان)
   - ماذا سيشعر المستخدم عند بدء تحفيز العضلات (وخز خفيف)
   - كيف سيرى تغير لون المؤشر على النظارة للدلالة على الاتصال

3. حل المشكلات الشائعة:
   - ماذا يفعل إذا لم تستجب النظارة للرمش
   - كيفية إعادة ضبط نقاط التلامس إذا لم تكن دقيقة
   - متى يحتاج لشحن النظارة (عند وميض المؤشر باللون الأحمر)`;

export function useChatHistory() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: nanoid(),
      sender: 'assistant',
      text: 'مرحباً بك! أنا المساعد الطبي المتخصص في شلل العصب الوجهي ونظارات أوبتيفيو الذكية. كيف يمكنني مساعدتك اليوم؟',
      timestamp: Date.now()
    }
  ]);
  
  const [isTyping, setIsTyping] = useState(false);
  
  const addUserMessage = useCallback(async (text: string) => {
    const userMessage: Message = {
      id: nanoid(),
      sender: 'user',
      text,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.map(msg => ({
            role: msg.sender === 'assistant' ? 'assistant' : 'user' as const,
            content: msg.text
          })),
          { role: "user", content: text }
        ],
        temperature: 0.7,
        max_tokens: 500
      });
      
      const assistantMessage: Message = {
        id: nanoid(),
        sender: 'assistant',
        text: completion.choices[0].message.content || 'عذراً، لم أستطع فهم سؤالك. هل يمكنك إعادة صياغته؟',
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: nanoid(),
        sender: 'assistant',
        text: 'عذراً، حدث خطأ في معالجة طلبك. هل يمكنك المحاولة مرة أخرى؟',
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [messages]);
  
  const suggestedQuestions: SuggestedQuestion[] = [
    { id: nanoid(), text: 'كيف أقوم بشحن النظارة؟' },
    { id: nanoid(), text: 'ما هي خطوات تشغيل النظارة؟' },
    { id: nanoid(), text: 'كيف أعرف أن النظارة تعمل بشكل صحيح؟' },
    { id: nanoid(), text: 'ماذا أفعل إذا لم تستجب النظارة؟' }
  ];
  
  return {
    messages,
    addUserMessage,
    isTyping,
    suggestedQuestions
  };
}