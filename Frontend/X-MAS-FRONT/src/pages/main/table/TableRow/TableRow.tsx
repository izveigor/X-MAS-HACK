import React from "react";
import expend from '../../../../assets/images/expend.svg';
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
	const cutName = (name: string) => {
		if (name.length > 32) {
			const format = name.slice(name.lastIndexOf('.'));
			const cutName = name.slice(0, 28);
			return cutName + '...' + format;
		}
		return name;
	}

	//normalize date to 10.10.2012 13:14

	const normalizeDate = (date: string) => {
		const year = date.slice(0, 4);
		const month = date.slice(5, 7);
		const day = date.slice(8, 10);
		const time = date.slice(11, 16);
		return day + '.' + month + '.' + year + ' ' + time;
	}

	return (
		<TableLine isEven={isEven}>
			<p>{cutName(name)}</p>
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


