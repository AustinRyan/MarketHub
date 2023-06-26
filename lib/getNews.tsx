export default async function getStockSummary(ticker: string) {
	let rapidApiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY;
	if (!rapidApiKey) {
		throw new Error("Missing RAPIDAPI_KEY environment variable");
	}

	const url = `https://real-time-finance-data.p.rapidapi.com/stock-news?symbol=${ticker}&language=en`;
	const options = {
		method: "GET",
		headers: {
			"content-type": "application/json",
			"X-RapidAPI-Key": rapidApiKey,
			"X-RapidAPI-Host": "real-time-finance-data.p.rapidapi.com",
		},
	};
	const res = await fetch(url, options);
	// console.log(res);
	if (!res.ok) throw new Error("Failed to fetch stock news");
	return await res.json();
}
