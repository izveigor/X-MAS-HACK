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
  align-self: center;
`;

const ExpendContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: start;
  justify-content: center;
  height: 123px;
  //занять всю строку grid
  grid-column: 1 / -1;
  transition: ${props => props.theme.transition.transition};
`

const CategoriesContainer = styled.div`
	  display: flex;
	  gap: 8px;
	  padding: 16px 0;
	  height: fit-content;
		width: 100%;
  		justify-content: start;
  //если не помещается в строку, переносить на следующую
  flex-wrap: wrap;
  
`

export {
	ExpendIconWrapper,
	ExpendContent,
	CategoriesContainer
};
