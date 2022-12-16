import React from "react";
import { StatusDot, StatusContainer } from "./style";

interface IStatus {
	status: string;
}
const Status = (props: IStatus) => {
	const { status } = props;
	return (
		<StatusContainer>
			{status === 'success' ? 'Готово' : 'В работе'}
			<StatusDot status={status} />
		</StatusContainer>
	);
}

export default Status;
