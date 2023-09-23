import limiter from "./apiLimiter";

const cache: any = {};

export default async function getStockSummary(ticker: string): Promise<any> {
	const currentTime = Date.now();
	const cachedData = cache[ticker];

	// If data is in cache and not expired, return cached data
	if (cachedData && currentTime - cachedData.timestamp < 60 * 1000) {
		console.log(`Cache hit for ${ticker} at ${new Date(currentTime).toISOString()}`);
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
				headers: {
					"content-type": "application/json",
					"X-RapidAPI-Key": rapidApiKey,
					"X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
				},
			};

			const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=${ticker}&region=US`;

			const res = await fetch(url, options);

			console.log(`API call for ${ticker} at ${new Date(currentTime).toISOString()}`);
			
			if (res.status === 429) {
				// Implement retry logic with exponential backoff
				console.warn('429 error, retrying with backoff...');
				await new Promise(res => setTimeout(res, 2000)); // Example: wait for 2 seconds before retrying
				return getStockSummary(ticker); // Retry the same function
			}

			if (!res.ok) {
				throw new Error(`Failed to fetch stock summary for ${ticker}. Status: ${res.status}`);
			}

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
