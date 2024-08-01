//* Importing Components
import { useQuery } from "@tanstack/react-query";
import { get } from "@/utils/fetch";

//* interface
interface PublisherInterface {
  id: number;
  file_path: string;
  text_1: string;
  text_2: string;
  text_3: string;
}

//* Get FAQS
export function getPublisherLogos(start: number, limit: number) {
  const {
    data: responseData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: [`publishers//${start}/${limit}`],
    queryFn: () => get(`${process.env.API_URL}publishers/${start}/${limit}`),
    // staleTime: 60000 * 60,
  });

  const publisherLogo: PublisherInterface[] = responseData?.response ?? null;
  return { publisherLogo, isLoading, isError, isSuccess };
}
