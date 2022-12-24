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
  min-height: 123px;
  height: min-content;
  //занять всю строку grid
  grid-column: 1 / -1;
  transition: ${props => props.theme.transition.transition};
`

const CategoriesContainer = styled.div`
  display: flex;
  gap: 4px;
  padding: 16px 0;
  //height gap 4px
  height: fit-content;
  width: 100%;
  justify-content: start;
  //если не помещается в строку, переносить на следующую
  flex-wrap: wrap;
`

const ScoreContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 200px;
  width: 100%;
  padding: 16px 0;
  height: 24px;
`

export {
	ExpendIconWrapper,
	ExpendContent,
	CategoriesContainer,
	ScoreContainer
};
