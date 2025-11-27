import styled from 'styled-components';
import GameImage from './GameImage';
import GameContent from './GameContent';

const StyledGameCard = styled(({ theme, ...props }) => <div {...props} />)`
  background-color: ${props => props.theme.card};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  position: relative;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
  }
`;

const PlayButton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;
  
  ${StyledGameCard}:hover & {
    opacity: 1;
  }
`;

const PlayText = styled.span`
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

const GameCard = ({ game, theme, onClick }) => {
  return (
    <StyledGameCard theme={theme} onClick={onClick}>
      <PlayButton>
        <PlayText>Играть</PlayText>
      </PlayButton>
      <GameImage src={game.image} alt={game.title} />
      <GameContent game={game} theme={theme} />
    </StyledGameCard>
  );
};

export default GameCard;