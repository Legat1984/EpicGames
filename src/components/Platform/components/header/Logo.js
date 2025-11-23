import styled from 'styled-components';
import { Gamepad2 } from 'lucide-react';

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${props => props.theme.text};
  }
`;

const Logo = ({ theme }) => {
  return (
    <StyledLogo theme={theme}>
      <Gamepad2 color={theme.primary} size={32} />
      <h1>Настольные Игры Онлайн</h1>
    </StyledLogo>
  );
};

export default Logo;