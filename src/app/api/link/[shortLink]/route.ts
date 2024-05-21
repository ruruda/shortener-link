import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ResponseUser } from '@/models/response';
import { withAccelerate } from '@prisma/extension-accelerate';

export async function GET(request: Request, { params }: { params: { shortLink: string } }) {
	try {
		const { shortLink } = params;
		const link = await prisma.link.findFirst({
			cacheStrategy: { swr: 60, ttl: 60 },
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
