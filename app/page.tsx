import React from "react";
import getGainers from "../lib/getGainers";
import getLosers from "../lib/getLosers";
import BugNotification from "./components/BugNotification";
import { Inter } from "next/font/google";
import RenderTrendingAndNews from "./components/RenderTrendingAndNews";
import RenderMainSection from "./components/RenderMainSection";

type Mover = {
	name: string;
	ticker: string;
	percentNetChange: number;
};

type CryptoNewsItem = {
	HEADLINE: string;
	news_link: string;
	last_updated: string;
	news_provider_name: string;
	news_summary?: string;
	BODY?: string;
};

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
	const gainersData: Promise<Mover[]> = getGainers();
	const losersData: Promise<Mover[]> = getLosers();
	const [gainers, losers] = await Promise.all([gainersData, losersData]);

	return (
		<>
			<BugNotification />
			<div className="min-h-screen bg-base-100">
				<div className="px-10 ">
					<div className="p-4  rounded-lg dark:border-gray-700">
						{await (<RenderMainSection />)}
						<hr className="border-t  w-full border-gray-500" />

						{await (
							<RenderTrendingAndNews
								gainer={gainers}
								loser={losers}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
