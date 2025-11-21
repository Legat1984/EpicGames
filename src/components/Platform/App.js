import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import styled, { ThemeProvider, createGlobalStyle, css } from 'styled-components';
import { MessageCircle, X, Send, Users, Gamepad2, User, Menu, Globe, Star, Heart, Share2, Download, Home, Book, Settings, LogOut } from 'lucide-react';

// Theme Context
const ThemeContext = createContext();

// Default Dark Theme
const darkTheme = {
  background: '#1a1a1a',
  surface: '#2d2d2d',
  card: '#3d3d3d',
  text: '#ffffff',
  textSecondary: '#b3b3b3',
  primary: '#4f46e5',
  secondary: '#7c3aed',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  border: '#404040',
  chat: {
    background: '#3d3d3d',
    message: '#4d4d4d',
    user: '#5d5d5d',
    text: '#ffffff',
    textSecondary: '#b3b3b3'
  }
};

// Light Theme
const lightTheme = {
  background: '#f5f5f5',
  surface: '#ffffff',
  card: '#ffffff',
  text: '#1a1a1a',
  textSecondary: '#666666',
  primary: '#4f46e5',
  secondary: '#7c3aed',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  border: '#e5e5e5',
  chat: {
    background: '#ffffff',
    message: '#f5f5f5',
    user: '#e5e5e5',
    text: '#1a1a1a',
    textSecondary: '#666666'
  }
};

// Global Styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  body {
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
  }
  
  input, select, textarea {
    background: ${props => props.theme.surface};
    color: ${props => props.theme.text};
    border: 1px solid ${props => props.theme.border};
    border-radius: 8px;
    padding: 8px 12px;
  }
`;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background-color: ${props => props.theme.surface};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-bottom: 1px solid ${props => props.theme.border};
  position: relative;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const TopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${props => props.theme.text};
  }
`;

const Navigation = styled.nav`
  display: flex;
  gap: 2rem;
  
  a {
    color: ${props => props.theme.textSecondary};
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
    
    &:hover {
      color: ${props => props.theme.primary};
    }
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconButton = styled.button`
  color: ${props => props.theme.textSecondary};
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${props => props.theme.text};
    background-color: ${props => props.theme.card};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  color: ${props => props.theme.textSecondary};
  padding: 0.5rem;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const FavoritesBar = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.5rem 0;
  scrollbar-width: thin;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.surface};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primary};
    border-radius: 2px;
  }
`;

const FavoriteGame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  min-width: 60px;
  cursor: pointer;
  
  img {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    object-fit: cover;
  }
  
  span {
    font-size: 0.75rem;
    text-align: center;
    color: ${props => props.theme.textSecondary};
  }
`;

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  flex: 1;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: ${props => props.theme.text};
`;

const SectionSubtitle = styled.p`
  font-size: 1.25rem;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 2rem;
  max-width: 2xl;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
`;

const Button = styled.button`
  background-color: ${props => props.primary ? props.theme.primary : props.theme.surface};
  color: ${props => props.primary ? '#fff' : props.theme.text};
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  border: 1px solid ${props => props.primary ? props.theme.primary : props.theme.border};
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const GameCard = styled.div`
  background-color: ${props => props.theme.card};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
  }
`;

const GameImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const GameContent = styled.div`
  padding: 1.25rem;
`;

const GameTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text};
`;

const GameOriginalTitle = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 0.75rem;
`;

const GameDescription = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const GameMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.75rem;
  color: ${props => props.theme.textSecondary};
`;

const GameActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActionButton = styled.button`
  padding: 0.5rem;
  border-radius: 6px;
  color: ${props => props.theme.textSecondary};
  transition: all 0.2s ease;
  
  &:hover {
    color: ${props => props.theme.text};
    background-color: ${props => props.theme.surface};
  }
`;

const FeaturesSection = styled.section`
  background-color: ${props => props.theme.surface};
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 3rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: 1.5rem;
`;

const FeatureIcon = styled.div`
  background-color: ${props => props.theme.primary + '20'};
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
`;

const FeatureTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text};
`;

const FeatureDescription = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.textSecondary};
  line-height: 1.5;
`;

const ChatIcon = styled.button`
  position: fixed;
  bottom: ${props => props.isMobile ? '1rem' : '1rem'};
  ${props => props.isMobile ? 'right: 1rem;' : 'left: 1rem;'}
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
  ${props => props.isMobile ? 'bottom: 0; right: 0; left: 0; height: 50%;' : 'bottom: 1rem; left: 1rem; width: 320px; height: 400px;'}
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
    { icon: Book, label: 'Каталог', href: '#' },
    { icon: MessageCircle, label: 'Чат', href: '#' },
    { icon: Settings, label: 'Настройки', href: '#' },
    { icon: LogOut, label: 'Выйти', href: '#' }
  ];

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, setTheme: setCurrentTheme }}>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyle />
        <Container>
          <Header>
            <HeaderContent>
              <TopHeader>
                <Logo>
                  <Gamepad2 color={currentTheme.primary} size={32} />
                  <h1>Настольные Игры Онлайн</h1>
                </Logo>
                <Navigation>
                  <a href="#">Главная</a>
                  <a href="#">Каталог</a>
                  <a href="#">Чат</a>
                  <a href="#">О нас</a>
                </Navigation>
                <HeaderActions>
                  <IconButton onClick={toggleTheme}>
                    <Globe size={20} />
                  </IconButton>
                  <IconButton>
                    <User size={20} />
                  </IconButton>
                  <MobileMenuButton onClick={() => setShowMobileMenu(true)}>
                    <Menu size={20} />
                  </MobileMenuButton>
                </HeaderActions>
              </TopHeader>
              <FavoritesBar>
                {favorites.map(game => (
                  <FavoriteGame key={game.id}>
                    <img src={game.image} alt={game.title} />
                    <span>{game.title}</span>
                  </FavoriteGame>
                ))}
              </FavoritesBar>
            </HeaderContent>
          </Header>

          <Main>
            <HeroSection>
              <SectionTitle>Переведенные Настольные Игры</SectionTitle>
              <SectionSubtitle>
                Собирайтесь с друзьями, играйте в любимые настольные игры в удобном онлайн-формате
              </SectionSubtitle>
              <ButtonGroup>
                <Button primary>Начать Играть</Button>
                <Button>Просмотреть Каталог</Button>
              </ButtonGroup>
            </HeroSection>

            <GamesGrid>
              {games.map(game => (
                <GameCard key={game.id}>
                  <GameImage src={game.image} alt={game.title} />
                  <GameContent>
                    <GameTitle>{game.title}</GameTitle>
                    <GameOriginalTitle>{game.originalTitle}</GameOriginalTitle>
                    <GameDescription>{game.description}</GameDescription>
                    <GameMeta>
                      <span>Игроки: {game.players}</span>
                      <span>Время: {game.time}</span>
                      <span>{game.category}</span>
                    </GameMeta>
                    <GameActions>
                      <span style={{ fontSize: '0.875rem', color: currentTheme.textSecondary }}>
                        {game.downloads} скачиваний
                      </span>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <ActionButton>
                          <Download size={16} />
                        </ActionButton>
                        <ActionButton>
                          <Heart size={16} fill={game.favorite ? currentTheme.primary : 'none'} color={game.favorite ? currentTheme.primary : currentTheme.textSecondary} />
                        </ActionButton>
                        <ActionButton>
                          <Share2 size={16} />
                        </ActionButton>
                      </div>
                    </GameActions>
                  </GameContent>
                </GameCard>
              ))}
            </GamesGrid>
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
