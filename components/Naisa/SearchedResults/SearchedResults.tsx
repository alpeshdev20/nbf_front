"use client";

//* Importing Components
import React, { useEffect, useState } from "react";
import SearchSuggestion from "@/components/Naisa/SearchSuggestion/SearchSuggestion";
import { FaArrowRight } from "react-icons/fa6";
import SearchInterface from "@/interfaces/NaisaSearchInterface";
import SearchLoader from "@/components/Naisa/SearchLoader/SearchLoader";
import { post } from "@/utils/fetch";
import { errorToast } from "@/utils/toast_helper";
import { GiHamburgerMenu } from "react-icons/gi";
import "./style.css";


//* Interface
interface SearchedResultsProps {
  filteredResponse: SearchInterface | null;
  newSearch: boolean;
  setFilteredOption: (search: SearchInterface | null) => void;
  setSearchId: (id: number | string) => void;
  setAllSearches: (search: SearchInterface[] | []) => void;
  setShowSidebar: (id: boolean) => void;
}

const SearchedResults: React.FC<SearchedResultsProps> = ({
  filteredResponse,
  newSearch,
  setFilteredOption,
  setSearchId,
  setAllSearches,
  setShowSidebar,
}) => {
  const [question, setQuestion] = useState<string>("");
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchQuery();
    }
  };

  const searchQuery = () => {
    setShowLoader(true);
    post(`${process.env.API_URL}naisa/search`, {
      question: question,
    })
      .then((data) => {
        if (data.status === 200) {
          setQuestion("");
          setFilteredOption(data?.response);
          setShowLoader(false);
          setSearchId(data?.response?.id);

          { /* @ts-ignore */}
          setAllSearches((prevSearched: SearchInterface[]): SearchInterface[] => {
              const updatedSearches: SearchInterface[] = data?.response
                ? [data.response, ...prevSearched]
                : prevSearched;
              return updatedSearches;
            }
          );

          setSearchId(data?.response?.id);
        } else {
          setQuestion("");
          setFilteredOption(null);
          // Check for API-specific error messages and display them
          const errorMessage = data?.message || "Something went wrong, please try again later.";
          errorToast(errorMessage); // Show the error message from the API or fallback message
          setShowLoader(false);
        }
      })
      .catch((error) => {
        setQuestion("");
        setFilteredOption(null);
        errorToast("something went wrong please try again later...");
        setShowLoader(false);
      });
  };
  

  useEffect(() => {
    return () => {
      setQuestion("");
    };
  }, []);

  return (
    <>
      {!showLoader && (
        <div className="naisa_search_result_page">
          <div className="naisa_search_result_container">
            {/* Search Heading  */}
            <div className="naisa_search_result_heading">
              <p
                className="naisa_hamburger"
                onClick={() => {
                  setShowSidebar(true);
                }}
              >
                <GiHamburgerMenu />
              </p>
              <p>
                N<b>AI</b>SA
              </p>
            </div>

            {/* Search Result body */}

            {filteredResponse && (
              <div className="naisa_search_result_body">
                {/* user Question  */}
                <div className="naisa_user_search_question_card">
                  <h5>USER</h5>
                  <p>{filteredResponse?.question}</p>
                </div>

                {/* Result Question  */}
                <div className="naisa_user_search_result">
                  <div className="naisa_user_search_result_text">
                    <p>
                      N<b>AI</b>SA
                    </p>
                    <p>{filteredResponse?.response}</p>
                  </div>
                  {/*  Search Suggestion */}
                  <SearchSuggestion
                    suggestions={filteredResponse?.suggestions}
                  />
                </div>
              </div>
            )}

            {!filteredResponse && newSearch && (
              <div className="naisa_search_result_body naisa-no-result">
                <h5>How can I help you today?</h5>
              </div>
            )}
          </div>
          {!filteredResponse && newSearch && (
            <div className="naisa_ask_question_container">
              <div className="ask_questions">
                <input
                  type="text"
                  placeholder="Ask Naisa"
                  onChange={(e) => setQuestion(e.target.value)}
                  value={question}
                  onKeyDown={handleKeyDown}
                />
                <div className="naisa_submit_button" onClick={searchQuery}>
                 <FaArrowRight />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {showLoader && <SearchLoader />}
    </>
  );
};

export default SearchedResults;
