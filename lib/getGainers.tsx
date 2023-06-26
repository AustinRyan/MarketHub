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
	//TODO uncomment this before deploying. Keep commented now to avoid hitting the API limit
	next: {
		revalidate: 60,
	},
};

export default async function getGainers() {
	const res = await fetch(url, options);
	if (!res.ok) throw new Error("Failed to fetch gainers");
	const json = await res.json();
	return json.gainers;
}
