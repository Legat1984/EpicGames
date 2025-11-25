import styled from 'styled-components';
import EpicGamesLogotypeImage from '../../../../assets/EpicGames/images/EpicGamesLogotype.png';
import EpicGamesLogotypeText from '../../../../assets/EpicGames/images/EpicGamesLogotypeText.svg';

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  .logo-image {
    width: 120px;
    height: auto;
  }
  
  .logo-text {
    width: 200px;
    height: auto;
    filter: ${props => props.theme.mode === 'dark' ? 'invert(0)' : 'invert(1)'};
  }
`;

const Logo = ({ theme }) => {
  return (
    <StyledLogo theme={theme}>
      <img src={EpicGamesLogotypeImage} alt="Epic Games Logo" className="logo-image" />
      <img src={EpicGamesLogotypeText} alt="Epic Games" className="logo-text" />
    </StyledLogo>
  );
};

export default Logo;