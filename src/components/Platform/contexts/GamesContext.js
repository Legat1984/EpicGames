import React, { createContext, useContext, useState, useEffect } from 'react';
import HogwartsImage from '../../../assets/Games/HarryPotterTheBattleForHogwarts/Elements/Hogwarts.png';

const GamesContext = createContext();

export const useGames = () => {
  const context = useContext(GamesContext);
  if (!context) {
    throw new Error('useGames must be used within a GamesProvider');
  }
  return context;
};

export const GamesProvider = ({ children }) => {
  const [games, setGames] = useState([
    {
      id: 1,
      title: 'Гарри Поттер: Битва за Хогвартс',
      originalTitle: 'Harry Potter: Hogwarts Battle',
      category: 'Колодостроительная',
      players: '2-4',
      time: '30-60 мин',
      image: HogwartsImage,
      description: 'кооперативная настольная игра по мотивам произведений Джоан Роулинг.',
      favorite: true
    },
    {
      id: 2,
      title: 'Домино',
      originalTitle: 'Dominoes',
      category: 'Фамильная',
      players: '2-4',
      time: '30-45 мин',
      rating: 4.5,
      downloads: 890,
      image: 'https://placehold.co/300x200',
      description: 'Традиционная игра с костяшками, идеально подходит для всей семьи',
      favorite: true
    },
    {
      id: 3,
      title: 'Монополия',
      originalTitle: 'Monopoly',
      category: 'Экономика',
      players: '2-8',
      time: '90-180 мин',
      rating: 4.7,
      downloads: 2100,
      image: 'https://placehold.co/300x200',
      description: 'Классическая экономическая игра о покупке и продаже недвижимости',
      favorite: false
    },
    {
      id: 4,
      title: 'Шахматы',
      originalTitle: 'Chess',
      category: 'Логика',
      players: '2',
      time: '30-120 мин',
      rating: 4.9,
      downloads: 3500,
      image: 'https://placehold.co/300x200',
      description: 'Известная логическая игра для двух игроков, проверяющая стратегическое мышление',
      favorite: true
    }
  ]);

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(games.filter(game => game.favorite));
  }, [games]);

  const toggleFavorite = (gameId) => {
    setGames(prevGames => 
      prevGames.map(game => 
        game.id === gameId ? { ...game, favorite: !game.favorite } : game
      )
    );
  };

  const value = {
    games,
    setGames,
    favorites,
    toggleFavorite
  };

  return (
    <GamesContext.Provider value={value}>
      {children}
    </GamesContext.Provider>
  );
};