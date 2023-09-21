import React from "react";
import getMarketNews from "../../lib/getMarketNews";

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

export default async function RenderNews(): Promise<JSX.Element> {
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
