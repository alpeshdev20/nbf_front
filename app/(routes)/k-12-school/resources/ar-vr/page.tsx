//* importing component
import React from "react";
import ResourcesLayout from "../resource-layout";
// import Filters from "@/components/Filters/Filters";
// import ContinueWatching from "@/components/Resources/ContinueWatching/ContinueWatching";
// import ExploreSection from "@/components/Resources/ExploreSection/ExploreSection";
import ComingSoon from "@/components/ComingSoon/ComingSoon";
import { Metadata } from "next";

//* Metadata
export const metadata: Metadata = {
  title: "AR/VR Resources for K-12 Schools: Transforming Learning",
  description: "Discover cutting-edge AR/VR resources for K-12 schools with NetbookFlix. Enhance classroom learning with immersive and interactive technologies.",
};
const ArVr = () => {
  return (
    <ResourcesLayout h1Info="AR VR | Netbookflix">
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
