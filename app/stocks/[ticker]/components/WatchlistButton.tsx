"use client";
import { useSession } from "next-auth/react";
import prisma from "../../../../lib/prismadb";

interface WatchlistButtonProps {
	ticker: string;
	fullName: string;
}

export default function WatchlistButton({
	ticker,
	fullName,
}: WatchlistButtonProps) {
	const { data: session } = useSession();

	const addToWatchlist = async () => {
		console.log(session);
		if (!session) {
			// Check if the session and the user are present
			alert("Please sign in to add this stock to your watchlist.");
			return;
		}

		try {
			const response = await fetch("/api/watchlist", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: session.user.email,
					ticker,
					name: fullName,
				}),
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			alert("Successfully added to watchlist");
		} catch (error) {
			console.error(error);
			alert("Failed to add to watchlist");
		}
	};

	return (
		<div>
			<div className="flex flex-row">
				<button
					className="btn btn-ghost rounded-btn"
					onClick={addToWatchlist}
				>
					Add to Watchlist
				</button>
				<button className="btn btn-ghost rounded-btn">
					Remove from Watchlist
				</button>
			</div>
		</div>
	);
}
