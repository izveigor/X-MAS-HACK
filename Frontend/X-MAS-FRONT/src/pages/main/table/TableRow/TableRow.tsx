import React from "react";
import expend from '../../../../assets/images/expend.svg';
import RoundSelection from "../../../../components/roundSelection/RoundSelection";
import {ICard} from "../../../../service/interfaces/ICard";
import cutFileName from "../../../../service/scripts/cutFileName";
import Status from "../status/Status";
import {
	InfoText,
	TableItem,
	TableLine
} from "../style";
import {
	CategoriesContainer,
	ExpendContent,
	ExpendIconWrapper,
	ScoreContainer
} from "./style";


const TableRow = (props: ICard) => {
	const {name, date, status, types, scores, key_phrases} = props;
	const isReady = status == "Готово";
	const [isExpend, setIsExpend] = React.useState<boolean>(false);
	const expendRef = React.useRef<HTMLImageElement>(null);
	const maxAccuracy = isReady ? Math.max(...scores) : "-";
	const expendHandler = () => {
		//change expend state
		setIsExpend((prev) => !prev);
		//rotate icon if expend
		if (expendRef.current) {
			if (isExpend) {
				expendRef.current.style.transform = 'rotate(0deg)';
			}
			else {
				expendRef.current.style.transform = 'rotate(180deg)';
			}
		}
	}


	return (
		<TableLine>
			<TableItem><InfoText>Название:</InfoText><p>{cutFileName(name)}</p></TableItem>
			<TableItem><InfoText>Дата:</InfoText><p>{date}</p></TableItem>
			<TableItem><InfoText>Статус:</InfoText><Status status={status}/></TableItem>
			<TableItem><InfoText>Тип документа:</InfoText><p>{types[0] || '-'}</p></TableItem>
			<TableItem><InfoText>Точность:</InfoText><p>{maxAccuracy}</p></TableItem>
			{isReady && <><ExpendIconWrapper onClick={expendHandler} ref={expendRef}>
				<img src={expend} alt='expend'/>
			</ExpendIconWrapper>
			{Boolean(isExpend) &&
				<ExpendContent>
			{/*//вывод катгория - вероятность*/}
			{types.map((type, index) => {
				return (
				<ScoreContainer key={index}>
				<p>{type}</p>
				<RoundSelection title={scores[index].toString()}/>
				</ScoreContainer>
				)
			})}
				<h5>Ключевые фразы:</h5>
				<CategoriesContainer>{key_phrases.map((item, index) => <RoundSelection
				title={item}/>)}</CategoriesContainer>
				</ExpendContent>}</>}
		</TableLine>
	)
}

export default TableRow;


