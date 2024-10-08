
import { useQuery } from '@tanstack/react-query';
import { get } from "@/utils/fetch"; // Your utility to make API requests

// Interface for Blogs
import BlogsInterface from "@/interfaces/blogs";

// Get Blogs
export function useGetBlogs(start: number, limit: number, url: string) {
  const {
    data: responseData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: [`blogs`, start, limit],
    queryFn: () =>
      get(`${process.env.API_URL}${url}/${start}/${limit}`),
  });

  const blogData: BlogsInterface[] = responseData?.response ?? [];

  return { blogData, isLoading, isError, isSuccess };
}

export function useGetBlogBySlug(slug: string) {
  const { data: responseData, isLoading, isError } = useQuery<{
    status: number;
    message: string;
    response: BlogsInterface[];
  }, Error>({
    queryKey: [`blog`, slug],
    queryFn: () => get(`${process.env.API_URL}blog/${slug}`),
  });

  // Extract the blog data
  const blogData: BlogsInterface | null = responseData?.response?.[0] ?? null;
  console.log("blogData" ,blogData);
  return { blogData, isLoading, isError };
}
