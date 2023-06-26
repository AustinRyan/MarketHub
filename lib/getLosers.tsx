const url = "https://ms-finance.p.rapidapi.com/market/v2/get-movers";
let rapidApiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY;
if (!rapidApiKey) {
	throw new Error("Missing RAPIDAPI_KEY environment variable");
}

const options: RequestInit = {
	method: "GET",
	headers: {
		"content-type": "application/json",
		"X-RapidAPI-Key": rapidApiKey,
		"X-RapidAPI-Host": "ms-finance.p.rapidapi.com",
	},
	next: {
		revalidate: 60,
	},
};

export default async function getLosers() {
	const res = await fetch(url, options);
	if (!res.ok) throw new Error("Failed to fetch losers");
	const json = await res.json();
	return json.losers;
}
