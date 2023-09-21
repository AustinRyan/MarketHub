import limiter from "./apiLimiter";

export default async function getMarketNews() {
	try {
		return await limiter.schedule(async () => {
			let rapidApiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY;
			if (!rapidApiKey) {
				throw new Error("Missing RAPIDAPI_KEY environment variable");
			}

			const options = {
				method: "POST",
				headers: {
					"content-type": "text/plain",
					"X-RapidAPI-Key": rapidApiKey,
					"X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
				},
				body: "",
				next: {
					revalidate: 60,
				},
			};

			const url =
				"https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/v2/list?region=US&snippetCount=10";

			const res = await fetch(url, options);

			if (!res.ok) {
				throw new Error(
					`Failed to fetch market news. Status: ${res.status}, URL: ${res.url}`
				);
			}

			return await res.json();
		});
	} catch (error) {
		console.error("Error fetching market news:", error);
		throw error;
	}
}
