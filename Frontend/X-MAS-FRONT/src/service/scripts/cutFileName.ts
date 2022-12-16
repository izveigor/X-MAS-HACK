const cutFileName = (name: string) => {
	if (name.length > 32) {
		const format = name.slice(name.lastIndexOf('.'));
		const cutName = name.slice(0, 28);
		return cutName + '...' + format;
	}
	return name;
}

export default cutFileName;
