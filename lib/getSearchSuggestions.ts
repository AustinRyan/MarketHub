"use client"
import axios from 'axios';
import useSWR from 'swr';
import limiter from './apiLimiter'; 

const fetcherWithLimiter = (url: string, searchValue: string) => {
    const headers = {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
        'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
    };
  
    return limiter.schedule(() => axios.get(url, { headers })
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching search suggestions:', error); 
            throw new Error('Failed to fetch search suggestions');
        })
    );
}

export default function useSearchSuggestions(searchValue: string) {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?q=${searchValue}&region=US`;
  
    const { data, error } = useSWR(searchValue ? url : null, (url) => fetcherWithLimiter(url, searchValue));
    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    };
}
