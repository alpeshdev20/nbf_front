//* Importing Components
import { useQuery } from "@tanstack/react-query";
import { get } from "@/utils/fetch";
import CategoriesInterface from "@/interfaces/Categories";
import AgeGroupsInterface from "@/interfaces/AgeGroups";
import genresInterface from "@/interfaces/Genres";

//* interface
interface ClassesInterface {
  id: number;
  class_name: string;
}

//* Get Classes
export function getClasses() {
  const { data: responseData } = useQuery({
    queryKey: ["classes"],
    queryFn: () => get(`${process.env.API_URL}get-classes`),
  });

  const classesData: ClassesInterface[] = responseData?.response ?? [];
  return { classesData };
}

//* Get Age Groups
export function getAgeGroups() {
  const {
    data: responseData,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["age-groups"],
    queryFn: () => get(`${process.env.API_URL}age-groups`),
  });

  const ageGroupData: AgeGroupsInterface[] = responseData?.response ?? [];
  return { ageGroupData, isSuccess, isLoading };
}

//* Get Resource Categories
export function getResourceCategories() {
  const {
    data: responseData,
    isLoading,
    isSuccess: categorySuccess,
  } = useQuery({
    queryKey: ["resource-categories"],
    queryFn: () => get(`${process.env.API_URL}resource-categories`),
  });

  const categoriesData: CategoriesInterface[] = responseData?.response ?? [];
  return { categoriesData, categorySuccess, isLoading };
}

//* Get Genres
export function getGenres() {
  const {
    data: responseData,
    isLoading,
    isSuccess: genreSuccess,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: () => get(`${process.env.API_URL}genres`),
  });

  const genresData: genresInterface[] = responseData?.response ?? [];
  return { genresData, genreSuccess, isLoading };
}
