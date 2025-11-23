import styled from 'styled-components';

const StyledNavigation = styled.nav`
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

const Navigation = ({ theme }) => {
  return (
    <StyledNavigation theme={theme}>
      <a href="#">Главная</a>
      <a href="#">Игры</a>
      <a href="#">Магазин</a>
    </StyledNavigation>
  );
};

export default Navigation;