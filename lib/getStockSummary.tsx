import Bottleneck from "bottleneck";

const limiter = new Bottleneck({
	minTime: 1000, // Adjust this value according to the API's rate limit
});

const cache: any = {};

export default async function getStockSummary(ticker: string) {
	const cachedData = cache[ticker];
	const currentTime = Date.now();

	// Serve cached data if available and not expired
	if (cachedData && currentTime - cachedData.timestamp < 60 * 1000) {
		return cachedData.data;
	}

	try {
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
					revalidate: 60,
				},
			};

			const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=${ticker}&region=US`;

			return fetch(url, options).then((res) => {
				if (!res.ok) throw new Error(res.statusText);
				return res.json().then((data) => {
					// Store the fetched data in the cache with a timestamp
					cache[ticker] = { data, timestamp: currentTime };
					return data;
				});
			});
		});
	} catch (error) {
		// Handle the error, possibly by logging it and rethrowing it
		console.error("Error fetching stock summary", error);
		throw error;
	}
}
