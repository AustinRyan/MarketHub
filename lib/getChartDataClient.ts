'use client'
import axios from 'axios';
import useSWR from 'swr';
import Bottleneck from "bottleneck";

// Create a new limiter that allows 1 request per 1000ms (1 second)
const limiter = new Bottleneck({
	minTime: 2000,
});

const fetcherWithHeaders = (headers: any) => (url: string) => 
  limiter.schedule(() => axios.get(url, { headers })
  .then(response => response.data)
  .catch(error => {
    console.error(error);  
    throw new Error('Failed to fetch chart data');
  }));

export default function useChartData(ticker: string, interval: string, range: string) {
  const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart?interval=${interval}&symbol=${ticker}&range=${range}&region=US&includePrePost=false&useYfid=true&includeAdjustedClose=true&events=capitalGain%2Cdiv%2Csplit`;
  
  const headers = {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
    'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
  };
  
  const { data, error } = useSWR(url, fetcherWithHeaders(headers));
  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}
