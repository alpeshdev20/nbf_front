//* Importing Components
import { useQuery } from "@tanstack/react-query";
import { get } from "@/utils/fetch";

//* interface
interface CmsInterface {
  page_name: string;
  content: string;
}

//* Get FAQS
export function getFaqs() {
  const {
    data: responseData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["faqs"],
    queryFn: () => get(`${process.env.API_URL}faqs`),
    // staleTime: 60000 * 60,
  });

  const cmsData: CmsInterface = responseData?.response ?? null;
  return { cmsData, isLoading, isError, isSuccess };
}

//* Get Privacy policy
export function getPrivacyPolicy() {
  const {
    data: responseData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["privacy-policies"],
    queryFn: () => get(`${process.env.API_URL}privacy-policies`),
    // staleTime: 60000 * 60,
  });

  const cmsData: CmsInterface = responseData?.response ?? null;
  return { cmsData, isLoading, isError, isSuccess };
}

//* Get Terms & Conditions
export function getTermsAndConditions() {
  const {
    data: responseData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["terms-conditions"],
    queryFn: () => get(`${process.env.API_URL}terms-conditions`),
    // staleTime: 60000 * 60,
  });

  const cmsData: CmsInterface = responseData?.response ?? null;
  return { cmsData, isLoading, isError, isSuccess };
}
