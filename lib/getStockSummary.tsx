import Bottleneck from "bottleneck";

// Create a new limiter that allows 1 request per 1000ms (1 second)
const limiter = new Bottleneck({
	minTime: 1000,
});

export default async function getStockSummary(ticker: string) {
	return limiter.schedule(() => {
		let rapidApiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY;
		if (!rapidApiKey) {
			throw new Error("Missing RAPIDAPI_KEY environment variable");
		}

		const options = {
			method: "GET",
			params: {
				symbol: ticker,
				region: "US",
			},
			headers: {
				"content-type": "application/json",
				"X-RapidAPI-Key": rapidApiKey,
				"X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
			},
			next: {
				revalidate: 0,
			},
		};

		const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=${ticker}&region=US`;

		return fetch(url, options).then((res) => {
			if (!res.ok) throw new Error(res.statusText);
			return res.json();
		});
	});
}
