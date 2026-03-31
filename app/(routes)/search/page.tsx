import { Metadata } from "next";
import SearchPage from "./SearchPage";

//* Metadata
export const metadata: Metadata = {
  title: "Search NetbookFlix: Find Educational Content and Resources",
  description: "Use the NetbookFlix search feature to quickly find the educational tools, resources, or content you need for enhanced learning.",
};
const Search = () => {
 
  return (
    <>
       <SearchPage />
    </>
  );
};

export default Search;
