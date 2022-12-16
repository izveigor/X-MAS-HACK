import styled from "styled-components";
import {TableLine} from "./table/style";

const MainWrapper = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  grid-gap: 44px;

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column-reverse;
  }
`

const LegendTableLine = styled(TableLine)`
  @media (max-width: 776px) {
    display: none;
  }
`

const FileNamesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 24px;
  gap: 8px;
`

const PaginationContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 24px;
`

const Title = styled.h1`
  width: 100%;
  text-align: start;
  font-size: 24px;
  font-weight: 700;

`

const DocumentLoader = styled.div`
  width: 100%;
  height: min-content;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
`

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 24px;
  box-sizing: border-box;
  position: relative;
`

const ColumnName = styled.p`
  font-weight: 600;
  font-size: 14px;

`

const DocumentWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
`

const TableContainer = styled.div`
  padding-top: 32px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  //each even row has different background color
  & > div:nth-child(2n) {
    background-color: ${({theme}) => theme.colors.easy};
  }
`

export {
	MainWrapper,
	LegendTableLine,
	FileNamesContainer,
	PaginationContainer,
	Title,
	DocumentLoader,
	CardContent,
	ColumnName,
	DocumentWrapper,
	TableContainer
}
