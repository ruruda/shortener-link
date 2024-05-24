import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ResponseUser } from '@/models/response';

export async function GET(request: Request, { params }: { params: { shortLink: string } }) {
	try {
		const { shortLink } = params;

		const link = await prisma.link.findFirst({
			cacheStrategy: { swr: 5 * 60, ttl: 2 * 60 * 60 },
			where: {
				shortLink: shortLink,
			},
		});
		if (!link) return NextResponse.json(ResponseUser(false, 'Link not found', null));
		return NextResponse.json(ResponseUser(true, 'Link fetched successfully', link));
	} catch (error: any) {
		console.log('Error in GET /api/link/[shortlink]: ', error.message);
		return NextResponse.json(ResponseUser(false, 'Something went wrong', null));
	}
}
