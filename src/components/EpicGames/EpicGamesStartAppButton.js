import styled from "styled-components";

const Button = styled.button`
    width: ${({ $orientation, $device }) => ($orientation === 'landscape' && $device === 'mobile' ? '60%' : '40%')};
    max-width: 150px;
    height: ${({ $orientation, $device }) => ($orientation === 'landscape' && $device === 'mobile' ? '15%' : '15%')};
    max-height: 30px;
    margin-bottom: ${({ $orientation, $device }) => ($orientation === 'landscape' && $device === 'mobile' ? '10vmin' : '10vmin')};
    margin-left: 1vmin;
    margin-right: ${({ $orientation, $device }) => ($orientation === 'landscape' && $device === 'mobile' ? '5vmin' : '3vw')};
    margin-left: ${({ $orientation, $device }) => ($orientation === 'landscape' && $device === 'mobile' ? '0' : '3vw')};
    border-radius: 5px; 
    font-size: clamp(11px, 1vmin, 14px); 
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: transparent;
        box-shadow: 0 0 10px 2px ${(props) => props.$hoverColor};
        border-width: 2px;
    }
`;

export const LoginButton = styled(Button).attrs({
    $hoverColor: 'rgba(46, 204, 113, 0.7)'
})`
    background-color: #2ECC71;
    color: #FFFFFF;
    border: 1px solid #2ECC71;
`;

export const RegisterButton = styled(Button).attrs({
    $hoverColor: 'rgba(52, 152, 219, 0.7)'
})`
    background-color: #3498DB;
    color: #FFFFFF;
    border: 1px solid #3498DB;
`;