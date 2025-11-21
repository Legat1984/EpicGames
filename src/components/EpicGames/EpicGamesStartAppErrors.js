import React, { useEffect } from 'react';
import styled from 'styled-components';

const ErrorMessage = styled.div`
    width: calc(100% - 20px);
    padding: 10px;
    display: flex;
    justify-content: center;
    text-align: center;
    color: white;
    margin: 10px;
    font-size: 18px;
    background-color: #333333;
    border: 1px solid #666666;
    border-radius: 8px;
    position: relative;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 5px;
    right: 10px;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 16px;
`;

const Errors = ({ message, clearMessage }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                clearMessage();
            }, 8000);

            return () => clearTimeout(timer);
        }
    }, [message, clearMessage]);

    if (!message) return null;

    if (Array.isArray(message)) {
        return (
            <>
                {message.map((error, index) => (
                    <ErrorMessage key={index}>
                        {error.msg || error}
                        <CloseButton onClick={clearMessage}>×</CloseButton>
                    </ErrorMessage>
                ))}
            </>
        );
    }

    return (
        <ErrorMessage>
            {message}
            <CloseButton onClick={clearMessage}>×</CloseButton>
        </ErrorMessage>
    );
};

export default Errors;