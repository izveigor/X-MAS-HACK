import styled from "styled-components";

const TableLine = styled.div<{ isEven: boolean }>`
  padding: 8px 16px;
  font-weight: 500;
  font-size: 14px;
  height: auto;
  align-content: center;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 128px 72px 128px 64px 24px;
  grid-gap: 8px;
  background-color: ${props => props.isEven ? props.theme.colors.easy : props.theme.colors.background};
  border-radius: 8px;
  transition: ${props => props.theme.transition.transition};

  :hover {
    background-color: ${props => props.theme.colors.blue};
  }
`

export {TableLine}
