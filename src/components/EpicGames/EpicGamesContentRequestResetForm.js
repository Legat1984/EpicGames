import React, { useState } from 'react';
import styled from 'styled-components';

import Title from './EpicGamesStartAppModalFormTitle';
import Errors from './EpicGamesStartAppErrors';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const FormInputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 20px;
`;

const Label = styled.label`
    position: absolute;
    top: 0;
    left: 10px;
    font-size: 20px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 150%;
    letter-spacing: 0.4px;
    transition: all 0.3s ease;
    transform: ${({ $isActive }) => ($isActive ? 'translateY(-35px)' : 'translateY(5px)')};
    cursor: ${({ $isActive }) => ($isActive ? 'default' : 'text')};
`;

const Input = styled.input`
    width: auto;
    height: 25px;
    padding: 8px;
    border: 1px solid #4A4C50;
    border-radius: 5px;
    background-color: #101117;

    font-size: 18px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 150%;
    letter-spacing: 0.4px;

    &::placeholder {
        color: transparent;
    }

    &:focus + ${Label} {
        opacity: 1;
        transform: translateY(-35px);
    }
`;

const Button = styled.button`
    width: 100%;
    height: 50px;
    margin: 4px;
    margin-bottom: 10px;
    background-color: #0074E0;
    font-size: 16px;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: 0.4px;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        color: #000000;
        background-color: #cccccc;
        cursor: not-allowed;
    }
`;

const ButtonLink = styled.button`
    margin: 4px;
    border: none;
    background-color: unset;
    font-size: 16px;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: 0.4px;
    color: #0070CC;
    cursor: pointer;

    &:hover {
        color: #0056b3;
        text-decoration: underline;
    }
`;

const EpicGamesContentRequestResetForm = ({ onSubmit, onChangeFormState, errorMessage, clearError }) => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            await onSubmit({ email });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Title>Восстановление пароля</Title>
            <Errors message={errorMessage} clearMessage={clearError} />
            <FormInputContainer>
                <Input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    placeholder="Введите ваш email"
                    id="email-input"
                />
                <Label htmlFor="email-input" $isActive={email}>Email:</Label>
            </FormInputContainer>
            <Button type="submit" disabled={isSubmitting}>Отправить запрос</Button>
            <ButtonLink type="button" onClick={() => onChangeFormState('login')}>Уже есть учетная запись</ButtonLink>
            <ButtonLink type="button" onClick={() => onChangeFormState('register')}>Зарегистрируйте учетную запись</ButtonLink>
        </Form>
    );
};

export default EpicGamesContentRequestResetForm;