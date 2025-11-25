import styled from 'styled-components';

const StyledNavigation = styled.nav`
  display: flex;
  gap: 2rem;
  
  a {
    color: #86898E;
    text-decoration: none;
    font-weight: 500;
    font-size: 18px; /* Увеличенный размер шрифта */
    transition: color 0.2s ease;
    
    &:hover {
      color: #FFFFFF;
      text-decoration: underline;
      text-decoration-color: #148EFF;
    }
    
    &.active {
      color: #FFFFFF;
      text-decoration: underline;
      text-decoration-color: #148EFF;
    }
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const Navigation = ({ theme, onNavigate }) => {
  const handleClick = (section) => {
    if (onNavigate) {
      onNavigate(section);
    }
  };

  return (
    <StyledNavigation theme={theme}>
      <a href="#" onClick={(e) => { e.preventDefault(); handleClick('home'); }}>Главная</a>
      <a href="#" onClick={(e) => { e.preventDefault(); handleClick('games'); }}>Игры</a>
      <a href="#" onClick={(e) => { e.preventDefault(); handleClick('shop'); }}>Магазин</a>
    </StyledNavigation>
  );
};

export default Navigation;