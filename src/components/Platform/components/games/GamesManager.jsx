import React from 'react';
import { useGames } from '../../contexts/GamesContext';
import GamesGrid from '../main/GamesGrid';

const GamesManager = ({ theme }) => {
  const { games } = useGames();

  return (
    <GamesGrid games={games} theme={theme} />
  );
};

export default GamesManager;