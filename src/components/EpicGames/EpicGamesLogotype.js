import React from 'react';
import styled from 'styled-components';
import { useScreen } from '../../contexts/ScreenContext';

import EpicGamesLogotypeImage from '../../assets/EpicGames/images/EpicGamesLogotype.png';
import EpicGamesLogotypeText from '../../assets/EpicGames/images/EpicGamesLogotypeText.svg';

const LogoContainer = styled.div`
  position: ${({ $forTheForm }) => ($forTheForm ? 'relative' : 'absolute')};
  display: flex;
  flex-direction: ${({ $orientation, $device, $horizontalOnly, $forTheForm }) =>
    ($forTheForm 
      ? ($orientation === 'landscape' && $device === 'mobile' ? 'row' : 'column') 
      : ($orientation === 'landscape' || $horizontalOnly) ? 'row' : 'column')};
  align-items: center;
  justify-content: center;
  width: ${({ $forTheForm, $orientation, $device }) => 
    ($forTheForm ? ($orientation === 'landscape' && $device === 'mobile' ? '35%' : '50%') : 'max-content')};
  max-width: 600px;
`;

const LogoImage = styled.img`
  position: relative;
  width: ${({ $forTheForm, $orientation, $device }) => 
    ($forTheForm  ? ($orientation === 'landscape' && $device === 'mobile' ? '50%' : '70%') 
                  : ($orientation === 'portrait' && $device === 'mobile' ? '25vw' : '15vw'))};
  height: auto;
  max-width: 200px;
`;

const LogoText = styled.img`
  margin-left: ${({ $orientation, $forTheForm }) => ($forTheForm ? '0' : ($orientation === 'landscape' ? '1vw' : '0'))};
  margin-top: ${({ $orientation, $forTheForm }) => ($forTheForm ? '0' : ($orientation === 'portrait' ? '1vw' : '0'))};
  width: ${({ $forTheForm, $orientation, $device }) => 
    ($forTheForm  ? ($orientation === 'landscape' && $device === 'mobile' ? '70%' : '100%') 
                  : ($orientation === 'portrait' && $device === 'mobile' ? '50vw' : '35vw'))};
  max-width: 400px;
  height: auto;
`;

const StyledLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EpicGamesLogotype = ({ hasText = true, isLink = false, linkUrl = '/', horizontalOnly = false, forTheForm = false }) => {
  const { orientation, device } = useScreen();

  return (
    <LogoContainer $orientation={orientation} $device={device} $horizontalOnly={horizontalOnly} $forTheForm={forTheForm} >
      {isLink ? (
        <StyledLink href={linkUrl}>
          <LogoImage src={EpicGamesLogotypeImage} alt="Epic Games Logo" $forTheForm={forTheForm} $orientation={orientation} $device={device} />
        </StyledLink>
      ) : (
        <LogoImage src={EpicGamesLogotypeImage} alt="Epic Games Logo" $forTheForm={forTheForm} $orientation={orientation} $device={device} />
      )}
      {hasText && (
        <LogoText src={EpicGamesLogotypeText} alt="Epic Games Logotype Text" $orientation={orientation} $forTheForm={forTheForm} $device={device} />
      )}
    </LogoContainer>
  );
};

export default EpicGamesLogotype;