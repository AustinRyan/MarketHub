

export default async function getChartData(ticker: string) {
	let rapidApiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY;
	if (!rapidApiKey) {
		throw new Error("Missing RAPIDAPI_KEY environment variable");
	}

	const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart?interval=1mo&symbol=${ticker}&range=5y&region=US&includePrePost=false&useYfid=true&includeAdjustedClose=true&events=capitalGain%2Cdiv%2Csplit`;
	const options: RequestInit  = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': rapidApiKey,
			'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
		},
		next: {
			revalidate: 60
		},
	};

	const res = await fetch(url, options);
	if (!res.ok) throw new Error("Failed to fetch chart data");
	console.log('res', res);
	return await res.json();
	
}
