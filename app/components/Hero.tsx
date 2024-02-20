import React from "react";
import getGainers from "../../lib/getGainers";
import getLosers from "../../lib/getLosers";
import getMarketNews from "../../lib/getMarketNews";
import getTrendingTickers from "../../lib/getTrendingTickers";
import getCryptoNews from "../../lib/getCryptoNews";
import Search from "./Search";
import Image from "next/image";
import Link from "next/link";
import BugNotification from "./BugNotification";

type Mover = {
	name: string;
	ticker: string;
	percentNetChange: number;
};
type NewsItem = {
	previewUrl?: string | undefined;
	id: string;
	contentType: string;
	title: string;
	pubDate: string;
	thumbnail: {
		resolutions: {
			url: string;
			width: number;
			height: number;
			tag: string;
		}[];
	};
	clickThroughUrl?: {
		url?: string;
	};
	provider: {
		displayName: string;
	};
	finance: {
		stockTickers:
			| {
					symbol: string;
			  }[]
			| null;
	};
};
type CryptoNewsItem = {
	HEADLINE: string;
	news_link: string;
	last_updated: string;
	news_provider_name: string;
	news_summary?: string;
	BODY?: string;
};

type CryptoNewsResponse = {
	data: {
		screen_data: {
			news: CryptoNewsItem[];
		};
	};
};
const gainersData: Promise<Mover[]> = getGainers();
const losersData: Promise<Mover[]> = getLosers();

const renderMainSection = async () => {
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
};
async function renderTrendingAndNews(gainer: Mover[], loser: Mover[]) {
	return (
		<div className="grid grid-cols-2 gap-4 mb-4">
			<div className="flex flex-col items-center justify-center rounded bg-base-100 min-h-28 dark:bg-gray-800 p-2">
				<p className="text-2xl font-bold font-mono text-gray-500  ">
					Top Gainers 🔥
				</p>
				<div className=" w-full">{await renderTables(gainer, false)}</div>
				<hr className="border-t w-full border-gray-500" />
			</div>

			<div className="flex flex-col items-center justify-center rounded bg-base-100 min-h-28 dark:bg-gray-800 p-2">
				<p className="text-2xl font-bold font-mono text-gray-500 ">
					Top Losers 🥶
				</p>

				<div className=" w-full">{await renderTables(loser, true)}</div>
				<hr className="border-t w-full border-gray-500" />
			</div>

			<div className="flex justify-center rounded bg-base-100 h-60 dark:bg-gray-800 flex-grow min-h-screen  ">
				<div className="w-full ">
					<p className="text-2xl font-bold font-mono text-gray-500 mb-2  text-center p-2">
						Market News
					</p>
					{await renderNews()}
				</div>
			</div>

			<div className="flex justify-center rounded bg-base-100 h-60 dark:bg-gray-800 flex-grow min-h-screen">
				<div className="w-full">
					<p className="text-2xl font-bold font-mono text-gray-500 mb-2  text-center p-2">
						Crypto News
					</p>
					{await renderCryptoNews()}
				</div>
			</div>
		</div>
	);
}

async function renderCryptoNews() {
	const _cryptoNews = getCryptoNews();
	const cryptoNews = await _cryptoNews;
	// console.log(cryptoNews.data[0].screen_data.news[0].HEADLINE);
	// console.log(cryptoNews.data[0].screen_data.news[0].news_provider_name);
	// console.log(cryptoNews.data[0].screen_data.news[0].news_link);

	return (
		<div className="grid grid-cols-1 gap-4 bg-base-100 ">
			{cryptoNews.data[0].screen_data.news.map(
				(item: CryptoNewsItem, index: number) => (
					<div
						key={index}
						className="bg-base-300  p-4 rounded shadow "
					>
						<a
							href={
								item.news_link
									? item.news_link
									: 'url not available, please visit "https://www.bing.com/news/search?q=crypto&FORM=HDRSC6"'
							}
							target="_blank"
							className="text-blue-500 hover:text-blue-700 font-semibold"
						>
							<h3 className="text-xl mb-2">{item.HEADLINE}</h3>
						</a>

						<p className="text-sm text-gray-500">
							Provider: {item.news_provider_name}
						</p>
						<p className="text-sm text-gray-500">
							Last Updated: {item.last_updated}
						</p>
					</div>
				)
			)}{" "}
		</div>
	);
}

async function renderTables(data: Mover[], isLoser: boolean) {
	const hotOrColdEmoji = isLoser ? "🥶" : "🔥";
	return (
		<div className="overflow-x-auto w-full py-4">
			<table className="table w-full">
				{/* head */}
				<thead>
					<tr className="hover">
						<th>Ticker</th>
						<th>Name</th>
						<th>Percent Change</th>
					</tr>
				</thead>
				<tbody>
					{(await data).map((movers, index) => (
						<tr
							key={index}
							className="hover"
						>
							<td className="cursor-pointer">
								<Link href={`/stocks/${movers.ticker}`}>{movers.ticker}</Link>
							</td>
							<td className="cursor-pointer">
								<Link href={`/stocks/${movers.ticker}`}>{movers.name}</Link>
							</td>
							<td>
								{movers.percentNetChange.toFixed(2)}% {hotOrColdEmoji}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

async function renderNews() {
	const _marketNews = getMarketNews();
	const marketNews = await _marketNews;
	const news: NewsItem[] =
		marketNews.data.main.stream.map((_news: any) => _news.content) || [];
	return (
		<div className="grid grid-cols-1 gap-4 bg-base-100 ">
			{news.map((item: NewsItem, index: number) => (
				<div
					key={index}
					className="bg-base-300 dark:bg-gray-800 p-4 rounded shadow "
				>
					<a
						href={
							item.clickThroughUrl ? item.clickThroughUrl.url : item.previewUrl
						}
						target="_blank"
						className="text-blue-500 hover:text-blue-700 font-semibold"
					>
						<h3 className="text-xl mb-2">{item.title}</h3>
					</a>

					<p className="text-sm text-gray-500">Published: {item.pubDate}</p>
					<p className="text-sm text-gray-500">
						Provider: {item.provider.displayName}
					</p>
					<p className="text-sm text-gray-500">
						Stock Tickers:{" "}
						{item.finance.stockTickers
							?.map((ticker) => ticker.symbol)
							.join(", ") || "N/A"}
					</p>
				</div>
			))}
		</div>
	);
}
export default async function Hero() {
	const [gainers, losers] = await Promise.all([gainersData, losersData]);

	return (
		<>
			<BugNotification />
			<div className="min-h-screen bg-base-100">
				<div className="px-10 ">
					<div className="p-4  rounded-lg dark:border-gray-700">
						{renderMainSection()}
						<hr className="border-t  w-full border-gray-500" />

						{await renderTrendingAndNews(gainers, losers)}
					</div>
				</div>
			</div>
		</>
	);
}
