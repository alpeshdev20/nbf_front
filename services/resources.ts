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
export function getResourcesInfo(id: string) {
  const {
    data: responseData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: [`resource-info/${id}`],
    queryFn: () => get(`${process.env.API_URL}resources/info/${id}`),
    // staleTime: 60000 * 60,
  });

  const resourceInfo: ResourcesInterface = responseData?.response ?? null;
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
