import React from "react";
import getCryptoNews from "../../lib/getCryptoNews";

type CryptoNewsItem = {
	HEADLINE: string;
	news_link: string;
	last_updated: string;
	news_provider_name: string;
	news_summary?: string;
	BODY?: string;
};

export default async function renderCryptoNews() {
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
