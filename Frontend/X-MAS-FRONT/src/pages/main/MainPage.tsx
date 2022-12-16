import {Pagination} from "antd";
import React from "react";
import styled from "styled-components";
import DragAndDrop from "../../components/dragAndDrop/DragAndDrop";
import Card from "../../components/ui/card/Card";
import {AuthContext} from "../../providers/AuthProvider/AuthProvider";
import {TableLine} from "./table/style";
import TableRow from "./table/TableRow/TableRow";

const MainPage = () => {
	const {token, username, email} = React.useContext(AuthContext);
	const test = {
		id: Math.random(),
		name: "afgeggrsg.docx",
		datetime: "2021-01-01 12:00:00",
		status: "success",
		type: ['Купля-продажа', 'Поставка', 'Договор аренды'],
		accuracy: ['100%', '100%', '100%'],
	}
	//if not logged in, redirect to login page
	// useEffect(() => {
	// 	if(!token) {
	// 		window.location.href = '/login';
	// 	}
	// }, [token])
	return (
		<MainWrapper>
			<DocumentWrapper><Title>Документы</Title>
				<TableContainer>
					<LegendTableLine>
						<ColumnName>Название</ColumnName>
						<ColumnName>Дата</ColumnName>
						<ColumnName>Статус</ColumnName>
						<ColumnName>Вид договора</ColumnName>
						<ColumnName>Точность</ColumnName>
					</LegendTableLine>
					{//30 times
						[...Array(30)].map((e, i) => {
							return <TableRow key={i} id={i} name={Math.random().toString(36) + '.pdf'}
							                 datetime={test.datetime}
							                 status={test.status} type={test.type} accuracy={test.accuracy}
							                 isEven={i % 2 === 0}/>
						})
					}
				</TableContainer>
				<PaginationContainer>
					<Pagination size={'default'} total={100} showSizeChanger={false} defaultCurrent={1}/>
				</PaginationContainer>
			</DocumentWrapper>
			<DocumentLoader>
				<Card>
					<CardContent>
						<Title>Анализировать</Title>
						<DragAndDrop/>
				</CardContent>
				</Card>
			</DocumentLoader>
		</MainWrapper>
	)
}

export default MainPage


const MainWrapper = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  grid-gap: 44px;

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column-reverse;
  }
`

const LegendTableLine= styled(TableLine)`
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



