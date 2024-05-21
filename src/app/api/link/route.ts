import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ResponseUser } from '@/models/response';
import { generateShortLink } from '@/lib/generateShortLink';
import { withAccelerate } from '@prisma/extension-accelerate';

export async function POST(request: Request) {
	try {
		const { url } = await request.json();
		if (!url) return NextResponse.json(ResponseUser(false, 'Please enter a valid URL', null));

		const existingLongLink = await prisma.link.findFirst({
			cacheStrategy: { swr: 60, ttl: 60 },
			where: {
				longLink: url,
			},
		});
		if (existingLongLink)
			return NextResponse.json(
				ResponseUser(true, 'Link fetched successfully', existingLongLink)
			);

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
