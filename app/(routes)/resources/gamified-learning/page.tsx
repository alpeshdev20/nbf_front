//* importing component
import React from "react";
import ResourcesLayout from "../resource-layout";
import ContinueWatching from "@/components/Resources/ContinueWatching/ContinueWatching";
import ExploreSection from "@/components/Resources/ExploreSection/ExploreSection";

import type { Metadata } from "next";

//* Metadata
export const metadata: Metadata = {
  title: "Gamified Learning | Innovative Education Solutions  ",
  description: "The Power Of Gamified Learning At Netbookflix! Engage With Interactive Games And Explore A Wide Range Of Books. Visit Our Online Bookstore To Read Anytime, Anywhere.",
};
const Books = () => {
  return (
    <ResourcesLayout>
      <div className="resouses-title books">
        <div className="app-container">
          <h5>
          Gamified<span> Learning</span>
          </h5>
        </div>
      </div>

      <ContinueWatching
        url="/resources/gamified-learning/"
        resourceType="Gamefied"
        requestURL="resources/gamified-learning"
      />

      <ExploreSection
        url="/resources/gamified-learning"
        resourceType="Gamefied"
        requestURL="resources/gamified-learning"
      />
    </ResourcesLayout>
  );
};

export default Books;
