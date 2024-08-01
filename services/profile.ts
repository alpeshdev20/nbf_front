//* Importing Components
import { useQuery } from "@tanstack/react-query";
import { get } from "@/utils/fetch";

//* interface
import UserInterface from "@/interfaces/UserInterface";

//* Get Resources
export function getProfile() {
  const {
    data: responseData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["user_profile"],
    queryFn: () => get(`${process.env.API_URL}user/profile`),
    // staleTime: 60000 * 60,
  });

  const profile: UserInterface = responseData?.response ?? null;
  return { profile, isLoading, isError, isSuccess };
}
