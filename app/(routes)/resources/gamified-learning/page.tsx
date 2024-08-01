//* importing component
import React from "react";
import ResourcesLayout from "../resource-layout";
// import Filters from "@/components/Filters/Filters";
import ComingSoon from "@/components/ComingSoon/ComingSoon";
// import ContinueWatching from "@/components/Resources/ContinueWatching/ContinueWatching";
// import ExploreSection from "@/components/Resources/ExploreSection/ExploreSection";

//* images
import DefaultResourceImage from "@/images/common/recommendation.png";

const GamifiedLearning = () => {
  return (
    <ResourcesLayout>
      {/* <div className="resouses-title books">
        <div className="app-container">
          <h5>
            Vid<span>eos</span>
          </h5>
        </div>
      </div> */}

      {/* Filters  */}
      {/* <Filters /> */}

      {/* <ContinueWatching
        url="/resources/gamified-learning/info"
        resourceType="Gamefied"
        requestURL="resources/gamified-learning"
      />
       */}
      {/* <div className="resources-explore-section">
        <div className="app-container">
          <h5>Explore More</h5>
          <ExploreSection
            url="/resources/gamified-learning/info"
            resourceType="Gamefied"
            requestURL="resources/gamified-learning"
          />
        </div>
      </div> */}

      <ComingSoon />
    </ResourcesLayout>
  );
};

export default GamifiedLearning;
