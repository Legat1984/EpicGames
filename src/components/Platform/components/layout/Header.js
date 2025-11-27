import styled from 'styled-components';
import { useGames } from '../../contexts/GamesContext';
import HeaderContent from '../header/HeaderContent';
import TopHeader from '../header/TopHeader';
import Logo from '../header/Logo';
import Navigation from '../header/Navigation';
import HeaderActions from '../header/HeaderActions';
import FavoriteGame from '../header/FavoriteGame';

const StyledHeader = styled(({ theme, ...props }) => <header {...props} />)`
  background-color: ${props => props.theme.surface};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-bottom: 1px solid ${props => props.theme.border};
  position: relative;
`;

const Header = ({ theme, toggleTheme, setShowMobileMenu, activeTab, onTabChange, onSettingsClick, onLogout }) => {
  const { favorites } = useGames();
  
  return (
    <StyledHeader theme={theme}>
      <HeaderContent>
        <TopHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontWeight: 'bold', color: theme?.primary || '#007bff' }}>ИЗБРАННОЕ:</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: 'auto' }}>
            <Logo theme={theme} />
            <Navigation theme={theme} activeTab={activeTab} onTabChange={onTabChange} />
          </div>
          <HeaderActions 
            toggleTheme={toggleTheme} 
            setShowMobileMenu={setShowMobileMenu} 
            theme={theme} 
            onSettingsClick={onSettingsClick}
            onLogout={onLogout}
          />
        </TopHeader>
        <div style={{ display: 'flex', justifyContent: 'flex-start', paddingTop: '0.5rem' }}>
          {favorites && favorites.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {favorites.map(game => (
                <FavoriteGame key={game.id} game={game} theme={theme} />
              ))}
            </div>
          )}
        </div>
      </HeaderContent>
    </StyledHeader>
  );
};

export default Header;