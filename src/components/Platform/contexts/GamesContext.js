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
        setGames(gamesData);
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
      // Update the game's favorite status in the state
      setGames(prevGames => 
        prevGames.map(game => 
          game.id === gameId ? { ...game, favorite: !game.favorite } : game
        )
      );
    } catch (error) {
      console.error('Ошибка при переключении избранного:', error);
      // Revert the change if API call fails
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