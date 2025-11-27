import React, { useContext } from 'react';
import { UserContext } from '../../../../contexts/UserContext';
import { useGames } from '../../contexts/GamesContext';
import GamesGrid from '../../components/main/GamesGrid';
import styled from 'styled-components';

const FavoritesContainer = styled.div`
  padding: 2rem;
`;

const FavoritesHeader = styled.h2`
  color: ${props => props.theme.text};
  margin-bottom: 1.5rem;
`;

const NoFavoritesMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme.textSecondary};
  font-size: 1.2rem;
`;

const FavoritesManager = ({ theme }) => {
  const { user } = useContext(UserContext);
  const { favorites, loading, error } = useGames();

  if (error) {
    return <NoFavoritesMessage theme={theme}>Ошибка загрузки избранных игр: {error}</NoFavoritesMessage>;
  }

  if (loading) {
    return <NoFavoritesMessage theme={theme}>Загрузка избранных игр...</NoFavoritesMessage>;
  }

  if (!user) {
    return <NoFavoritesMessage theme={theme}>Войдите в систему, чтобы увидеть избранные игры</NoFavoritesMessage>;
  }

  if (favorites.length === 0) {
    return <NoFavoritesMessage theme={theme}>У вас нет избранных игр</NoFavoritesMessage>;
  }

  return (
    <FavoritesContainer>
      <FavoritesHeader theme={theme}>Избранные игры</FavoritesHeader>
      <GamesGrid games={favorites} theme={theme} />
    </FavoritesContainer>
  );
};

export default FavoritesManager;