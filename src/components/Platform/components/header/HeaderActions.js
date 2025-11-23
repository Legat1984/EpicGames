import styled from 'styled-components';
import IconButton from './IconButton';
import MobileMenuButton from './MobileMenuButton';
import { Globe, User, Menu } from 'lucide-react';

const StyledHeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const HeaderActions = ({ toggleTheme, setShowMobileMenu, theme }) => {
  return (
    <StyledHeaderActions>
      <IconButton onClick={toggleTheme} theme={theme}>
        <Globe size={20} />
      </IconButton>
      <IconButton theme={theme}>
        <User size={20} />
      </IconButton>
      <MobileMenuButton onClick={() => setShowMobileMenu(true)} theme={theme}>
        <Menu size={20} />
      </MobileMenuButton>
    </StyledHeaderActions>
  );
};

export default HeaderActions;