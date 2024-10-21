"use client";

//* Importing Components
import React, { useEffect, useState } from "react";
import SearchedResults from "@/components/Naisa/SearchedResults/SearchedResults";
import NaisaSidebar from "@/components/Naisa/NaisaSidebar/NaisaSidebar";

//* Interface
import SearchInterface from "@/interfaces/NaisaSearchInterface";

//* Importing Services
import { searchHistory } from "@/services/naisa";

const NaisaSection = () => {
  const [searchId, setSearchId] = useState<number | string>("All");
  const [newSearch, setNewSearch] = useState<boolean>(true);
  const { searchData, searchLoading, isError, isSuccess } = searchHistory(
    "All",
    0,
    50
  );

  const [allSearches, setAllSearches] = useState<SearchInterface[] | []>([]);

  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const [filteredResponse, setFilteredOption] =
    useState<SearchInterface | null>(null);

  useEffect(() => {
    if (Array.isArray(searchData)) {
      setAllSearches(searchData);
    } else {
      setAllSearches([]);
    }

    return () => {
      setSearchId("All");
      setNewSearch(true);
      setAllSearches([]);
    };
  }, [searchData]);

  // Check screen width on load and resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setShowSidebar(false);
        setIsMobile(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="naisa_section">
      <div className="app-container">
        <div className="naisa_container">
          {/* Naisa Sidebar  */}
          <NaisaSidebar
            searchData={allSearches}
            searchId={searchId}
            setSearchId={setSearchId}
            setNewSearch={setNewSearch}
            setFilteredOption={setFilteredOption}
            setShowSidebar={setShowSidebar}
            showSidebar={showSidebar}
            isMobile={isMobile}
            setIsMobile={setIsMobile}
          />

          {/* Search Result Page  */}
          <SearchedResults
            filteredResponse={filteredResponse}
            newSearch={newSearch}
            setSearchId={setSearchId}
            setFilteredOption={setFilteredOption}
            setAllSearches={setAllSearches}
            setShowSidebar={setShowSidebar}
          />
        </div>
      </div>
    </section>
  );
};

export default NaisaSection;
