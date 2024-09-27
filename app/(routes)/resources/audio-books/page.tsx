// "use client";

//* importing component
import React from "react";
import ResourcesLayout from "../resource-layout";
import ContinueWatching from "@/components/Resources/ContinueWatching/ContinueWatching";
import ExploreSection from "@/components/Resources/ExploreSection/ExploreSection";
import type { Metadata } from "next";

//* Metadata
export const metadata: Metadata = {
  title: "Best Audiobooks Online - Listen to Top Audio Books Anytime",
  description: "Explore audio books online with the best audiobook subscription. Listen to the best audiobooks, including Hindi audio books, free online audio books.",
};
const AudioBooks = () => {
  return (
    <ResourcesLayout>
      <div className="resouses-title books">
        <div className="app-container">
          <h5>
            Audio<span>Books</span>
          </h5>
        </div>
      </div>

      <ContinueWatching
        url="/resources/audio-books/"
        resourceType="Audio Books"
        requestURL="resources/audio-books"
      />

      <ExploreSection
        url="/resources/audio-books"
        resourceType="Audio Books"
        requestURL="resources/audio-books"
      />
    </ResourcesLayout>
  );
};

export default AudioBooks;
