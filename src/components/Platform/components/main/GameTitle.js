import styled from 'styled-components';

const StyledGameTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text};
`;

export default StyledGameTitle;