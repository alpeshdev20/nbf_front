//* importing component
import React from "react";
import ResourcesLayout from "../resource-layout";
import ContinueWatching from "@/components/Resources/ContinueWatching/ContinueWatching";
import ExploreSection from "@/components/Resources/ExploreSection/ExploreSection";

import type { Metadata } from "next";

//* Metadata
export const metadata: Metadata = {
  title: "Online Bookstore - Explore and Read Books Online Anytime",
  description: "Find the best books online at our online bookstore. Read books online from a vast collection at the ultimate books online store, anytime, anywhere.",
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
