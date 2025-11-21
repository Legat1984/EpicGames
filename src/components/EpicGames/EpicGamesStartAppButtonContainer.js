import React, { useState } from "react";
import styled from "styled-components";
import { useScreen } from '../../contexts/ScreenContext';
import { LoginButton, RegisterButton } from './EpicGamesStartAppButton';
import EpicGamesStartAppModalForm from './EpicGamesStartAppModalForm';

const Container = styled.div`
    position: absolute;
    bottom: ${({ $orientation, $device }) => ($orientation === 'landscape' && $device === 'mobile' ? 'auto' : '0')};
    right: ${({ $orientation, $device }) => ($orientation === 'landscape' && $device === 'mobile' ? '0' : 'auto')};
    width: ${({ $orientation, $device }) => ($orientation === 'landscape' && $device === 'mobile' ? '30%' : '100%')};
    min-width: 300px;
    height: ${({ $orientation, $device }) => ($orientation === 'landscape' && $device === 'mobile' ? '100%' : '20%')};
    min-height: 200px;
    flex-direction: ${({ $orientation, $device }) => (($orientation === 'landscape' && $device === 'mobile') ? 'column' : 'row')};
    bottom: 0;
    display: flex;
    justify-content: ${({ $orientation, $device }) => ($orientation === 'landscape' && $device === 'mobile' ? 'flex-end' : 'center')};
    align-items: flex-end;
`;

const EpicGamesStartAppButtonContainer = ({ setHideByModality }) => {
    const { orientation, device } = useScreen();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formState, setFormState] = useState("login");

    const openModal = (state) => {
        setIsModalOpen(true);
        setHideByModality(true);
        setFormState(state);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setHideByModality(false);
    };

    return (
        <>
            {!isModalOpen && (
                <Container $orientation={orientation} $device={device}>
                    <LoginButton onClick={() => openModal('login')}>Войти в аккаунт</LoginButton>
                    <RegisterButton onClick={() => openModal('register')}>Зарегистрироваться</RegisterButton>
                </Container>
            )}
            {isModalOpen && (
                <EpicGamesStartAppModalForm
                    $orientation={orientation}
                    $device={device}
                    closeModal={closeModal}
                    formState={formState}
                />
            )}
        </>
    );
};

export default EpicGamesStartAppButtonContainer;