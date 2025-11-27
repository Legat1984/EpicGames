import React, { createContext, useContext, useState, useEffect } from 'react';

const GamesContext = createContext();

export const useGames = () => {
  const context = useContext(GamesContext);
  if (!context) {
    throw new Error('useGames must be used within a GamesProvider');
  }
  return context;
};

export const GamesProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/games/games-list`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
        }

        const gamesData = await response.json();
        // Получаем данные пользователя из localStorage
        const user = JSON.parse(localStorage.getItem('user'));

        // Преобразуем массив избранных ID в Set для быстрого поиска
        const favoriteGameIds = user && user.favoriteGames ? new Set(user.favoriteGames) : new Set();

        // Добавляем свойство favorite к каждой игре
        const gamesWithFavorites = gamesData.map(game => ({
          ...game,
          favorite: favoriteGameIds.has(game.id)
        }));

        setGames(gamesWithFavorites);
      } catch (error) {
        console.error('Ошибка получения списка игр:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  useEffect(() => {
    setFavorites(games.filter(game => game.favorite));
  }, [games]);

  const toggleFavorite = async (gameId) => {
    try {
      const currentGame = games.find(game => game.id === gameId);
      const isFavorite = currentGame ? currentGame.favorite : false;

      let response;

      if (!isFavorite) {
        // Если игра не избранная, добавляем в избранное на сервере
        response = await fetch(`${process.env.REACT_APP_API_URL}/api/games/favorite/add/${gameId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
      } else {
        // Если игра избранная, убираем из избранного на сервере
        response = await fetch(`${process.env.REACT_APP_API_URL}/api/games/favorite/remove/${gameId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
      }

      const result = await response.json();

      if (response.ok && !result.errors) {
        // После успешной операции на сервере обновляем локальное состояние
        setGames(prevGames =>
          prevGames.map(game =>
            game.id === gameId ? { ...game, favorite: !game.favorite } : game
          )
        );
      }
    } catch (error) {
      console.error('Ошибка при переключении избранного:', error);
      setGames(prevGames =>
        prevGames.map(game =>
          game.id === gameId ? { ...game, favorite: !game.favorite } : game
        )
      );
    }
  };

  const value = {
    games,
    setGames,
    favorites,
    toggleFavorite,
    loading,
    error
  };

  return (
    <GamesContext.Provider value={value}>
      {children}
    </GamesContext.Provider>
  );
};