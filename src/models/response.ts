export const ResponseUser = (success: boolean, message: string, data: any) => {
	return {
		success,
		message,
		data,
	};
};
