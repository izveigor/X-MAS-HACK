import React from "react";
import {
	StatusContainer,
	StatusDot
} from "./style";

interface IStatus {
	status: string;
}

const Status = (props: IStatus) => {
	const {status} = props;
	return (
		<StatusContainer>
			{status === 'Готово' ? 'Готово' : 'В работе'}
			<StatusDot status={status}/>
		</StatusContainer>
	);
}

export default Status;
