import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Settings, LogOut } from 'lucide-react';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const UserButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${props => props.theme.card};
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${props => props.theme.surface};
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 200px;
  z-index: 1000;
  overflow: hidden;
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.text};

  &:hover {
    background-color: ${props => props.theme.card};
  }

  &:first-child {
    border-top: none;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const UserDropdown = ({ theme, onSettingsClick, onLogout }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-dropdown')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleUserButtonClick = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContainer className="user-dropdown">
      <UserButton 
        theme={theme} 
        onClick={handleUserButtonClick}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
          <path d="M20 20C20 16.134 16.866 13 13 13H11C7.13401 13 4 16.134 4 20" stroke="currentColor" strokeWidth="2" />
        </svg>
      </UserButton>
      
      {isOpen && (
        <DropdownMenu theme={theme}>
          <DropdownItem onClick={onSettingsClick}>
            <Settings size={16} />
            Настройки
          </DropdownItem>
          <DropdownItem onClick={onLogout}>
            <LogOut size={16} />
            Выход
          </DropdownItem>
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default UserDropdown;