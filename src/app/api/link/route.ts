import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ResponseUser } from '@/models/response';
import { generateShortLink } from '@/lib/generateShortLink';

export async function POST(request: Request) {
	try {
		const { url } = await request.json();
		if (!url) return NextResponse.json(ResponseUser(false, 'Please enter a valid URL', null));

		const shortUrl = generateShortLink(url);
		const newLink = await prisma.link.create({
			data: {
				longLink: url,
				shortLink: shortUrl,
			},
		});
		return NextResponse.json(ResponseUser(true, 'Link fetched successfully', newLink));
	} catch (error: any) {
		console.log('Error in POST /api/link: ', error.message);
		return NextResponse.json(ResponseUser(false, 'Something went wrong', null));
	}
}
