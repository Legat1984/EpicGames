import styled from 'styled-components';
import IconButton from './IconButton';
import MobileMenuButton from './MobileMenuButton';
import UserDropdown from './UserDropdown';
import { Globe, Menu } from 'lucide-react';

const StyledHeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const HeaderActions = ({ toggleTheme, setShowMobileMenu, theme, onSettingsClick, onLogout }) => {
  return (
    <StyledHeaderActions>
      <IconButton onClick={toggleTheme} theme={theme}>
        <Globe size={20} />
      </IconButton>
      <UserDropdown
        theme={theme}
        onSettingsClick={onSettingsClick}
        onLogout={onLogout}
      />
      <MobileMenuButton onClick={() => setShowMobileMenu(true)} theme={theme}>
        <Menu size={20} />
      </MobileMenuButton>
    </StyledHeaderActions>
  );
};

export default HeaderActions;