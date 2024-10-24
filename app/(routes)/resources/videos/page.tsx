//* importing component
import React from "react";
import ResourcesLayout from "../resource-layout";
import ContinueWatching from "@/components/Resources/ContinueWatching/ContinueWatching";
import ExploreSection from "@/components/Resources/ExploreSection/ExploreSection";
import type { Metadata } from "next";

//* Metadata
export const metadata: Metadata = {
  title: "Best Online Learning Videos - Educational and Story Videos",
  description: "Explore online learning videos, educational videos for students, online story videos, moral stories videos in Hindi, short learning videos, video lectures.",
};
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
        url="/resources/videos/"
        resourceType="Videos"
        requestURL="resources/videos"
      />

      <ExploreSection
        url="/resources/videos"
        resourceType="Videos"
        requestURL="resources/videos"
      />
    </ResourcesLayout>
  );
};

export default Videos;
