import {Pagination} from "antd";
import React from "react";
import DragAndDrop from "../../components/dragAndDrop/DragAndDrop";
import Card from "../../components/ui/card/Card";
import {AuthContext} from "../../providers/AuthProvider/AuthProvider";
import {ICard} from "../../service/interfaces/ICard";
import {
	CardContent,
	ColumnName,
	DocumentLoader,
	DocumentWrapper,
	LegendTableLine,
	MainWrapper,
	PaginationContainer,
	TableContainer,
	Title
} from './style'
import TableRow from "./table/TableRow/TableRow";


const MainPage = () => {
	const {token, logout} = React.useContext(AuthContext);
	const [cards, setCards] = React.useState<ICard[] | null>(null);
	const [currentPage, setCurrentPage] = React.useState(1);

	const getDocuments = () => {
		fetch('http://localhost:1337/api/documents?page=' + currentPage, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': "Token " + token,
			},
		}).then(response => {
				if (response.status === 401) {
					return logout();
				} else {
					return response.json();
				}
			})
			.then(data => {
					setCards(data)
				}
			)
			.catch(() => {
				console.log("fetch err")
			})
	}

	React.useEffect(() => {
		getDocuments();
	}, [currentPage])

	React.useEffect(() => {
		getDocuments();
	}, [])

	//if not logged in, redirect to login page
	React.useEffect(() => {
		if (!token) {
			logout();
		}
	}, [token])

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
					{/* {
						[...Array(5)].map((e, i) => <TableRow key={i} name={testCards.name} date={testCards.date}
						                                      status={testCards.status} types={testCards.types}
						                                      score={testCards.score} keyWords={testCards.keyWords}/>)
					} */}
					{cards ? cards.map((card, index) => <TableRow key={index} name={card.name} date={card.time}
											                                              status={card.status} types={card.types}
											                                              scores={card.scores} key_phrases={card.key_phrases}/>) : <p>Нет документов</p>}
					
				</TableContainer>
				{(Boolean(cards) || currentPage !== 1) && <PaginationContainer>
					<Pagination defaultCurrent={1} total={1000000000} onChange={(page: number) => setCurrentPage(page)} showSizeChanger={false}/>
				</PaginationContainer>}
			</DocumentWrapper>
			<DocumentLoader>
				<Card>
					<CardContent>
						<Title>Анализировать</Title>
						<DragAndDrop updateDocument={getDocuments}/>
					</CardContent>
				</Card>
			</DocumentLoader>
		</MainWrapper>
	)
}

export default MainPage









