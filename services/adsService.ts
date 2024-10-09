// services/adsService.js

import { useQuery } from '@tanstack/react-query';
import { get } from "@/utils/fetch"; // Your utility to make API requests

// Interface for Ads
import AdsInterface from "@/interfaces/ads"; // Define your AdsInterface

export function useGetAds() {
  const {
    data: responseData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: [`ads`],
    queryFn: () =>
      get(`${process.env.API_URL}ads/`), // Adjust the URL according to your API
  });

  // Assuming the response is an array of ads directly
  const adsData: AdsInterface[] = responseData ?? []; // Adjusted to handle direct array response

  return { adsData, isLoading, isError, isSuccess };
}
