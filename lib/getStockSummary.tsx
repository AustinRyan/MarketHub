import limiter from "./apiLimiter";

const cache: any = {};
const maxRetries = 5; // Maximum number of retries
const delayFactor = 2; // Delay factor for exponential backoff

export default async function getStockSummary(ticker: string): Promise<any> {
	const currentTime = Date.now();
	const cachedData = cache[ticker];

	if (cachedData && currentTime - cachedData.timestamp < 60 * 1000) {
		console.log(
			`Cache hit for ${ticker} at ${new Date(currentTime).toISOString()}`
		);
		return cachedData.data;
	}

	let retries = 0;
	while (retries < maxRetries) {
		try {
			const data = await limiter.schedule(async () => {
				let rapidApiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY;
				if (!rapidApiKey)
					throw new Error("Missing RAPIDAPI_KEY environment variable");

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

				if (!res.ok)
					throw new Error(
						`Failed to fetch stock summary for ${ticker}. Status: ${res.status}`
					);
				return await res.json();
			});

			cache[ticker] = { data, timestamp: currentTime };
			return data;
		} catch (error: any) {
			if (error.status === 429 && retries < maxRetries) {
				retries++;
				const delay = Math.pow(delayFactor, retries) * 1000; // Exponential backoff
				console.error(`429 error, retrying with backoff... Delay: ${delay} ms`);
				await new Promise((res) => setTimeout(res, delay)); // Wait before retrying
			} else {
				console.error(`Error fetching stock summary for ${ticker}:`, error);
				throw error;
			}
		}
	}

	throw new Error(
		`Failed to fetch stock summary for ${ticker} after ${maxRetries} retries.`
	);
}
