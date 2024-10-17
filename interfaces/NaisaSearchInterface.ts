import ResourcesInterface from "@/interfaces/Resources";

interface SearchInterface {
  id: number;
  user_id: number;
  question: string;
  response: string;
  suggestions: ResourcesInterface[] | [];
}

export default SearchInterface;
