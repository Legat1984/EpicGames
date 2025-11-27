import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: ${props => props.theme.card};
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${props => props.theme.button};
  color: ${props => props.theme.text};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GameImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
`;

const GameInfo = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column-reverse;
  gap: 1rem;
`;

const GameTitle = styled.h2`
  margin: 0;
  color: ${props => props.theme.text};
  font-size: 1.8rem;
`;

const GameDescription = styled.p`
  color: ${props => props.theme.text};
  line-height: 1.6;
  margin: 0;
`;

const GameSections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const Section = styled.div`
  padding: 1rem;
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  background: ${props => props.theme.background};
`;

const SectionTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: ${props => props.theme.text};
  font-size: 1.2rem;
`;

const Button = styled.button`
  background: ${props => props.theme.button};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
`;

const GameModal = ({ game, onClose, theme }) => {
  if (!game) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent 
        theme={theme} 
        onClick={e => e.stopPropagation()}
      >
        <CloseButton theme={theme} onClick={onClose}>×</CloseButton>
        
        <GameInfo theme={theme}>
          <GameSections>
            <Section theme={theme}>
              <SectionTitle theme={theme}>Текущие игры</SectionTitle>
              <p>Список текущих игр (пока пуст)</p>
            </Section>
            
            <Section theme={theme}>
              <SectionTitle theme={theme}>Игры, собирающие игроков</SectionTitle>
              <p>Список игр, в которые можно присоединиться (пока пуст)</p>
            </Section>
            
            <Section theme={theme}>
              <SectionTitle theme={theme}>Приглашения в игру</SectionTitle>
              <p>Список приглашений (пока пуст)</p>
            </Section>
            
            <Button theme={theme} onClick={() => console.log('Создать игру')}>
              Создать игру
            </Button>
          </GameSections>
          
          <GameImage src={game.image} alt={game.title} />
          <GameTitle theme={theme}>{game.title}</GameTitle>
          <GameDescription theme={theme}>{game.description}</GameDescription>
        </GameInfo>
      </ModalContent>
    </ModalOverlay>
  );
};

export default GameModal;