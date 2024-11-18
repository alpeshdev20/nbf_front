//* importing component
import React from "react";
import ResourcesLayout from "../resource-layout";
// import Filters from "@/components/Filters/Filters";
// import ContinueWatching from "@/components/Resources/ContinueWatching/ContinueWatching";
// import ExploreSection from "@/components/Resources/ExploreSection/ExploreSection";
import ComingSoon from "@/components/ComingSoon/ComingSoon";

const ArVr = () => {
  return (
    <ResourcesLayout>
      {/* <div className="resouses-title books">
        <div className="app-container">
          <h5>
            Ar<span>Vr</span>
          </h5>
        </div>
      </div> */}

      {/* Filters  */}
      {/* <Filters /> */}

      {/* <ContinueWatching
        url="/resources/ar-vr/info"
        resourceType="Ar/Vr"
        requestURL="resources/ar-vr"
      />

      <div className="resources-explore-section">
        <div className="app-container">
          <h5>Explore More</h5>
          <ExploreSection
            url="/resources/ar-vr/info"
            resourceType="Ar/Vr"
            requestURL="resources/ar-vr"
          />
        </div>
      </div> */}

      <ComingSoon />
    </ResourcesLayout>
  );
};

export default ArVr;
