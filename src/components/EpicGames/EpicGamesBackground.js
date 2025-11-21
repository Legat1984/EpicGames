import React from 'react';
import styled from 'styled-components';
import { useScreen } from '../../contexts/ScreenContext';

import EpicGamesLogotype from "./EpicGamesLogotype";

import EpicGamesBackgroundImg from '../../assets/EpicGames/images/EpicGamesBackground.png';

const EpicGamesBackgroundImages = styled.div`
    position: fixed;
    width: 100%;
    height: ${({ $orientation }) => ($orientation === 'portrait' ? '100vmax' : '100vmin')};
    background: url(${EpicGamesBackgroundImg}) center/cover no-repeat;
`;

const GradientOverlay = styled.div`
  position: absolute;
  bottom: ${({ $orientation, $device }) => ($orientation === 'landscape' && $device === 'mobile' ? 'auto' : '0')};
  right: ${({ $orientation, $device }) => ($orientation === 'landscape' && $device === 'mobile' ? '0' : 'auto')};
  width: ${({ $orientation, $device }) => ($orientation === 'landscape' && $device === 'mobile' ? '45%' : '100%')};
  height: ${({ $orientation, $device }) => ($orientation === 'landscape' && $device === 'mobile' ? '100%' : '35%')};
  background: ${({ $orientation, $device }) =>
    $orientation === 'landscape' && $device === 'mobile'
      ? 'linear-gradient(to right, rgba(30, 37, 56, 0) 0%, rgba(30, 37, 56, 0.25) 12%, rgba(30, 37, 56, 0.5) 25%, rgba(30, 37, 56, 1) 50%, rgba(30, 37, 56, 1) 100%)'
      : 'linear-gradient(to top, rgba(30, 37, 56, 1) 0%, rgba(30, 37, 56, 1) 50%, rgba(30, 37, 56, 0.5) 75%, rgba(30, 37, 56, 0.25) 88%, rgba(30, 37, 56, 0) 100%)'};
`;

const EpicGamesBackground = ({ hideByModality }) => {
    const { orientation, device } = useScreen();
    
    return (
        (!hideByModality || device === 'pc') && (
            <EpicGamesBackgroundImages $orientation={orientation}>
                {!hideByModality && (
                    <>
                        <EpicGamesLogotype
                            isLink={true}
                            linkUrl={process.env.REACT_APP_EPIC_GAMES_URL}
                            hasText={true}
                            horizontalOnly={true}
                        />
                        <GradientOverlay
                            $orientation={orientation}
                            $device={device}
                        />
                    </>
                )}
            </EpicGamesBackgroundImages>
        )
    );
}

export default EpicGamesBackground;