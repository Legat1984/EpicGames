import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext'; // Import theme context
import EpicGamesLogotypeImage from '../../../assets/EpicGames/images/EpicGamesLogotype.png';
import EpicGamesLogotypeText from '../../../assets/EpicGames/images/EpicGamesLogotypeText.svg';

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  .logo-image {
    width: 60px;
    height: auto;
    
    @media (max-width: 768px) {
      width: 50px;
    }
    
    @media (max-width: 480px) {
      width: 40px;
    }
  }
  
  .logo-text {
    width: 150px;
    height: auto;
    filter: ${props => props.invertColor ? 'invert(1)' : 'invert(0)'};
    
    @media (max-width: 768px) {
      width: 120px;
    }
    
    @media (max-width: 480px) {
      width: 100px;
    }
  }
`;

const Logo = () => {
  const { theme } = useTheme(); // Use theme context
  const invertColor = theme.mode === 'dark';
  
  return (
    <StyledLogo invertColor={invertColor}>
      <img src={EpicGamesLogotypeImage} alt="Epic Games Logo" className="logo-image" />
      <img src={EpicGamesLogotypeText} alt="Epic Games" className="logo-text" />
    </StyledLogo>
  );
};

export default Logo;