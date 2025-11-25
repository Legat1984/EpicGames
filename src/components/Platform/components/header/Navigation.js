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