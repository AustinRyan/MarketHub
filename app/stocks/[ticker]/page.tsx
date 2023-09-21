import type { Metadata } from "next";
import getStockSummary from "@/lib/getStockSummary";
import WatchlistButton from "./components/WatchlistButton";
import RenderMainSection from "./components/RenderMainSection";

type Params = {
	params: {
		ticker: string;
	};
};

export async function generateMetadata({
	params: { ticker },
}: Params): Promise<Metadata> {
	// Note that we can make multiple api calls here and in the default export function,
	// Next 13 will deduplicate all duplicated calls
	const _stockData = await getStockSummary(ticker);
	const stockData = await _stockData;

	return {
		title: `${stockData.price.shortName} (${stockData.price.symbol})`,
		description: `Individual analysis of ${stockData.price.shortName} (${stockData.price.symbol})`,
	};
}

export default async function Stock({ params: { ticker } }: Params) {
	//duplicated api call because nextjs will deduplicate
	const _stockData = await getStockSummary(ticker);
	const stockData = await _stockData;
	const isPositiveChange = stockData.price.regularMarketChangePercent.raw > 0;

	return (
		<>
			{/* <TopNavbar /> */}

			<div className="min-h-screen bg-base-100  ">
				<div className="px-10 ">
					<div className="p-4 ">
						<div className="flex flex-col  items-start justify-center rounded  min-h-28 dark:bg-gray-800 p-2 ">
							<h1 className="text-2xl text-black-400 dark:text-gray-500 font-extrabold  ">
								{stockData.price.shortName} ({ticker.toUpperCase()})
							</h1>
							<WatchlistButton
								ticker={ticker.toUpperCase()}
								fullName={stockData.price.shortName}
							/>
							<br />

							<div className="flex items-center">
								<p className="text-2xl text-black-400 dark:text-gray-500  ">
									{stockData.price.regularMarketPrice.fmt}
								</p>

								<p
									className={`text-2xl ml-2 ${
										isPositiveChange ? "text-green-500" : "text-red-500"
									}`}
								>
									({stockData.price.regularMarketChangePercent.fmt})
								</p>
							</div>
							<p className="text-md text-black-400 dark:text-gray-500 ">
								Last Updated:{" "}
								{new Date().toLocaleString("en-US", {
									year: "numeric",
									month: "long",
									day: "numeric",
									hour: "2-digit",
									minute: "2-digit",
									second: "2-digit",
									hour12: true,
								})}
							</p>
						</div>
						{/* Main Component with Overfiew, Financials, Statistics, and Graphs here  */}
						{await (<RenderMainSection ticker={ticker} />)}
					</div>
				</div>
			</div>
		</>
	);
}
