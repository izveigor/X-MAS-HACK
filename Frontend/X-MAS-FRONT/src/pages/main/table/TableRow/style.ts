import styled from "styled-components";

const ExpendIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  transition: ${props => props.theme.transition.transition};
`;

const ExpendContent = styled.div`
  display: flex;
  height: 123px;
  //занять всю строку grid
  grid-column: 1 / -1;
  transition: ${props => props.theme.transition.transition};
`
export {
	ExpendIconWrapper,
	ExpendContent
};
