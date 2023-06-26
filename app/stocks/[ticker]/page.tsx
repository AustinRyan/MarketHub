import type { Metadata } from "next";
import getStockSummary from "@/lib/getStockSummary";
import getChartData from "@/lib/getChartData";
import StockGraph from "./components/StockGraph";

import getNews from "@/lib/getNews";
import Image from "next/image";
import TopNavbar from "@/app/components/TopNavbar";

type Params = {
	params: {
		ticker: string;
	};
};
type Article = {
	article_title: string;
	article_url: string;
	article_photo_url: string;
	source: string;
	post_time_utc: string;
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
const renderAnayticsAndData = async (ticker: string) => {
	const _stockData = await getStockSummary(ticker);
	const stockData = await _stockData;

	return (
		<div className="grid sm:grid-cols-1 md:grid-cols-2 grid-rows-auto gap-4 p-3 w-1/3 border-r-2 border-black">
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Market Cap</span>
				<span className="font-bold">
					{stockData.price.marketCap.fmt
						? stockData.price.marketCap.fmt
						: "N/A"}
				</span>
			</div>
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Revenue (ttm)</span>
				<span className="font-bold">
					{stockData?.financialData?.totalRevenue?.fmt
						? stockData.financialData.totalRevenue.fmt
						: "N/A"}
				</span>
			</div>
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Net Income (ttm)</span>
				<span className="font-bold">
					{stockData.defaultKeyStatistics.netIncomeToCommon.fmt
						? stockData.defaultKeyStatistics.netIncomeToCommon.fmt
						: "N/A"}
				</span>
			</div>
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Shares Out</span>
				<span className="font-bold">
					{stockData.defaultKeyStatistics.sharesOutstanding.fmt
						? stockData.defaultKeyStatistics.sharesOutstanding.fmt
						: "N/A"}{" "}
				</span>
			</div>
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>EPS (ttm)</span>
				<span className="font-bold">
					{stockData.defaultKeyStatistics.trailingEps.fmt
						? stockData.defaultKeyStatistics.trailingEps.fmt
						: "N/A"}
				</span>
			</div>
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Ebitda Margins</span>
				<span className="font-bold">
					{stockData.financialData.ebitdaMargins.fmt
						? stockData.financialData.ebitdaMargins.fmt
						: "N/A"}
				</span>
			</div>
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Profit Margins</span>
				<span className="font-bold">
					{stockData.financialData.profitMargins.fmt
						? stockData.financialData.profitMargins.fmt
						: "N/A"}
				</span>
			</div>
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Operating Cash flow</span>
				<span className="font-bold">
					{stockData.financialData.operatingCashflow.fmt
						? stockData.financialData.operatingCashflow.fmt
						: "N/A"}
				</span>
			</div>
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Gross Profits</span>
				<span className="font-bold">
					{stockData.financialData.grossProfits.fmt
						? stockData.financialData.grossProfits.fmt
						: "N/A"}
				</span>
			</div>
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Debt To Equity</span>
				<span className="font-bold">
					{stockData.financialData.debtToEquity.fmt
						? stockData.financialData.debtToEquity.fmt
						: "N/A"}
				</span>
			</div>
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Open</span>
				<span className="font-bold">
					{stockData.price.regularMarketOpen.fmt
						? stockData.price.regularMarketOpen.fmt
						: "N/A"}
				</span>
			</div>
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Previous Close</span>
				<span className="font-bold">
					{stockData.summaryDetail.previousClose.fmt
						? stockData.summaryDetail.previousClose.fmt
						: "N/A"}
				</span>
			</div>
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Target Low Price</span>
				<span className="font-bold">
					{stockData.financialData.targetLowPrice.fmt
						? stockData.financialData.targetLowPrice.fmt
						: "N/A"}
				</span>
			</div>

			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Target Median Price</span>
				<span className="font-bold">
					{stockData.financialData.targetMedianPrice.fmt
						? stockData.financialData.targetMedianPrice.fmt
						: "N/A"}
				</span>
			</div>
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Beta</span>
				<span className="font-bold">
					{stockData.summaryDetail.beta.fmt
						? stockData.summaryDetail.beta.fmt
						: "N/A"}
				</span>
			</div>
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Total Cash</span>
				<span className="font-bold">
					{stockData.financialData.totalCash.fmt
						? stockData.financialData.totalCash.fmt
						: "N/A"}
				</span>
			</div>
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Total Debt</span>
				<span className="font-bold">
					{stockData.financialData.totalDebt.fmt
						? stockData.financialData.totalDebt.fmt
						: "N/A"}
				</span>
			</div>
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Total Revenue</span>
				<span className=" font-bold">
					{stockData.financialData.totalRevenue.fmt
						? stockData.financialData.totalRevenue.fmt
						: "N/A"}
				</span>
			</div>
		</div>
	);
};
// export chart to seperate file to do use client to make it a client component
// and keeps everything else on the page a server side component
async function renderChart(ticker: string) {
	return (
		<div className="w-2/3">
			<StockGraph ticker={ticker} />
		</div>
	);
}

const renderNews = async (ticker: string) => {
	const _stockData = await getStockSummary(ticker);
	const _stockNews = await getNews(ticker);
	const stockData = await _stockData;
	const stockNews = await _stockNews;
	const {
		city,
		state,
		country,
		address1,
		address2,
		zip,
		phone,
		fax,
		website,
		sector,
		industry,
		fullTimeEmployees,
		longBusinessSummary,
	} = stockData.summaryProfile;
	const newsList = stockNews?.data?.news?.map(
		(article: Article, index: number) => {
			return (
				<div
					className="article  p-8"
					key={index}
				>
					<h3 className="font-bold">{article.article_title}</h3>
					<p>
						<a
							href={article.article_url}
							target="_blank"
							className="text-blue-500 hover:text-blue-700 font-semibold"
						>
							[Read more]
						</a>
					</p>
					{/* <p>
						<Image
							src={article.article_photo_url}
							alt={article.article_title}
							width={200}
							height={200}
						/>
					</p> */}
					<p>Source: {article.source}</p>
					<p>Date: {article.post_time_utc}</p>
					<div className="border-b border-gray-400"></div>
				</div>
			);
		}
	);

	return (
		<>
			<div className="w-7/12 h-full flex place-items-center justify-left top-auto">
				<div className="tabs justify-center items-start">
					<a className="tab tab-active tab-lg font-bold text-3xl w-full p-4">
						{ticker} News:
					</a>

					<div className="font-mono text-lg">
						{newsList && newsList.length > 0 ? (
							newsList
						) : (
							<>
								<br />
								<div className="text-center p-4 font-bold">
									<p>No news available for {ticker}</p>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
			<div className=" border-gray-600 border-l-2 w-5/12 p-4 items-center">
				<h1 className="font-semibold text-3xl mb-4">About {ticker}</h1>
				<p className="font-mono text-lg">
					<strong className="font-bold">Sector:</strong>{" "}
					{sector ? sector : "N/A"}
					<br />
					<strong className="font-bold">Industry:</strong>{" "}
					{industry ? industry : "N/A"}
					<br />
					<strong className="font-bold">Full-time Employees:</strong>{" "}
					{fullTimeEmployees ? fullTimeEmployees : "N/A"}
					<br />
					<strong className="font-bold">Headquarters:</strong>{" "}
					{city ? city : "City N/A"}, {state ? state : "State N/A"}, {country}
					<br />
					<strong className="font-bold">Address:</strong>{" "}
					{address1 ? address1 : "N/A"}, {address2 ? address2 : "N/A"}, {zip}
					<br />
					<strong className="font-bold">Phone:</strong> {phone ? phone : "N/A"}
					<br />
					<strong className="font-bold">Fax:</strong> {fax ? fax : "N/A"}
					<br />
					<strong className="font-bold">Website:</strong>{" "}
					<a
						href={website}
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-500 hover:text-blue-700"
					>
						{website ? website : "N/A"}
					</a>
					<br />
					<strong className="font-bold">Business Summary:</strong>{" "}
					{longBusinessSummary ? longBusinessSummary : "N/A"}
				</p>
			</div>
		</>
	);
};

const renderMainSection = async (ticker: string) => {
	return (
		<div className="flex flex-col items-start text-center justify-top rounded bg-gray-50 min-h-screen dark:bg-gray-800 p-2 ">
			<div className=" p-2 font-bold ">
				<p className="text-center ">Overview</p>
			</div>

			<div className=" z-10 w-full flex flex-row border-t-2 border-black">
				{await renderAnayticsAndData(ticker)}
				{await renderChart(ticker)}
			</div>
			{/* News Section Below */}
			<div className="flex flex-row w-full border-t-2 border-black">
				{await renderNews(ticker.toUpperCase())}
			</div>
		</div>
	);
};

export default async function Stock({ params: { ticker } }: Params) {
	//duplicated api call because nextjs will deduplicate
	const _stockData = await getStockSummary(ticker);
	const stockData = await _stockData;
	const isPositiveChange = stockData.price.regularMarketChangePercent.raw > 0;

	return (
		<>
			<TopNavbar />

			<div className="min-h-screen bg-gray-50  ">
				<div className="px-10 ">
					<div className="p-4 ">
						<div className="flex flex-col  items-start justify-center rounded  min-h-28 dark:bg-gray-800 p-2 ">
							<h1 className="text-2xl text-black-400 dark:text-gray-500 font-extrabold  ">
								{stockData.price.shortName} ({ticker.toUpperCase()})
							</h1>

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
						{await renderMainSection(ticker)}
					</div>
				</div>
			</div>
		</>
	);
}
