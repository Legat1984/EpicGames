import React, { useContext, useState } from "react";
import styled from "styled-components";
import EpicGamesLogotype from './EpicGamesLogotype';
import { useScreen } from '../../contexts/ScreenContext';
import { UserContext } from '../../contexts/UserContext';
import closeFormButtonSVG from '../../assets/EpicGames/images/CloseFormButton.svg';

import EpicGamesContentLoginForm from './EpicGamesContentLoginForm';
import EpicGamesContentRegistrationForm from './EpicGamesContentRegistrationForm';
import EpicGamesContentConfirmationForm from './EpicGamesContentConfirmationForm';
import EpicGamesContentRequestResetForm from './EpicGamesContentRequestResetForm';
import EpicGamesContentPasswordResetForm from './EpicGamesContentPasswordResetForm';


const Modal = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${({ $orientation, $device }) => ($orientation === 'landscape' && $device === 'mobile' ? '100%' : '50%')};
    height: ${({ $orientation, $device }) => ($orientation === 'landscape' && $device === 'mobile' ? '100%' : 'auto')};
    min-width: ${({ $device }) => ($device === 'mobile' ? '100%' : '280px')};
    max-width: ${({ $device }) => ($device === 'mobile' ? '100%' : '357px')};
    min-height: ${({ $device }) => ($device === 'mobile' ? '100%' : 'auto')};
    max-height: ${({ $device }) => ($device === 'mobile' ? '100%' : 'auto')};
    background-color: rgba(21, 23, 30, 0.9);
    padding: 20px;
    border-radius: ${({ $orientation, $device }) => ($orientation === 'landscape' && $device === 'mobile' ? '16px' : '8px')};
    z-index: 1000;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(40, 57, 101, 0.85);
    z-index: 999;
`;

const Header = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px;
`;

const CloseButton = styled.button`
    position: absolute;
    top: ${({ $device }) => ($device === 'mobile' ? '30px' : '10px')};
    right: ${({ $device }) => ($device === 'mobile' ? '30px' : '10px')};
    width: 30px;
    height: 30px;
    background: url(${closeFormButtonSVG}) no-repeat center center;
    background-size: contain;
    border: none;
    cursor: pointer;
    transition: opacity 0.3s;

    &:hover {
        filter: invert(29%) sepia(86%) saturate(7494%) hue-rotate(355deg) brightness(104%) contrast(101%);
    }
`;

const Main = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px;
`;

const ModalFormContainer = ({ closeModal, formState: initialFormState }) => {
    const { orientation, device } = useScreen();
    const [formState, setFormState] = useState(initialFormState);
    const [errorMessage, setErrorMesage] = useState('');
    const [tokenNewUser, setTokenNewUser] = useState('');
    const [stateConfirmationForm, setStateConfirmationForm] = useState('');

    const { login } = useContext(UserContext);

    const handleLoginSubmit = async (credentials) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if (response.ok) {
                const data = await response.json();
                if (data.errors) {
                    setErrorMesage(data.errors);
                } else {
                    login(data.user, data.token);
                    window.location.href = '/';
                }
            } else {
                const errorData = await response.json();
                setErrorMesage(errorData.message || "Ошибка авторизации");
            }
        } catch (error) {
            setErrorMesage("Ошибка сети");
        }
    };

    const handleRegistrationSubmit = async (credentails) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentails)
            });

            if (response.ok) {
                const data = await response.json();
                if (data.errors) {
                    setErrorMesage(data.errors);
                } else {
                    setErrorMesage(data.message);
                    setTokenNewUser(data.token);
                    setStateConfirmationForm('registration');
                    setFormState("confirmationEmail");
                }
            } else {
                const errorData = await response.json();
                setErrorMesage(errorData.message || "Ошибка регистрации");
            }
        } catch (error) {
            setErrorMesage("Ошибка сети");
        }
    };

    const handleConfirmationSubmit = async ({ token, confirmationCode }) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/confirm`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, confirmationCode })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.errors) {
                    setErrorMesage(data.errors);
                } else {
                    if (stateConfirmationForm === 'registration') {
                        login(data.user, data.token);
                        window.location.href = '/';
                    } else if(stateConfirmationForm === 'request') {
                        setErrorMesage('');
                        setFormState("resetPassword");
                    }
                }
            } else {
                const errorData = await response.json();
                setErrorMesage(errorData.message || "Ошибка подтверждения");
            }
        } catch (error) {
            setErrorMesage("Ошибка сети");
        }
    };

    const handleResendConfirmationCode = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/resend-confirmation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: tokenNewUser })
            });
    
            if (response.ok) {
                const data = await response.json();
                if (data.errors) {
                    setErrorMesage(data.errors);
                } else {
                    setErrorMesage(data.message);
                }
            } else {
                const errorData = await response.json();
                setErrorMesage(errorData.message || "Ошибка при повторной отправке кода");
            }
        } catch (error) {
            setErrorMesage("Ошибка сети");
        }
    };

    const handleRequestResetSubmit = async ({ email }) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/request-reset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
    
            if (response.ok) {
                const data = await response.json();
                if (data.errors) {
                    setErrorMesage(data.errors);
                } else {
                    setErrorMesage(data.message);
                    setTokenNewUser(data.token);
                    setStateConfirmationForm('request');
                    setFormState("confirmationEmail");
                }
            } else {
                const errorData = await response.json();
                setErrorMesage(errorData.message || "Ошибка при запросе восстановления пароля");
            }
        } catch (error) {
            setErrorMesage("Ошибка сети");
        }
    };

    const handleResetPasswordSubmit = async ({ newPassword }) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tokenNewUser, newPassword })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.errors) {
                    setErrorMesage(data.errors);
                } else {
                    setErrorMesage('Пароль успешно изменен, авторизуйтесь');
                    setFormState("login");
                }
            } else {
                const errorData = await response.json();
                setErrorMesage(errorData.message || "Ошибка подтверждения");
            }
        } catch (error) {
            setErrorMesage("Ошибка сети");
        }
    };

    const clearError = () => {
        setErrorMesage('');
    };

    const renderFormContent = () => {
        switch (formState) {
            case 'login':
                return <EpicGamesContentLoginForm onSubmit={handleLoginSubmit} onChangeFormState={setFormState} errorMessage={errorMessage} clearError={clearError} />;
            case 'register':
                return <EpicGamesContentRegistrationForm onSubmit={handleRegistrationSubmit} onChangeFormState={setFormState} errorMessage={errorMessage} clearError={clearError} />;
            case 'confirmationEmail':
                return <EpicGamesContentConfirmationForm 
                    tokenNewUser={tokenNewUser} 
                    onSubmit={handleConfirmationSubmit} 
                    onResendCode={handleResendConfirmationCode}
                    errorMessage={errorMessage}
                    clearError={clearError}
                    stateConfirmationForm={stateConfirmationForm}
                />;
            case 'requestReset':
                return <EpicGamesContentRequestResetForm onSubmit={handleRequestResetSubmit} onChangeFormState={setFormState} errorMessage={errorMessage} clearError={clearError} />;
            case 'resetPassword':
                return <EpicGamesContentPasswordResetForm errorMessage={errorMessage} clearError={clearError} onSubmit={handleResetPasswordSubmit} token={tokenNewUser} />;
            default:
                return <EpicGamesContentLoginForm onSubmit={handleLoginSubmit} onChangeFormState={setFormState} errorMessage={errorMessage} clearError={clearError} />;
        }
    };

    return (
        <>
            <Overlay onDoubleClick={formState !== 'confirmationEmail' ? closeModal : null} />
            <Modal $orientation={orientation} $device={device}>
                <Header>
                    <EpicGamesLogotype isLink={false} hasText={true} horizontalOnly={false} forTheForm={true} />
                    {formState !== 'confirmationEmail' && <CloseButton onClick={closeModal} $device={device} />}
                </Header>
                <Main>
                    {renderFormContent()}
                </Main>
            </Modal>
        </>
    );
};

export default ModalFormContainer;