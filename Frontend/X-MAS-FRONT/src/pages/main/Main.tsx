import React, {useEffect} from "react";
import DragAndDrop from "../../components/dragAndDrop/DragAndDrop";
import Card from "../../components/ui/card/Card";
import {AuthContext} from "../../providers/AuthProvider/AuthProvider";
import styled from "styled-components";
const Main = () => {
	const {token, username, email} = React.useContext(AuthContext);
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
					    <TableLine isEven={false}>
					    <ColumnName>Название</ColumnName>
					    <ColumnName>Дата</ColumnName>
					    <ColumnName>Статус</ColumnName>
					    <ColumnName>Вид договора</ColumnName>
					    <ColumnName>Точность</ColumnName>
					    </TableLine>
					    {//20 times


							[...Array(20)].map((e, i) => {
								return <TableLine isEven={i % 2 === 0} key={i}>
									<p>test.pdf</p>
									<p>11.12.2022</p>
									<p>Готово</p>
									<p>Договор</p>
									<p>100%</p>
									<p>?</p>
								</TableLine>
							})
							}
				    </TableContainer>
				</DocumentWrapper>
			    <DocumentLoader>
				    <Card><CardContent><Title>Анализировать</Title><DragAndDrop/><p>Только форматы pdf, doc, docx. До 25МБ</p></CardContent></Card>

			    </DocumentLoader>
			    		    </MainWrapper>
	  )
}

export default Main


const MainWrapper = styled.div`
	margin-top: 24px;
	  display: grid;
	  grid-template-columns: 2.5fr 1fr;
	  grid-gap: 44px;
	  
	  @media (max-width: 768px) {
	  		    grid-template-columns: 1fr;
	  }
`

const Title = styled.h1`
  width: 100%;
  text-align: start;
	font-size: 24px;
	  font-weight: 700;
	  
			  @media (max-width: 768px) {
			  	  		    font-size: 18px;
			  	  		    	  }
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
	  `

const ColumnName = styled.p`
  	  font-weight: 600;
	  font-size: 14px;
  
  @media (max-width: 768px) {
    	font-weight: 400;
      	  	  	  font-size: 12px;
  }
  
  @media (max-width: 480px) {
      	  	  	  font-size: 10px;
  }
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
    `

const TableLine = styled.div<{isEven: boolean}>`
  		padding: 0 16px;
  		height: 44px;
  		font-weight: 500;
  		font-size: 14px;
  		align-content: center;
  		width: 100%;
	  	display: grid;
	  	grid-template-columns: 2fr 1fr 1fr 1fr 1fr 24px;
	  	grid-gap: 8px;
	  	background-color: ${props => props.isEven ? props.theme.colors.easy : props.theme.colors.background};
  		border-radius: 8px;
	  	`

