import styled from 'styled-components';

const StyledNavigation = styled.nav`
  display: flex;
  gap: 2rem;
  
  a {
    color: ${props => props.theme.textSecondary};
    text-decoration: none;
    font-weight: 500;
    font-size: 24px;
    transition: color 0.2s ease;
    
    &:hover {
      color: ${props => props.theme.text};
      text-decoration: underline;
      text-decoration-color: #148EFF;
    }
    
    &.active {
      color: ${props => props.theme.text};
      text-decoration: underline;
      text-decoration-color: #148EFF;
    }
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const Navigation = ({ theme, activeTab, onTabChange }) => {
  return (
    <StyledNavigation theme={theme}>
      <a 
        href="#" 
        className={activeTab === 'home' ? 'active' : ''} 
        onClick={(e) => {
          e.preventDefault();
          onTabChange('home');
        }}
      >
        Главная
      </a>
      <a 
        href="#" 
        className={activeTab === 'games' ? 'active' : ''} 
        onClick={(e) => {
          e.preventDefault();
          onTabChange('games');
        }}
      >
        Игры
      </a>
      <a 
        href="#" 
        className={activeTab === 'shop' ? 'active' : ''} 
        onClick={(e) => {
          e.preventDefault();
          onTabChange('shop');
        }}
      >
        Магазин
      </a>
    </StyledNavigation>
  );
};

export default Navigation;