//* importing component
import React from "react";
import K12ResourcesLayout from "../resource-layout";
import K12ContinueWatching from "@/components/Resources/ContinueWatching/K12ContinueWatching";
import K12ExploreSection from "@/components/Resources/ExploreSection/K12ExploreSection";
import type { Metadata } from "next";

//* Metadata
export const metadata: Metadata = {
  title: "K 12 School Videos | Educational Resources for Learning",
  description: "A Variety Of K 12 School Videos And Educational Resources For Learning At Netbookflix. Boost Classroom Engagement With Quality Video Content.",
};
const Videos = () => {
  return (
    <K12ResourcesLayout h1Info="K 12 School Videos | Educational Resources for Learning">
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
