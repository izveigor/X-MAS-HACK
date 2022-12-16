import React from "react";
import expend from '../../../../assets/images/expend.svg';
import cutFileName from "../../../../service/scripts/cutFileName";
import normalizeDate from "../../../../service/scripts/normalizeDate";
import Status from "../status/Status";
import {TableLine} from "../style";
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


	//cut name to 28 symbols and add ... + file format


	//normalize date to 10.10.2012 13:14


	return (
		<TableLine isEven={isEven}>
			<p>{cutFileName(name)}</p>
			<p>{normalizeDate(datetime)}</p>
			<Status status={status}/>
			<p>{type[0]}</p>
			<p>{accuracy[0]}</p>
			<ExpendIconWrapper onClick={expendHandler} ref={expendRef}>
				<img src={expend} alt='expend'/>
			</ExpendIconWrapper>
			{isExpend && <ExpendContent>test</ExpendContent>}
		</TableLine>
	)
}

export default TableRow;


