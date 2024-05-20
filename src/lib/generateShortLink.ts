export const generateShortLink = (url: string) => {
	const date = new Date().getTime().toString(15);
	const randomString = generateRandomString(15);
	const longRandomUrl = (url + date + randomString).replace(/[^\w\s]/g, '');
	const shortRandomUrl = generateRandomString(6, longRandomUrl);

	return shortRandomUrl;
};

function generateRandomString(length: number, input?: string) {
	let result = '';
	let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	if (input) {
		characters = input;
	}
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	return result;
}
