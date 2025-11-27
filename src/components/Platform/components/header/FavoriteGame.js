import styled from 'styled-components';

const Tooltip = styled.div`
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${props => props.theme.surface};
  color: ${props => props.theme.text};
  border: 1px solid ${props => props.theme.border};
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  white-space: nowrap;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s, visibility 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  pointer-events: none;
  margin: 0;
  padding: 0.25rem 0.5rem;

  ${props => props.visible && `
    opacity: 1;
    visibility: visible;
  `}
`;

const StyledFavoriteGame = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  min-width: 60px;
  cursor: pointer;

  &:hover ${Tooltip} {
    @media (min-width: 769px) {
      opacity: 1;
      visibility: visible;
    }
  }
  
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
      <img src={game.image} alt={game.title} />
      <Tooltip theme={theme}>{game.title}</Tooltip>
    </StyledFavoriteGame>
  );
};

export default FavoriteGame;