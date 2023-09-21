import limiter from "./apiLimiter";

const cache: any = {};

export default async function getStockSummary(ticker: string) {
	const currentTime = Date.now();
	const cachedData = cache[ticker];

	// Serve cached data if available and not expired manually
	if (cachedData && currentTime - cachedData.timestamp < 60 * 1000) {
		return cachedData.data;
	}

	try {
		return await limiter.schedule(async () => {
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

			const res = await fetch(url, options);

			if (!res.ok)
				throw new Error(
					`Failed to fetch stock summary for ${ticker}. Status: ${res.status}`
				);

			const data = await res.json();

			// Store the fetched data in the cache with a timestamp
			cache[ticker] = { data, timestamp: currentTime };

			return data;
		});
	} catch (error) {
		console.error(`Error fetching stock summary for ${ticker}:`, error);
		throw error;
	}
}
