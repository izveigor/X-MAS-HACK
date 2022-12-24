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

	const testCards =
		{
			keyWords: ['Купля-продажа', 'Поставка', 'Договор аренды'],
			name: "afgeggrsg.docx",
			date: "2021-03-12T12:00:00",
			status: "wait",
			types: ['Купля-продажа', 'Поставка', 'Договор аренды'],
			score: [0.5, 0.1, 0.2],
		} as ICard;

	const getDocuments = () => {
		fetch('/documents?page=1', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': "Token " + token,
			},
		}).then(response => response.json())
			.then(data => {
					console.log(data)
					setCards(data)
				}
			)
			.catch(logout)
	}

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
					{
						[...Array(5)].map((e, i) => <TableRow key={i} name={testCards.name} date={testCards.date}
						                                      status={testCards.status} types={testCards.types}
						                                      score={testCards.score} keyWords={testCards.keyWords}/>)
					}
					{cards && cards.map((card, i) => {
						return (
							<TableRow key={i} name={card.name}
							          date={card.date}
							          status={card.status} types={card.types} score={card.score}
							          keyWords={card.keyWords}/>
						)
					})}
				</TableContainer>
				<PaginationContainer>
					<Pagination size={'default'} total={100} showSizeChanger={false} defaultCurrent={1}/>
				</PaginationContainer>
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





