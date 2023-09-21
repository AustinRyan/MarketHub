import limiter from './apiLimiter'; 

export default async function getTrendingTickers() {
  return limiter.schedule(async () => {
    let rapidApiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY;
    if (!rapidApiKey) {
      throw new Error("Missing RAPIDAPI_KEY environment variable");
    }

    const options: RequestInit = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
      },
	  next:{
		revalidate: 60
	},
    };

    const url = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-trending-tickers?region=US';

    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`Failed to fetch trending tickers. Status: ${res.status}`);
      return await res.json();
    } catch (error) {
      console.error('Error fetching trending tickers:', error);
      throw error; 
    }
  });
}
