//* importing component
import React from "react";
import K12ResourcesLayout from "../resource-layout";
import K12ContinueWatching from "@/components/Resources/ContinueWatching/K12ContinueWatching";
import K12ExploreSection from "@/components/Resources/ExploreSection/K12ExploreSection";

import type { Metadata } from "next";

//* Metadata
export const metadata: Metadata = {
  title: "K 12 School Gamified Learning | Boost Student Success",
  description: "Learning With K-12 School Gamified Learning At Netbookflix. Boost Student Success Through Fun, Interactive Games That Enhance Engagement And Foster Growth.",
};
const Books = () => {
  return (
    <K12ResourcesLayout>
      <div className="resouses-title books">
        <div className="app-container">
          <h5>
          Gamified<span> Learning</span>
          </h5>
        </div>
      </div>

      <K12ContinueWatching
        url="/k-12-school/resources/gamified-learning/"
        resourceType="Gamefied"
        requestURL="k-12-school/resources/gamified-learning"
      />

      <K12ExploreSection
        url="/k-12-school/resources/gamified-learning"
        resourceType="Gamefied"
        requestURL="k-12-school/resources/gamified-learning"
      />
    </K12ResourcesLayout>
  );
};

export default Books;
