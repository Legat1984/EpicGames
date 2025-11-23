import styled from 'styled-components';
import ActionButton from './ActionButton';
import { Download, Heart, Share2 } from 'lucide-react';

const StyledGameActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GameActions = ({ game, theme }) => {
  return (
    <StyledGameActions>
      <span style={{ fontSize: '0.875rem', color: theme.textSecondary }}>
        {game.downloads} скачиваний
      </span>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <ActionButton>
          <Download size={16} />
        </ActionButton>
        <ActionButton>
          <Heart size={16} fill={game.favorite ? theme.primary : 'none'} color={game.favorite ? theme.primary : theme.textSecondary} />
        </ActionButton>
        <ActionButton>
          <Share2 size={16} />
        </ActionButton>
      </div>
    </StyledGameActions>
  );
};

export default GameActions;