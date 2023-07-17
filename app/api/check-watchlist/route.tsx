import prisma from "../../../lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		const email = request.headers.get("User-Email");
		const ticker = request.headers.get("Ticker");

		if (!email || !ticker) {
			return new NextResponse("Missing email or ticker", { status: 400 });
		}

		// Check if the user's watchlist contains the stock.
		const inWatchlist =
			(await prisma.stock.findFirst({
				where: {
					email: email,
					ticker: ticker,
				},
			})) !== null;

		return NextResponse.json({ inWatchlist: inWatchlist });
	} catch (error) {
		console.error("Error in check-watchlist route:", error);
		return new NextResponse("Internal server error", { status: 500 });
	}
}
