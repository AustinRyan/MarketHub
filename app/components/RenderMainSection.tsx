import React from "react";
import getTrendingTickers from "../../lib/getTrendingTickers";
import Search from "./Search";
import Link from "next/link";

type CryptoNewsItem = {
	HEADLINE: string;
	news_link: string;
	last_updated: string;
	news_provider_name: string;
	news_summary?: string;
	BODY?: string;
};

export default async function RenderMainSection() {
	const _trending = getTrendingTickers();
	const trending = await _trending;
	//take the first 5 trending tickers
	const trendingTickers = trending.finance.result[0].quotes.slice(0, 5);
	return (
		<div className="grid grid-col gap-4 mb-4 min-h-1/2">
			<div className="flex items-center justify-center rounded bg-base-100 ">
				<div className="hero">
					<div className="hero-content text-center">
						<div className=" max-w-lg ">
							<h1 className="text-5xl font-bold">
								Search for a stock to start your analysis
							</h1>
							<p className="py-6">
								Accurate information on 6000+ stocks, including all the
								companies in the S&P500 index. See stock prices, news,
								financials, forecasts, charts and more
							</p>
							<Search />
							Trending:{" "}
							<div className="inline-flex">
								{trendingTickers.map(
									(ticker: { symbol: string }, index: number) => (
										<React.Fragment key={index}>
											<Link href={`/stocks/${ticker.symbol}`}>
												<p className="text-blue-500 underline">
													{ticker.symbol}
												</p>
											</Link>
											{index < trendingTickers.length - 1 && (
												<span className="mx-1">, </span>
											)}{" "}
										</React.Fragment>
									)
								)}
							</div>
						</div>
					</div>
				</div>{" "}
			</div>
		</div>
	);
}
