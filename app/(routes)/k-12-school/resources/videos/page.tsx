//* importing component
import React from "react";
import K12ResourcesLayout from "../resource-layout";
import K12ContinueWatching from "@/components/Resources/ContinueWatching/K12ContinueWatching";
import K12ExploreSection from "@/components/Resources/ExploreSection/K12ExploreSection";
import type { Metadata } from "next";

//* Metadata
export const metadata: Metadata = {
  title: "Best Online Learning Videos - Educational and Story Videos",
  description: "Explore online learning videos, educational videos for students, online story videos, moral stories videos in Hindi, short learning videos, video lectures.",
};
const Videos = () => {
  return (
    <K12ResourcesLayout>
      <div className="resouses-title books">
        <div className="app-container">
          <h5>
            Vid<span>eos</span>
          </h5>
        </div>
      </div>

      <K12ContinueWatching
        url="/k-12-school/resources/videos/"
        resourceType="Videos"
        requestURL="k-12-school/resources/videos"
      />

      <K12ExploreSection
        url="/k-12-school/resources/videos"
        resourceType="Videos"
        requestURL="k-12-school/resources/videos"
      />
    </K12ResourcesLayout>
  );
};

export default Videos;
