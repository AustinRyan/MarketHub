export default async function getMarketNews() {
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
	};

	const url =
		"https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/v2/list?region=US&snippetCount=10";

	const res = await fetch(url, options);

	if (!res.ok) {
		throw new Error(
			`res is not ok: ${res.statusText} ${res.status} ${res.url}`
		);
	}

	const data = await res.json(); // Read the response body here and store it in 'data' variable
	// console.log(data);
	return data; // Return the parsed data directly
}
