import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { MessageCircle, X, Send, Users, Gamepad2, Home, Book, Settings, LogOut } from 'lucide-react';

import { ThemeProvider } from 'styled-components';
import { ThemeContext, darkTheme, lightTheme } from './contexts/ThemeContext';
import GlobalStyle from './styles/GlobalStyle';

import Header from './components/layout/Header';
import Main from './components/layout/Main';
import HeroSection from './components/main/HeroSection';
import GamesGrid from './components/main/GamesGrid';

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  display: flex;
  flex-direction: column;
`;

const ChatIcon = styled.button`
  position: fixed;
  bottom: ${props => props.isMobile ? '1rem' : '1rem'};
  ${props => props.isMobile ? 'right: 1rem;' : 'right: 1rem;'}
  background-color: ${props => props.theme.primary};
  color: white;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  z-index: 1000;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ChatWindow = styled.div`
  position: fixed;
  ${props => props.isMobile ? 'bottom: 0; right: 0; left: 0; height: 100%;' : 'bottom: 1rem; right: 1rem; width: 420px; height: 600px;'}
  background-color: ${props => props.theme.chat.background};
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  z-index: 1000;
  display: ${props => props.isOpen ? 'flex' : 'none'};
  flex-direction: column;
  border: 1px solid ${props => props.theme.border};
`;

const ChatHeader = styled.div`
  background-color: ${props => props.theme.primary};
  color: white;
  padding: 1rem;
  border-radius: 12px 12px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatTabs = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.border};
`;

const ChatTab = styled.button`
  flex: 1;
  padding: 0.75rem;
  text-align: center;
  background: ${props => props.active ? props.theme.surface : 'transparent'};
  color: ${props => props.active ? props.theme.text : props.theme.textSecondary};
  border-bottom: ${props => props.active ? `2px solid ${props.theme.primary}` : 'none'};
  font-weight: 500;
  
  &:hover {
    color: ${props => props.theme.text};
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Message = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  
  ${props => props.isOwn && css`
    flex-direction: row-reverse;
  `}
`;

const MessageAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const MessageContent = styled.div`
  background-color: ${props => props.isOwn ? props.theme.primary : props.theme.chat.message};
  color: ${props => props.isOwn ? 'white' : props.theme.chat.text};
  padding: 0.75rem;
  border-radius: 12px;
  max-width: 80%;
  
  ${props => props.isOwn && css`
    border-bottom-right-radius: 4px;
  `}
  
  ${props => !props.isOwn && css`
    border-bottom-left-radius: 4px;
  `}
`;

const MessageInfo = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: ${props => props.theme.chat.textSecondary};
`;

const ChatInput = styled.div`
  padding: 1rem;
  border-top: 1px solid ${props => props.theme.border};
  display: flex;
  gap: 0.5rem;
`;

const ChatInputField = styled.input`
  flex: 1;
  background-color: ${props => props.theme.surface};
  color: ${props => props.theme.text};
  border: 1px solid ${props => props.theme.border};
  border-radius: 20px;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
`;

const ChatSendButton = styled.button`
  background-color: ${props => props.theme.primary};
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme.background};
  z-index: 2000;
  display: ${props => props.isOpen ? 'flex' : 'none'};
  flex-direction: column;
`;

const MobileMenuHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MobileMenuNav = styled.nav`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  a {
    color: ${props => props.theme.text};
    text-decoration: none;
    padding: 1rem;
    border-radius: 8px;
    background-color: ${props => props.theme.surface};
    display: flex;
    align-items: center;
    gap: 0.75rem;
    
    &:hover {
      background-color: ${props => props.theme.card};
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 1500;
  display: ${props => props.show ? 'block' : 'none'};
`;

// App Component
const App = () => {
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
  const [games, setGames] = useState([
    {
      id: 1,
      title: 'Колонизаторы',
      originalTitle: 'Settlers of Catan',
      category: 'Стратегия',
      players: '3-4',
      time: '60-90 мин',
      rating: 4.8,
      downloads: 1250,
      image: 'https://placehold.co/300x200',
      description: 'Классическая стратегическая настольная игра о поселенцах на острове Катан',
      favorite: true
    },
    {
      id: 2,
      title: 'Домино',
      originalTitle: 'Dominoes',
      category: 'Фамильная',
      players: '2-4',
      time: '30-45 мин',
      rating: 4.5,
      downloads: 890,
      image: 'https://placehold.co/300x200',
      description: 'Традиционная игра с костяшками, идеально подходит для всей семьи',
      favorite: true
    },
    {
      id: 3,
      title: 'Монополия',
      originalTitle: 'Monopoly',
      category: 'Экономика',
      players: '2-8',
      time: '90-180 мин',
      rating: 4.7,
      downloads: 2100,
      image: 'https://placehold.co/300x200',
      description: 'Классическая экономическая игра о покупке и продаже недвижимости',
      favorite: false
    },
    {
      id: 4,
      title: 'Шахматы',
      originalTitle: 'Chess',
      category: 'Логика',
      players: '2',
      time: '30-120 мин',
      rating: 4.9,
      downloads: 3500,
      image: 'https://placehold.co/300x200',
      description: 'Известная логическая игра для двух игроков, проверяющая стратегическое мышление',
      favorite: true
    }
  ]);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(darkTheme);
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

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === darkTheme ? lightTheme : darkTheme);
  };

  const favorites = games.filter(game => game.favorite);

  const menuItems = [
    { icon: Home, label: 'Главная', href: '#' },
    { icon: Book, label: 'Игры', href: '#' },
    { icon: Book, label: 'Магазин', href: '#' },
    { icon: Settings, label: 'Настройки', href: '#' },
    { icon: LogOut, label: 'Выйти', href: '#' }
  ];

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, setTheme: setCurrentTheme }}>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyle />
        <Container>
          <Header
            theme={currentTheme}
            toggleTheme={toggleTheme}
            setShowMobileMenu={setShowMobileMenu}
            favorites={favorites}
          />

          <Main>
            <HeroSection theme={currentTheme} />
            <GamesGrid games={games} theme={currentTheme} />
          </Main>

          <ChatIcon
            isMobile={isMobile}
            onClick={toggleChat}
            theme={currentTheme}
          >
            <MessageCircle size={24} />
          </ChatIcon>

          <ChatWindow
            isMobile={isMobile}
            isOpen={isChatOpen}
            theme={currentTheme}
          >
            <ChatHeader>
              <h3>Чат</h3>
              <button onClick={toggleChat}>
                <X size={20} />
              </button>
            </ChatHeader>

            <ChatTabs>
              <ChatTab
                active={activeChat === 'general'}
                onClick={() => setActiveChat('general')}
                theme={currentTheme}
              >
                <Users size={16} /> Общий
              </ChatTab>
              <ChatTab
                active={activeChat === 'room1'}
                onClick={() => setActiveChat('room1')}
                theme={currentTheme}
              >
                <Gamepad2 size={16} /> Комната 1
              </ChatTab>
            </ChatTabs>

            <ChatMessages>
              {messages[activeChat]?.map(msg => (
                <Message key={msg.id} isOwn={msg.isOwn}>
                  <MessageAvatar src={msg.avatar} alt={msg.user} />
                  <MessageContent isOwn={msg.isOwn}>
                    <div>{msg.text}</div>
                    <MessageInfo>
                      <span>{msg.user}</span>
                      <span>{msg.time}</span>
                    </MessageInfo>
                  </MessageContent>
                </Message>
              ))}
              <div ref={chatEndRef} />
            </ChatMessages>

            <ChatInput>
              <ChatInputField
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Введите сообщение..."
                theme={currentTheme}
              />
              <ChatSendButton onClick={sendMessage} theme={currentTheme}>
                <Send size={18} />
              </ChatSendButton>
            </ChatInput>
          </ChatWindow>

          <MobileMenu isOpen={showMobileMenu} theme={currentTheme}>
            <MobileMenuHeader>
              <h3>Меню</h3>
              <button onClick={() => setShowMobileMenu(false)}>
                <X size={24} />
              </button>
            </MobileMenuHeader>
            <MobileMenuNav>
              {menuItems.map((item, index) => (
                <a key={index} href={item.href}>
                  <item.icon size={20} />
                  {item.label}
                </a>
              ))}
            </MobileMenuNav>
          </MobileMenu>

          <Overlay show={showMobileMenu} onClick={() => setShowMobileMenu(false)} />
        </Container>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
