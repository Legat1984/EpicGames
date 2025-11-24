import React, { useState, useRef, useEffect } from 'react';
import ChatWindow from './ChatWindow';
import ChatIconButton from './ChatIcon';

const ChatManager = ({ theme }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeChat, setActiveChat] = useState('general');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState({
    general: [
      { id: 1, user: 'Алексей', text: 'Привет! Кто-нибудь играл в "Колонизаторов" на русском?', time: '10:30', avatar: 'https://placehold.co/32x32', isOwn: false },
      { id: 2, user: 'Мария', text: 'Да, отличная игра! Особенно нравится механика торговли', time: '10:32', avatar: 'https://placehold.co/32x32', isOwn: false },
      { id: 3, user: 'Игорь', text: 'Кто-нибудь знает где можно скачать русскую версию?', time: '10:35', avatar: 'https://placehold.co/32x32', isOwn: false }
    ],
    room1: [
      { id: 1, user: 'Сергей', text: 'Кто готов к новой партии в "Домино"?', time: '11:00', avatar: 'https://placehold.co/32x32', isOwn: false },
      { id: 2, user: 'Елена', text: 'Я в игре! Когда старт?', time: '11:02', avatar: 'https://placehold.co/32x32', isOwn: false }
    ]
  });
  const [isMobile, setIsMobile] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeChat]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        user: 'Вы',
        text: message,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        avatar: 'https://placehold.co/32x32',
        isOwn: true
      };
      setMessages(prev => ({
        ...prev,
        [activeChat]: [...prev[activeChat], newMessage]
      }));
      setMessage('');
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <ChatIconButton
        isMobile={isMobile}
        onClick={toggleChat}
        theme={theme}
      />
      <ChatWindow
        isChatOpen={isChatOpen}
        toggleChat={toggleChat}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        messages={messages}
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
        isMobile={isMobile}
        theme={theme}
      />
    </>
  );
};

export default ChatManager;