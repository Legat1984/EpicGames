import styled from 'styled-components';

const H1 = styled.h1`
    text-align: center;
    color: white;
    font-size: 28px;
    margin-bottom: 15px;
`;

const Title = ({ children }) => {
    return <H1>{children}</H1>;
};

export default Title;