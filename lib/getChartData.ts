import limiter from './apiLimiter'; 

export default async function getChartData(ticker: string) {
    try {
        return await limiter.schedule(async () => {
            let rapidApiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY;
            if (!rapidApiKey) {
                throw new Error("Missing RAPIDAPI_KEY environment variable");
            }
        
            const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart?interval=1mo&symbol=${ticker}&range=5y&region=US&includePrePost=false&useYfid=true&includeAdjustedClose=true&events=capitalGain%2Cdiv%2Csplit`;
            const options: RequestInit = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': rapidApiKey,
                    'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
                },
            };
        
            const res = await fetch(url, options);
            if (!res.ok) {
                throw new Error(`Failed to fetch chart data: ${res.statusText}`);
            }
        
            return await res.json();
        });
    } catch (error) {
        console.error('Error fetching chart data:', error); 
        throw error; 
    }
}
