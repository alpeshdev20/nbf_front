import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get, post } from "@/utils/fetch"; // Your utility to make API requests

// Interface for Bookmark
import BookmarkInterface from "@/interfaces/bookmark";

// Fetch bookmarks for the authenticated user
export function useGetBookmarks() {
  const {
    data: responseData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<BookmarkInterface[]>({
    queryKey: ['bookmarks'],
    queryFn: () => get(`${process.env.API_URL}bookmarks/list`), // Adjust the URL according to your API
  });

  console.log(useGetBookmarks);
//   useGetBookmarks
  const bookmarksData: BookmarkInterface[] = responseData ?? []; // Adjusted to handle direct array response
    // const blogData: BlogsInterface | null = responseData?.response?.[0] ?? null;

  return { bookmarksData, isLoading, isError, isSuccess };
}
/*  */

