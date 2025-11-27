import styled from 'styled-components';

const StyledFavoriteGame = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  min-width: 60px;
  cursor: pointer;
  overflow: visible;
  
  img {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    object-fit: cover;
  }
`;

const FavoriteGame = ({ game, theme }) => {
  return (
    <StyledFavoriteGame theme={theme}>
      <img src={game.image} alt={game.title} title={game.title} />
    </StyledFavoriteGame>
  );
};

export default FavoriteGame;