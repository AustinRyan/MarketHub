import prisma from "../../../lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		// Get the user's email
		const email = request.headers.get("User-Email");

		if (!email) {
			return new NextResponse("Missing email", { status: 400 });
		}

		// Find the user with email
		const user = await prisma.user.findUnique({
			where: { email: email },
		});

		if (!user) {
			return new NextResponse("User not found", { status: 404 });
		}

		// Get the stocks associated with the user
		const stocks = await prisma.stock.findMany({
			where: { userId: user.id },
		});

		// console.log("Email: ", email);
		// console.log("User: ", user);
		// console.log("Stocks: ", stocks);

		return NextResponse.json(stocks);
	} catch (error) {
		console.error("Error in watchlist route:", error);
		return new NextResponse("Internal server error", { status: 500 });
	}
}
