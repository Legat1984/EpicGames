import styled from 'styled-components';
import ActionButton from './ActionButton';
import { Download, Heart, Share2 } from 'lucide-react';
import { useGames } from '../../contexts/GamesContext';

const StyledGameActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GameActions = ({ game, theme }) => {
  const { toggleFavorite } = useGames();

  const handleToggleFavorite = () => {
    toggleFavorite(game.id);
  };

  return (
    <StyledGameActions>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <ActionButton onClick={handleToggleFavorite}>
          <Heart size={16} fill={game.favorite ? theme.primary : 'none'} color={game.favorite ? theme.primary : theme.textSecondary} />
        </ActionButton>
        {/*<ActionButton>
          <Share2 size={16} />
        </ActionButton>*/}
      </div>
    </StyledGameActions>
  );
};

export default GameActions;