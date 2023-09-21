import getStockSummary from "@/lib/getStockSummary";
import getNews from "@/lib/getNews";
type Article = {
	article_title: string;
	article_url: string;
	article_photo_url: string;
	source: string;
	post_time_utc: string;
};

type Params = {
	ticker: string;
};
export default async function RenderStockNews({ ticker }: Params) {
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
}
