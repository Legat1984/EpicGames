import styled from 'styled-components';
import Tooltip from '../../../../components/Tooltip';

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

const FavoriteGame = ({ game, theme, setSelectedGame }) => {
  return (
    <Tooltip content={game.title} theme={theme}>
      <StyledFavoriteGame theme={theme} onClick={setSelectedGame(game)}>
        <img src={game.image} alt={game.title} />
      </StyledFavoriteGame>
    </Tooltip>
  );
};

export default FavoriteGame;