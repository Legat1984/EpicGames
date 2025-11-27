import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';

const GamesContext = createContext();

export const useGames = () => {
  const context = useContext(GamesContext);
  if (!context) {
    throw new Error('useGames must be used within a GamesProvider');
  }
  return context;
};

export const GamesProvider = ({ children }) => {
  const { isGameFavorite, toggleFavorite: toggleFavoriteUser } = useContext(UserContext);
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
        
        // Добавляем информацию об избранном к каждой игре
        const gamesWithFavoriteStatus = gamesData.map(game => ({
          ...game,
          favorite: isGameFavorite(game.id)
        }));
        
        setGames(gamesWithFavoriteStatus);
      } catch (error) {
        console.error('Ошибка получения списка игр:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [isGameFavorite]);

  useEffect(() => {
    setFavorites(games.filter(game => game.favorite));
  }, [games]);

  const toggleFavorite = async (gameId) => {
    // Сначала обновляем статус на сервере через UserContext
    const success = await toggleFavoriteUser(gameId);
    
    if (success) {
      // Обновляем локальное состояние игр
      setGames(prevGames => 
        prevGames.map(game => 
          game.id === gameId ? { ...game, favorite: !game.favorite } : game
        )
      );
    } else {
      console.error('Ошибка при переключении избранного');
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