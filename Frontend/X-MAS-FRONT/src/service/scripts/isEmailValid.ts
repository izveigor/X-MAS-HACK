const isEmailValid = (email: string) => {
	return String(email)
		.toLowerCase()
		.match(
			/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
		);
};

export default isEmailValid;

