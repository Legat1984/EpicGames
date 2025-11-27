import styled from 'styled-components';
import FavoriteGame from './FavoriteGame';

const StyledFavoritesBar = styled.div`
  display: flex;
  align-items: center;
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

const Label = styled.span`
  position: relative;
  display: flex;
  align-items: center;
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
  
  @media (max-width: 768px) {
    font-size: clamp(0.7rem, 2vw, 0.8rem);
  }
`;

const GamesContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const FavoritesBar = ({ favorites, theme }) => {
  if (!favorites || favorites.length === 0) {
    return null;
  }

  return (
    <StyledFavoritesBar theme={theme}>
      <Label theme={theme}>ИЗБРАННОЕ:</Label>
      <GamesContainer>
        {favorites.map(game => (
          <FavoriteGame key={game.id} game={game} theme={theme} />
        ))}
      </GamesContainer>
    </StyledFavoritesBar>
  );
};

export default FavoritesBar;