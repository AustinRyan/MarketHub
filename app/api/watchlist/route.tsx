import prisma from "../../../lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { email, ticker, name } = body;

		if (!ticker || !name) {
			return new NextResponse("Missing fields", { status: 400 });
		}

		// Check if stock is already in the user's watchlist
		const existingStock = await prisma.stock.findFirst({
			where: {
				ticker: ticker,
			},
		});

		if (existingStock) {
			return new NextResponse("Stock already in watchlist", { status: 400 });
		}

		const stock = await prisma.stock.create({
			data: {
				email,
				ticker,
				stockFullName: name,
				user: {
					connect: {
						email: email,
					},
				},
			},
		});

		return NextResponse.json(stock);
	} catch (error) {
		return new NextResponse("Internal server error", { status: 500 });
	}
}
