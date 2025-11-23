import styled from 'styled-components';

const StyledFavoriteGame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  min-width: 60px;
  cursor: pointer;
  
  img {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    object-fit: cover;
  }
  
  span {
    font-size: 0.75rem;
    text-align: center;
    color: ${props => props.theme.textSecondary};
  }
`;

const FavoriteGame = ({ game, theme }) => {
  return (
    <StyledFavoriteGame theme={theme}>
      <img src={game.image} alt={game.title} />
      <span>{game.title}</span>
    </StyledFavoriteGame>
  );
};

export default FavoriteGame;