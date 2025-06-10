
import React, { useState, useEffect, useRef } from 'react';
import Icon from './Icon';
import Button from './Button';
import { AI_ASSISTANT_NAME, CONNIE_QUOTES } from '../../constants';
import { useAuth } from '../../contexts/AuthContext';
import Avatar from './Avatar';

interface ConniePopoverProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement | null>;
  glassmorphic?: boolean;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'connie';
  avatar?: string;
}

const ConniePopover: React.FC<ConniePopoverProps> = ({ isOpen, onClose, anchorRef, glassmorphic = true }) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const { currentUser } = useAuth();
  const popoverRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Consider using a dedicated, friendly robot avatar for Connie
  const connieAvatar = 'https://picsum.photos/seed/ConnieRobotFriendly/100/100'; 

  useEffect(() => {
    if (isOpen) {
      setMessages([{ 
        id: `connie-intro-${Date.now()}`, 
        text: `¡Hola, ${currentUser?.name || 'tú'}! Soy ${AI_ASSISTANT_NAME}. ¿En qué puedo ayudarte hoy? 😊`, 
        sender: 'connie',
        avatar: connieAvatar
      }]);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setMessages([]); 
      setInputValue('');
    }
  }, [isOpen, currentUser?.name]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node) &&
          anchorRef.current && !anchorRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, anchorRef]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: 'user',
      avatar: currentUser?.avatar
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate Connie's thinking and response
    const currentInput = inputValue; // Capture current input value for the timeout
    setInputValue(''); // Clear input immediately

    setTimeout(() => {
      const connieResponseText = `"${currentInput}"... Interesante. ${CONNIE_QUOTES[Math.floor(Math.random() * CONNIE_QUOTES.length)]}`;
      const connieMessage: Message = {
        id: `connie-${Date.now()}`,
        text: connieResponseText,
        sender: 'connie',
        avatar: connieAvatar
      };
      setMessages(prev => [...prev, connieMessage]);
    }, 1000 + Math.random() * 1000);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    inputRef.current?.focus();
    // Optionally, auto-send suggestion on click:
    // setMessages(prev => [...prev, { id: `user-sugg-${Date.now()}`, text: suggestion, sender: 'user', avatar: currentUser?.avatar }]);
    // setTimeout(() => { /* ... Connie's response ... */ }, 500);
  };

  const suggestions = [
    "Generar un meme divertido",
    "¿Qué tiempo hace?",
    "Contar un chiste",
    "Ayuda con la plataforma"
  ];

  if (!isOpen) return null;
  
  const getPopoverStyle = (): React.CSSProperties => {
    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      return {
        position: 'fixed',
        bottom: `${window.innerHeight - rect.top}px`, 
        left: `${rect.left}px`, 
        zIndex: 1050,
        animationName: 'popoverOpenAnim',
        animationDuration: '0.2s'
      };
    }
    return { 
        position: 'fixed', 
        bottom: 'calc(1.5rem + 3.5rem + 0.5rem)', 
        left: '1.5rem', 
        zIndex: 1050,
        animationName: 'popoverOpenAnim',
        animationDuration: '0.2s'
    };
  };


  return (
    <div 
      ref={popoverRef}
      role="dialog" 
      aria-labelledby="connie-popover-title"
      className={`${glassmorphic ? 'bg-white/20 dark:bg-neutral-bgDark/30 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-glass' : 'bg-card-light dark:bg-card-dark'} rounded-lg w-full max-w-sm sm:max-w-md max-h-[70vh] flex flex-col motion-safe:transform motion-safe:transition-all`}
      style={getPopoverStyle()}
    >
      <header className={`flex items-center justify-between p-4 border-b ${glassmorphic ? 'border-white/20 dark:border-white/10' : 'border-neutral-borderLight dark:border-neutral-borderDark'}`}>
        <div className="flex items-center">
          <Icon name="robot" className="w-6 h-6 mr-2 text-primary-DEFAULT" glassmorphic={glassmorphic} />
          <h2 id="connie-popover-title" className="text-xl font-semibold text-neutral-textDark dark:text-neutral-textLight">{AI_ASSISTANT_NAME}</h2>
        </div>
        <button 
          onClick={onClose} 
          className={`w-8 h-8 rounded-full text-neutral-textDark dark:text-neutral-textLight ${glassmorphic ? 'bg-white/10 dark:bg-neutral-textLight/10 hover:bg-white/25 dark:hover:bg-neutral-textLight/15' : 'bg-neutral-textDark/5 dark:bg-neutral-textLight/5 hover:bg-neutral-textDark/10 dark:hover:bg-neutral-textLight/10'} focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT flex items-center justify-center p-0`}
          aria-label={`Cerrar popover de ${AI_ASSISTANT_NAME}`}
        >
          <Icon name="close" className="w-5 h-5" glassmorphic={glassmorphic} />
        </button>
      </header>

      <main className="p-4 flex-grow overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-neutral-borderLight dark:scrollbar-thumb-neutral-borderDark scrollbar-track-transparent">
        {messages.map(msg => (
          <div key={msg.id} className={`flex items-end space-x-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'connie' && <Avatar src={msg.avatar} alt={AI_ASSISTANT_NAME} size="sm" className="self-start flex-shrink-0"/>}
            <div className={`max-w-[75%] p-2.5 rounded-lg ${msg.sender === 'user' ? `${glassmorphic ? 'bg-primary-DEFAULT/80 backdrop-blur-sm border border-white/20 shadow-glass-sm' : 'bg-primary-DEFAULT shadow-sm'} text-white rounded-br-none` : `${glassmorphic ? 'bg-white/20 dark:bg-neutral-bgDark/40 backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-glass-sm' : 'bg-neutral-bgLight dark:bg-neutral-bgDark/50 border border-neutral-borderLight dark:border-neutral-borderDark shadow-sm'} text-neutral-textDark dark:text-neutral-textLight rounded-bl-none`}`}>
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            </div>
            {msg.sender === 'user' && <Avatar src={msg.avatar} alt={currentUser?.name || "Usuario"} size="sm" className="self-start flex-shrink-0"/>}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>
      
      <div className={`p-4 border-t ${glassmorphic ? 'border-white/20 dark:border-white/10' : 'border-neutral-borderLight dark:border-neutral-borderDark'}`}>
          <div className="flex flex-wrap gap-1.5 mb-2">
              {suggestions.map(s => (
                  <Button key={s} variant="secondary" size="sm" onClick={() => handleSuggestionClick(s)} className="text-xs !px-2 !py-1">
                      {s}
                  </Button>
              ))}
          </div>
          <div className="flex items-center space-x-2">
          <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Escribe tu mensaje..."
              className={`flex-grow p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT text-neutral-textDark dark:text-neutral-textLight ${glassmorphic ? 'glass-input border-white/20 dark:border-white/10 bg-white/10 dark:bg-neutral-bgDark/20 backdrop-blur-sm' : 'border border-neutral-borderLight dark:border-neutral-borderDark bg-neutral-bgLight dark:bg-neutral-bgDark'}`}
          />
          <Button onClick={handleSendMessage} disabled={!inputValue.trim()} className="px-5">
              Enviar
          </Button>
          </div>
      </div>
      <style>{`
        @keyframes popoverOpenAnim {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .scrollbar-thin { scrollbar-width: thin; }
        .scrollbar-thumb-neutral-borderLight::-webkit-scrollbar-thumb { background-color: var(--color-neutral-borderLight); border-radius: 4px; }
        .dark .scrollbar-thumb-neutral-borderDark::-webkit-scrollbar-thumb { background-color: var(--color-neutral-borderDark); border-radius: 4px; }
        .scrollbar-track-transparent::-webkit-scrollbar-track { background-color: transparent; }
      `}</style>
    </div>
  );
};

export default ConniePopover;