import React from "react";
import expend from '../../../../assets/images/expend.svg';
import {ICard} from "../../../../service/interfaces/ICard";
import cutFileName from "../../../../service/scripts/cutFileName";
import normalizeDate from "../../../../service/scripts/normalizeDate";
import Status from "../status/Status";
import {
	InfoText,
	TableItem,
	TableLine
} from "../style";
import {
	ExpendContent,
	ExpendIconWrapper
} from "./style";


const TableRow = (props: ICard) => {
	const {name, date, status, types, score, keyWords} = props;
	const [isExpend, setIsExpend] = React.useState<boolean>(false);
	const expendRef = React.useRef<HTMLImageElement>(null);
	const maxAccuracy = Math.max(...score);
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
			<TableItem><InfoText>Дата:</InfoText><p>{normalizeDate(normalizeDate(date))}</p></TableItem>
			<TableItem><InfoText>Статус:</InfoText><Status status={status}/></TableItem>
			<TableItem><InfoText>Тип документа:</InfoText><p>{types[0]}</p></TableItem>
			<TableItem><InfoText>Точность:</InfoText><p>{maxAccuracy}</p></TableItem>
			<ExpendIconWrapper onClick={expendHandler} ref={expendRef}>
				<img src={expend} alt='expend'/>
			</ExpendIconWrapper>
			{isExpend && <ExpendContent>{keyWords.map((item, index) => <p key={index}>{item}</p>)}</ExpendContent>}
		</TableLine>
	)
}

export default TableRow;


