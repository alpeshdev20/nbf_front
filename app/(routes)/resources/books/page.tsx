//* importing component
import React from "react";
import ResourcesLayout from "../resource-layout";
import ContinueWatching from "@/components/Resources/ContinueWatching/ContinueWatching";
import ExploreSection from "@/components/Resources/ExploreSection/ExploreSection";

const Books = () => {
  return (
    <ResourcesLayout>
      <div className="resouses-title books">
        <div className="app-container">
          <h5>
            Bo<span>oks</span>
          </h5>
        </div>
      </div>

      <ContinueWatching
        url="/resources/books/info"
        resourceType="Books"
        requestURL="resources/books"
      />

      <ExploreSection
        url="/resources/books/info"
        resourceType="Books"
        requestURL="resources/books"
      />
    </ResourcesLayout>
  );
};

export default Books;
