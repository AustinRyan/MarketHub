const url = 'https://investing-cryptocurrency-markets.p.rapidapi.com/coins/get-news?pair_ID=1057391&page=1&time_utc_offset=28800&lang_ID=1';
let rapidApiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY;
if (!rapidApiKey) {
	throw new Error("Missing RAPIDAPI_KEY environment variable");
  }

const options: RequestInit  = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': rapidApiKey,
		'X-RapidAPI-Host': 'investing-cryptocurrency-markets.p.rapidapi.com'
	},
	next: {
		revalidate: 60
	},
};


export default async function getCryptoNews() {
	const res = await fetch(url, options);
	if (!res.ok) throw new Error("Failed to fetch crypto news");
	return await res.json();
	
}
