//* Importing Components
import { useQuery } from "@tanstack/react-query";
import { get } from "@/utils/fetch";

//* Interfaces
import HashReads from "@/interfaces/HasReadsInterface";

//* Is book Read
export function isResourceRead(id: string) {
  const {
    data: responseData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: [`users-stats/is-book-read/${id}`],
    queryFn: () => get(`${process.env.API_URL}users-stats/is-book-read/${id}`),
  });

  const isRead: HashReads = responseData?.response ?? [];
  return { isRead, isLoading, isError, isSuccess };
}
