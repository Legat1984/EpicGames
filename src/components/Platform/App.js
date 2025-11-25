import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Home, Book, Settings, LogOut } from 'lucide-react';

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
import HomePage from './components/main/HomePage';
import ShopPage from './components/main/ShopPage';

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  display: flex;
  flex-direction: column;
`;

// App Component
const App = () => {

  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [currentTheme, setCurrentTheme] = useState({ ...darkTheme, mode: 'dark' });
  const [activeSection, setActiveSection] = useState('home'); // По умолчанию отображаем главную

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavigate = (section) => {
    setActiveSection(section);
  };



  const toggleTheme = () => {
    if (currentTheme.mode === 'dark') {
      setCurrentTheme({ ...lightTheme, mode: 'light' });
    } else {
      setCurrentTheme({ ...darkTheme, mode: 'dark' });
    }
  };



  const menuItems = [
    { icon: Home, label: 'Главная', href: '#' },
    { icon: Book, label: 'Игры', href: '#' },
    { icon: Book, label: 'Магазин', href: '#' },
    { icon: Settings, label: 'Настройки', href: '#' },
    { icon: LogOut, label: 'Выйти', href: '#' }
  ];

  // Функция для отображения контента в зависимости от активного раздела
  const renderMainContent = () => {
    switch(activeSection) {
      case 'home':
        return <HomePage theme={currentTheme} />;
      case 'games':
        return (
          <>
            <HeroSection theme={currentTheme} />
            <GamesManager theme={currentTheme} />
          </>
        );
      case 'shop':
        return <ShopPage theme={currentTheme} />;
      default:
        return (
          <>
            <HeroSection theme={currentTheme} />
            <GamesManager theme={currentTheme} />
          </>
        );
    }
  };

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
                onNavigate={handleNavigate}
              />

              <Main>
                {renderMainContent()}
              </Main>

              <ChatManager theme={currentTheme} />

              <MobileMenu
                showMobileMenu={showMobileMenu}
                setShowMobileMenu={setShowMobileMenu}
                theme={currentTheme}
                menuItems={menuItems}
                onNavigate={handleNavigate}
              />
            </Container>
          </ErrorBoundary>
        </GamesProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
