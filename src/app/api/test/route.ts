import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const urlAsli = req.nextUrl.searchParams.get('urlAsli');
	const waktuSaatIni = new Date().getTime().toString();
	const randomString = generateRandomString(15);

	if (!urlAsli) {
		return NextResponse.json('url kosong');
	}

	const randomUrl = (urlAsli + waktuSaatIni + randomString).replace(/[^\w\s]/g, '');
	const simpleUrl = generateRandomString(6, randomUrl);
	return NextResponse.json({ randomUrl, simpleUrl });
}

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

// function getRandomSubstring(str: string, length: number) {
// 	const start = Math.floor(Math.random() * (str.length - length + 1));
// 	return str.substring(start, start + length);
// }

// const simpleHash = (str: string, length: number) => {
// 	let hash = 0;
// 	for (let i = 0; i < length; i++) {
// 		const char = str.charCodeAt(i);
// 		hash = (hash << 5) - hash + char;
// 	}
// 	// Convert to 32bit unsigned integer in base 36 and pad with "0" to ensure length is 7.
// 	return (hash >>> 0).toString(36).padStart(5, '0');
// };
