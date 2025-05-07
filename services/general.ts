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

interface SubjectInterface {
  id: number;
  subject_name: string;
}

interface DepartmentInterface {
  id: number;
  department_name: string;
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


// * Get Subjects
export function getSubjects(departmentId: number) {
  return useQuery({
    queryKey: ["subjects", departmentId],
    queryFn: () =>
      get(`${process.env.API_URL}get-subjects?department_id=${departmentId}`),
    enabled: !!departmentId && departmentId !== 0, // Prevent fetching if invalid
    select: (data) => data.response as SubjectInterface[],
  });
}

// * Get Departments
export function getDepartments(genreId: number) {
  return useQuery({
    queryKey: ["departments", genreId],
    queryFn: () =>
      get(`${process.env.API_URL}get-departments?genre_id=${genreId}`),
    enabled: !!genreId && genreId !== 0, // Prevent fetching if genreId is invalid
    select: (data) => data.response as DepartmentInterface[],
  });
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

export function K12getGenres() {

  const {
    data: responseData,
    isLoading,
    isSuccess: genreSuccess,
  } = useQuery({
    queryKey: ["k12-genres"],
    queryFn: () => get(`${process.env.API_URL}k12-genres/`),
  });

  const genresData: genresInterface[] = responseData?.response ?? [];

  return { genresData, genreSuccess, isLoading };
}

