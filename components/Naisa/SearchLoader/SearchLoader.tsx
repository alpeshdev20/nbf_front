"use client";

//* Importing components
import React from "react";
import Skeleton from "react-loading-skeleton";
import { GiHamburgerMenu } from "react-icons/gi";

//* importing Css
import "react-loading-skeleton/dist/skeleton.css";

const SearchLoader = () => {
  return (
    <div className="naisa_search_result_page naisa_search_result_page_skeleton">
      <div className="naisa_search_result_container">
        {/* Search Heading  */}
        <div className="naisa_search_result_heading naisa_search_result_heading_skeleton ">
          <p className="naisa_hamburger">
            <GiHamburgerMenu />
          </p>
          <p>
            N<b>AI</b>SA
          </p>
        </div>

        {/* Search Result body */}

        <div className="naisa_search_result_body">
          {/* user Question  */}
          <div className="naisa_user_search_question_card naisa_user_search_question_card_skeleton">
            <Skeleton />
            <Skeleton />
          </div>

          {/* Result Question  */}
          <div className="naisa_user_search_result naisa_user_search_result_skeleton">
            <Skeleton height={200} />

            {/*  Search Suggestion */}
            {/* <div className="search_result_resource_suggestion">
              <Skeleton height={100} />
              <Skeleton height={100} />
              <Skeleton height={100} />
              <Skeleton height={100} />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchLoader;
