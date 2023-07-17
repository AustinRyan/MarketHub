"use client";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

interface WatchlistButtonProps {
	ticker: string;
	fullName: string;
}

export default function WatchlistButton({
	ticker,
	fullName,
}: WatchlistButtonProps) {
	const { data: session } = useSession();
	const [inWatchlist, setInWatchlist] = useState(false);
	useEffect(() => {
		checkIfInWatchlist(ticker, session?.user.email).then((inList) =>
			setInWatchlist(inList)
		);
	}, [session, ticker]);
	const addToWatchlist = async () => {
		console.log(session);
		if (!session) {
			toast.error("Please sign in to add this stock to your watchlist.");
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
				const error = await response.text();
				throw new Error(error);
			}

			toast.success("Successfully added to watchlist");
			setInWatchlist(true);
		} catch (error: any) {
			console.error(error);
			toast.error("Error: " + error.message);
		}
	};

	async function checkIfInWatchlist(ticker: string, email: string | undefined) {
		try {
			const headers: { [key: string]: string } = {
				"Content-Type": "application/json",
				Ticker: ticker,
			};

			if (email !== undefined) {
				headers["User-Email"] = email;
			}

			const response = await fetch("/api/check-watchlist", {
				method: "GET",
				headers: headers,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			return data.inWatchlist;
		} catch (error) {
			console.error("Error checking if stock is in watchlist:", error);
			return false;
		}
	}

	return (
		<div>
			<div className="flex flex-row">
				<button
					className={inWatchlist ? "btn btn-red" : "btn"}
					onClick={addToWatchlist}
					title="Add stock to watchlist"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill={inWatchlist ? "red" : "none"}
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}
