import styled from 'styled-components';

const StyledMobileMenuButton = styled.button`
  display: none;
  color: ${props => props.theme.textSecondary};
  padding: 0.5rem;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

export default StyledMobileMenuButton;