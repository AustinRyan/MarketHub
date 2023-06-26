"use client"
import axios from 'axios';
import useSWR from 'swr';
const fetcher = (url: string, searchValue: string) => {
    const headers = {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
      'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
    };
  
    return axios.get(url, { headers })
      .then(response => {
        // console.log(response);
        return response.data;
      })
      .catch(error => {
        // console.error(error);
        throw new Error('Failed to fetch chart data');
      });
  
  }
  
  export default function useSearchSuggestions(searchValue: string) {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?q=${searchValue}&region=US`;
  
    const { data, error } = useSWR(searchValue ? url : null, fetcher);
    // console.log('api data: ', data)
    return {
      data: data,
      isLoading: !error && !data,
      isError: error
    };
  }
  