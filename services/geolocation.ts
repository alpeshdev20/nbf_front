// utils/geolocationService.ts
import { useQuery } from "@tanstack/react-query";
import { get } from "@/utils/fetch";

export interface GeolocationData {
  country: string;
  city: string;
}

interface GeolocationHookResult {
  geoData: GeolocationData;
  geoSuccess: boolean;
  geoLoading: boolean;
}

export function useGeolocation(ip: string): GeolocationHookResult {
  const {
    data: responseData,
    isLoading: geoLoading,
    isSuccess: geoSuccess,
  } = useQuery<GeolocationData>({
    queryKey: [`location/${ip}`],
    queryFn: () => get(`${process.env.API_URL}http://ip-api.com/json/${ip}`),
  });

  const geoData: GeolocationData = responseData ?? { country: "", city: "" };

  return { geoData, geoSuccess, geoLoading };
}
