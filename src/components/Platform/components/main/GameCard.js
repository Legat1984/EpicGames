import styled from 'styled-components';
import GameImage from './GameImage';
import GameContent from './GameContent';

const StyledGameCard = styled.div`
  background-color: ${props => props.theme.card};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
  }
`;

const GameCard = ({ game, theme }) => {
  return (
    <StyledGameCard theme={theme}>
      <GameImage src={game.image} alt={game.title} />
      <GameContent game={game} theme={theme} />
    </StyledGameCard>
  );
};

export default GameCard;