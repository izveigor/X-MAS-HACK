const normalizeDate = (date: string) => {
	const year = date.slice(0, 4);
	const month = date.slice(5, 7);
	const day = date.slice(8, 10);
	const time = date.slice(11, 16);
	return day + '.' + month + '.' + year + ' ' + time;
}

export default normalizeDate;