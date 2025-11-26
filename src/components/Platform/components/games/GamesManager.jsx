import React from 'react';
import { useGames } from '../../contexts/GamesContext';
import GamesGrid from '../main/GamesGrid';
import styled from 'styled-components';

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: ${props => props.theme.text};
  font-size: 1.2rem;
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: #ff6b6b;
  font-size: 1.2rem;
`;

const GamesManager = ({ theme }) => {
  const { games, loading, error } = useGames();

  if (error) {
    return <ErrorMessage theme={theme}>Ошибка загрузки игр: {error}</ErrorMessage>;
  }

  if (loading) {
    return <LoadingMessage theme={theme}>Загрузка игр...</LoadingMessage>;
  }

  return (
    <GamesGrid games={games} theme={theme} />
  );
};

export default GamesManager;