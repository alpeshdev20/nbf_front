//* importing component
import React from "react";
import ResourcesLayout from "../resource-layout";
import ContinueWatching from "@/components/Resources/ContinueWatching/ContinueWatching";
import ExploreSection from "@/components/Resources/ExploreSection/ExploreSection";

const Videos = () => {
  return (
    <ResourcesLayout>
      <div className="resouses-title books">
        <div className="app-container">
          <h5>
            Vid<span>eos</span>
          </h5>
        </div>
      </div>

      <ContinueWatching
        url="/resources/videos/info"
        resourceType="Videos"
        requestURL="resources/videos"
      />

      <ExploreSection
        url="/resources/videos/info"
        resourceType="Videos"
        requestURL="resources/videos"
      />
    </ResourcesLayout>
  );
};

export default Videos;
