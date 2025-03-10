//* Importing Components
import { useQuery } from "@tanstack/react-query";
import { get } from "@/utils/fetch";

//* interface
import ResourcesInterface from "@/interfaces/Resources";
import ResourceEpisodesInterface from "@/interfaces/ResourceEpisodes";

//* Get Resources
export function getResources(
  start: number,
  limit: number,
  url: string,
  genre: number,
  age: number
) {
  const {
    data: responseData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: [`${url}/${start}/${limit}/${genre}/${age}`],
    queryFn: () =>
      get(`${process.env.API_URL}${url}/${start}/${limit}/${genre}/${age}`),
    // staleTime: 60000 * 60,
  });

  const resourceData: ResourcesInterface[] = responseData?.response ?? [];
  return { resourceData, isLoading, isError, isSuccess };
}

//* Get Resources Info
export function getResourcesInfo(slug: string) {
  const {
    data: responseData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: [`resource-info/${slug}`],
    queryFn: () => get(`${process.env.API_URL}resources/${slug}`),
    // staleTime: 60000 * 60,
  });

  const resourceInfo: ResourcesInterface = responseData?.response ?? null;
  return { resourceInfo, isLoading, isError, isSuccess };
}

//get meta info 
export async function getResourcesMetaInfo(slug: string) {
  let isLoading = true;
  let isError = false;
  let isSuccess = false;
  let resourceInfo: ResourcesInterface | null = null;

  try {
    const response = await fetch(`${process.env.API_URL}resources/${slug}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-API-Key": process.env.API_KEY ?? "",
        Authorization: `Basic ${Buffer.from(
          `${process.env.AUTH_USER}:${process.env.AUTH_PASSWORD}`
        ).toString("base64")}`,
      },
    });
    const responseData = await response.json();
    resourceInfo = responseData?.response ?? null; // Ensure it matches the expected format

    isSuccess = true;
  } catch (error) {
    isError = true;
  } finally {
    isLoading = false;
    console.log("Resource info fetch complete. Loading:", isLoading, "Success:", isSuccess); // Log loading status
  }

  return { resourceInfo, isLoading, isError, isSuccess };
}




 
//* Get Related Resources
export function getRelatedResources(id: string) {
  const {
    data: responseData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: [`related-resources/${id}`],
    queryFn: () =>
      get(`${process.env.API_URL}resources/related-resources/${id}`),
    // staleTime: 60000 * 60,
  });

  const relatedResources: ResourcesInterface[] = responseData?.response ?? [];
  return { relatedResources, isLoading, isError, isSuccess };
}

//* Get Resource Episodes
export function getResourceEpisodes(id: string) {
  const {
    data: responseData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: [`resource-episodes/${id}`],
    queryFn: () =>
      get(`${process.env.API_URL}resources/resource-episodes/${id}`),
    // staleTime: 60000 * 60,
  });

  const resourceEpisodes: ResourceEpisodesInterface[] =
    responseData?.response ?? [];
  return { resourceEpisodes, isLoading, isError, isSuccess };
}

//* Get Users Wishlists
export function getUsersWishlists() {
  const {
    data: responseData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: [`user/wishlists`],
    queryFn: () => get(`${process.env.API_URL}user/wishlists`),
  });

  const wishlistsData: ResourcesInterface[] = responseData?.response ?? [];
  return { wishlistsData, isLoading, isError, isSuccess };
}

//* Get Users Library
export function getUsersLibrary() {
  const {
    data: responseData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: [`user/library`],
    queryFn: () => get(`${process.env.API_URL}user/library`),
  });

  const libraryData: ResourcesInterface[] = responseData?.response ?? [];
  return { libraryData, isLoading, isError, isSuccess };
}

//* Search Resources
export function getSearchData(
  key: string,
  category: number,
  ageGrouup: number
) {
  const {
    data: responseData,
    isLoading,
    isError,
    isSuccess: searchSuccess,
  } = useQuery({
    queryKey: [`resources/search/${key}/${category}/${ageGrouup}`],
    queryFn: () =>
      get(
        `${process.env.API_URL}resources/search/${key}/${category}/${ageGrouup}`
      ),
    enabled: key.length >= 3,
  });

  const searchData: ResourcesInterface[] = responseData?.response ?? [];
  return { searchData, isLoading, isError, searchSuccess };
}

export function getPlans() {
  const {
    data: responseData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: [`subscription-plans`],
    queryFn: () => get(`${process.env.API_URL}subscription-plans`),
  });

  const planData: Plan[] = responseData?.response ?? [];
  return { planData, isLoading, isError, isSuccess };
}
