import React, { createContext, useState, useCallback, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [isAuthenticated, setIsAuthenticated] = useState(user !== null);

    const handleUnauthenticated = useCallback(() => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '/';
    }, []);

    // Функция для проверки, является ли игра избранной
    const isGameFavorite = useCallback((gameId) => {
        return user && user.favoriteGames && user.favoriteGames.includes(gameId);
    }, [user]);

    // Функция для добавления игры в избранное
    const addToFavorites = async (gameId) => {
        if (!user || !isAuthenticated) {
            console.error('Пользователь не аутентифицирован');
            return false;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/favorite/add/${gameId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (response.ok) {
                // Обновляем пользователя в состоянии и в localStorage
                const updatedUser = {
                    ...user,
                    favoriteGames: [...(user.favoriteGames || []), gameId]
                };
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
                return true;
            } else {
                console.error('Ошибка добавления в избранное:', data.errors);
                return false;
            }
        } catch (error) {
            console.error('Ошибка при добавлении в избранное:', error);
            return false;
        }
    };

    // Функция для удаления игры из избранного
    const removeFromFavorites = async (gameId) => {
        if (!user || !isAuthenticated) {
            console.error('Пользователь не аутентифицирован');
            return false;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/favorite/remove/${gameId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (response.ok) {
                // Обновляем пользователя в состоянии и в localStorage
                const updatedUser = {
                    ...user,
                    favoriteGames: (user.favoriteGames || []).filter(id => id !== gameId)
                };
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
                return true;
            } else {
                console.error('Ошибка удаления из избранного:', data.errors);
                return false;
            }
        } catch (error) {
            console.error('Ошибка при удалении из избранного:', error);
            return false;
        }
    };

    // Функция для переключения статуса избранного
    const toggleFavorite = async (gameId) => {
        if (isGameFavorite(gameId)) {
            return await removeFromFavorites(gameId);
        } else {
            return await addToFavorites(gameId);
        }
    };

    const login = (userData, token) => {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
    };

    const logout = () => {
        handleUnauthenticated();
    };

    const updateUserFavorites = useCallback((updatedFavoriteGames) => {
        if (user) {
            const updatedUser = {
                ...user,
                favoriteGames: updatedFavoriteGames
            };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
        }
    }, [user]);

    const refreshToken = useCallback(async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/refresh-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                return true;
            } else {
                handleUnauthenticated();
                return false;
            }
        } catch (error) {
            console.error('Ошибка при обновлении токена:', error);
            handleUnauthenticated();
            return false;
        }
    }, [handleUnauthenticated]);

    const checkToken = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            const fiveMinutesInSeconds = 300;

            if (decodedToken.exp < currentTime) {
                handleUnauthenticated();
                return false;
            } else if ((decodedToken.exp - currentTime) <= fiveMinutesInSeconds) {
                return await refreshToken();
            } else {
                return true;
            }
        }
        return false;
    }, [handleUnauthenticated, refreshToken]);

    useEffect(() => {
        checkToken();

        const interval = setInterval(() => {
            checkToken();
        }, 60000);

        return () => clearInterval(interval);
    }, [checkToken]);

    return (
        <UserContext.Provider value={{ 
            user, 
            isAuthenticated, 
            login, 
            logout, 
            isGameFavorite, 
            addToFavorites, 
            removeFromFavorites, 
            toggleFavorite,
            updateUserFavorites
        }}>
            {children}
        </UserContext.Provider>
    );
};