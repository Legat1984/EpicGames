import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Home, Book, Settings, LogOut } from 'lucide-react';
import { UserContext } from '../../contexts/UserContext';

import { ThemeProvider } from 'styled-components';
import { ThemeContext, darkTheme, lightTheme } from './contexts/ThemeContext';
import { GamesProvider } from './contexts/GamesContext';
import GlobalStyle from '../../style/GlobalStyle';
import ErrorBoundary from '../../components/ErrorBoundary';

import Header from './components/layout/Header';
import Main from './components/layout/Main';
import HeroSection from './components/main/HeroSection';
import GamesManager from './components/games/GamesManager';
import ChatManager from './components/chat/ChatManager';
import MobileMenu from './components/layout/MobileMenu';

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  display: flex;
  flex-direction: column;
`;

// Temporary components for different sections
const NewsSection = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
`;

const RecommendedSection = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
`;

const ShopSection = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
`;

const DonationsSection = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
`;

const SubscriptionsSection = styled.div`
  padding: 1rem;
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
`;

const SettingsSection = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
`;

// App Component
const App = () => {
  const { user, logout } = useContext(UserContext);

  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [currentTheme, setCurrentTheme] = useState({ ...darkTheme, mode: 'dark' });
  const [activeTab, setActiveTab] = useState('home'); // Default to 'home'

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);



  const toggleTheme = () => {
    if (currentTheme.mode === 'dark') {
      setCurrentTheme({ ...lightTheme, mode: 'light' });
    } else {
      setCurrentTheme({ ...darkTheme, mode: 'dark' });
    }
  };



  // Function to render content based on active tab
  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return (
          <>
            <NewsSection theme={currentTheme}>
              <h2>Новости</h2>
              <p>Здесь будут отображаться последние новости платформы.</p>
            </NewsSection>
            <RecommendedSection theme={currentTheme}>
              <h2>Рекомендуем</h2>
              <p>Здесь будут рекомендуемые игры и контент.</p>
            </RecommendedSection>
          </>
        );
      case 'favorites':
        return (
          <FavoritesManager theme={currentTheme} />
        );
      case 'games':
        return (
          <>
            <HeroSection theme={currentTheme} />
            <GamesManager theme={currentTheme} />
          </>
        );
      case 'shop':
        return (
          <>
            <ShopSection theme={currentTheme}>
              <h2>Магазин</h2>
              <DonationsSection theme={currentTheme}>
                <h3>Донат</h3>
                <p>Пожертвования для поддержки платформы и разработки новых функций.</p>
              </DonationsSection>
              <SubscriptionsSection theme={currentTheme}>
                <h3>Подписки</h3>
                <p>Ежемесячные и годовые подписки с премиум-функциями.</p>
              </SubscriptionsSection>
            </ShopSection>
          </>
        );
      case 'settings':
        return (
          <SettingsSection theme={currentTheme}>
            <h2>Настройки пользователя</h2>
            <p>Имя пользователя: {user?.name || user?.username || 'Не указано'}</p>
            <p>Email: {user?.email || 'Не указано'}</p>
            <p>Роль: {user?.role || 'Пользователь'}</p>
          </SettingsSection>
        );
      default:
        return (
          <>
            <HeroSection theme={currentTheme} />
            <GamesManager theme={currentTheme} />
          </>
        );
    }
  };

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
        <GamesProvider>
          <GlobalStyle />
          <ErrorBoundary>
            <Container>
              <Header
                theme={currentTheme}
                toggleTheme={toggleTheme}
                setShowMobileMenu={setShowMobileMenu}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onSettingsClick={() => setActiveTab('settings')}
                onLogout={logout}
              />

              <Main>
                {renderContent()}
              </Main>

              <ChatManager theme={currentTheme} />

              <MobileMenu
                showMobileMenu={showMobileMenu}
                setShowMobileMenu={setShowMobileMenu}
                theme={currentTheme}
                menuItems={menuItems}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onLogout={logout}
              />
            </Container>
          </ErrorBoundary>
        </GamesProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
