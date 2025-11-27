import React, { useState } from 'react';
import { useGames } from '../../contexts/GamesContext';
import GamesGrid from '../main/GamesGrid';
import GameModal from '../main/GameModal';
import styled from 'styled-components';

const LoadingMessage = styled(({ theme, ...props }) => <div {...props} />)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: ${props => props.theme.text};
  font-size: 1.2rem;
`;

const ErrorMessage = styled(({ theme, ...props }) => <div {...props} />)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: #ff6b6b;
  font-size: 1.2rem;
`;

const GamesManager = ({ theme }) => {
  const { games, loading, error } = useGames();
  const [selectedGame, setSelectedGame] = useState(null);

  if (error) {
    return <ErrorMessage theme={theme}>Ошибка загрузки игр: {error}</ErrorMessage>;
  }

  if (loading) {
    return <LoadingMessage theme={theme}>Загрузка игр...</LoadingMessage>;
  }

  const handleGameClick = (game) => {
    setSelectedGame(game);
  };

  const handleCloseModal = () => {
    setSelectedGame(null);
  };

  return (
    <>
      <GamesGrid 
        games={games} 
        theme={theme} 
        onGameClick={handleGameClick}
      />
      {selectedGame && (
        <GameModal 
          game={selectedGame} 
          onClose={handleCloseModal} 
          theme={theme} 
        />
      )}
    </>
  );
};

export default GamesManager;