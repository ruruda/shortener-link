import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const urlAsli = req.nextUrl.searchParams.get('urlAsli');
	const waktuSaatIni = new Date().getMilliseconds().toString();
	const randomString = makeid(15);

	if (!urlAsli) {
		return NextResponse.json('url kosong');
	}

	let randomUrl = urlAsli + waktuSaatIni + randomString;
	let subRandomUrl = getRandomSubstring(randomUrl, 6)
	return NextResponse.json({ randomUrl, subRandomUrl });
}

// const simpleHash = (str: string, length: number) => {
// 	let hash = 0;
// 	for (let i = 0; i < length; i++) {
// 		const char = str.charCodeAt(i);
// 		hash = (hash << 5) - hash + char;
// 	}
// 	// Convert to 32bit unsigned integer in base 36 and pad with "0" to ensure length is 7.
// 	return (hash >>> 0).toString(36).padStart(5, '0');
// };

function makeid(length: number) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	return result;
}

function getRandomSubstring(str: string, length: number) {
	const start = Math.floor(Math.random() * (str.length - length + 1));
	return str.substring(start, start + length);
}
