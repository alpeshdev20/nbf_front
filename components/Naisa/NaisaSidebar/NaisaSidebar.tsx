//* Importing Components
import React, { useEffect } from "react";
import renderText from "@/utils/renderText";

//* Interface
import SearchInterface from "@/interfaces/NaisaSearchInterface";

//* Icons
import { FaEdit } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";

//* interface
interface NaisaSidebarProps {
  searchData: SearchInterface[];
  searchId: number | string;
  showSidebar: boolean;
  isMobile: boolean;
  setSearchId: (id: number | string) => void;
  setNewSearch: (id: boolean) => void;
  setFilteredOption: (search: SearchInterface | null) => void;
  setShowSidebar: (id: boolean) => void;
  setIsMobile: (id: boolean) => void;
}

const NaisaSidebar: React.FC<NaisaSidebarProps> = ({
  searchData,
  searchId,
  setSearchId,
  setNewSearch,
  setFilteredOption,
  showSidebar,
  setShowSidebar,
  isMobile,
  setIsMobile,
}) => {
  useEffect(() => {
    if (searchId !== "All" && Array.isArray(searchData)) {
      const filteredData = searchData.find((item) => item.id === searchId);
      setFilteredOption(filteredData ?? null);
    }
  }, [searchId]);

  return (
    <div
      className={showSidebar ? "naisa_sidebar show_sidebar" : "naisa_sidebar"}
    >
      {/* New Chat  */}
      <div className="new_chat_button_container">
        <div
          className="new_chat_button"
          onClick={() => {
            setNewSearch(true);
            setFilteredOption(null);
            setSearchId("All");
            if (isMobile) {
              setShowSidebar(false);
            }
          }}
        >
          <p>New Chat</p> <FaEdit />
        </div>

        <div
          className="naisa_sidebar_mobile_controls"
          onClick={() => {
            setShowSidebar(false);
          }}
        >
          <p>
            <FaTimes />
          </p>
        </div>
      </div>

      {/* Search Container  */}
      <div className="naisa_search_history_container">
        <h5>SEARCHED TOPICS</h5>

        {/* Search History  */}
        <div className="naisa_search_history">
          {searchData.length !== 0 &&
            searchData.map((data, index) => {
              return (
                <div
                  className={
                    searchId === data.id
                      ? "naisa_search_card naisa_active_search"
                      : "naisa_search_card"
                  }
                  key={data.id}
                  onClick={() => {
                    setSearchId(data.id);
                    setNewSearch(false);
                    if (isMobile) {
                      setShowSidebar(false);
                    }
                  }}
                >
                  <p>{renderText(data.question, 30)}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default NaisaSidebar;
