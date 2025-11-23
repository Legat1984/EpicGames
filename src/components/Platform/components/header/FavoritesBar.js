import styled from 'styled-components';
import FavoriteGame from './FavoriteGame';

const StyledFavoritesBar = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.5rem 0;
  scrollbar-width: thin;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.surface};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primary};
    border-radius: 2px;
  }
`;

const FavoritesBar = ({ favorites, theme }) => {
  return (
    <StyledFavoritesBar theme={theme}>
      {favorites.map(game => (
        <FavoriteGame key={game.id} game={game} theme={theme} />
      ))}
    </StyledFavoritesBar>
  );
};

export default FavoritesBar;