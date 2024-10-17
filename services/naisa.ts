//* Importing Components
import { useQuery } from "@tanstack/react-query";
import { get } from "@/utils/fetch";

//* interface
import SearchInterface from "@/interfaces/NaisaSearchInterface";

//* Get Search History
export function searchHistory(
  searchId: number | string,
  start: number,
  limit: number
) {
  const {
    data: responseData,
    isLoading: searchLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ['search-naisa'],
    queryFn: () =>
      get(
        `${process.env.API_URL}naisa/get-user-history/${searchId}/${start}/${limit}`
      ),
  });

  const searchData: SearchInterface = responseData?.response ?? null;
  return { searchData, searchLoading, isError, isSuccess };
}
