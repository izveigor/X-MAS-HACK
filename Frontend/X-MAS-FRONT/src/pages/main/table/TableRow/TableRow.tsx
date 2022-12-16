import React from "react";
import expend from '../../../../assets/images/expend.svg';
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

interface ITableRowProps {
	id: number;
	name: string;
	datetime: string;
	status: string;
	type: string[];
	accuracy: string[];
	isEven: boolean;
}

const TableRow = (props: ITableRowProps) => {
	const {id, name, datetime, status, type, accuracy, isEven} = props;
	const [isExpend, setIsExpend] = React.useState<boolean>(false);
	const expendRef = React.useRef<HTMLImageElement>(null);
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
			<TableItem><InfoText>Дата:</InfoText><p>{normalizeDate(datetime)}</p></TableItem>
			<TableItem><InfoText>Статус:</InfoText><Status status={status}/></TableItem>
			<TableItem><InfoText>Тип документа:</InfoText><p>{type[0]}</p></TableItem>
			<TableItem><InfoText>Точность:</InfoText><p>{accuracy[0]}</p></TableItem>
			<ExpendIconWrapper onClick={expendHandler} ref={expendRef}>
				<img src={expend} alt='expend'/>
			</ExpendIconWrapper>
			{isExpend && <ExpendContent>test</ExpendContent>}
		</TableLine>
	)
}

export default TableRow;


