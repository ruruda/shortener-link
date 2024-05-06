import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const urlAsli = req.nextUrl.searchParams.get('urlAsli');
	const waktuSaatIni = new Date().getTime().toString();
	const random = Math.random().toString();

	if (!urlAsli) {
		return NextResponse.json('url kosong');
	}

	const join = urlAsli.concat(waktuSaatIni, random);
	const result = simpleHash(join, 5);

	return NextResponse.json({
		result,
	});
}

const simpleHash = (str: string, length: number) => {
	let hash = 0;
	for (let i = 0; i < length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
	}
	// Convert to 32bit unsigned integer in base 36 and pad with "0" to ensure length is 7.
	return (hash >>> 0).toString(36).padStart(5, '0');
};
