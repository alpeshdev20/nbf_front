// "use client";

//* importing component
import React from "react";
import K12ResourcesLayout from "../resource-layout";
import K12ContinueWatching from "@/components/Resources/ContinueWatching/K12ContinueWatching";
import K12ExploreSection from "@/components/Resources/ExploreSection/K12ExploreSection";
import type { Metadata } from "next";

//* Metadata
export const metadata: Metadata = {
  title: "Best Audiobooks Online - Listen to Top Audio Books Anytime",
  description: "Explore audio books online with the best audiobook subscription. Listen to the best audiobooks, including Hindi audio books, free online audio books.",
};
const AudioBooks = () => {
  return (
    <K12ResourcesLayout>
      <div className="resouses-title books">
        <div className="app-container">
          <h5>
            Audio<span>Books</span>
          </h5>
        </div>
      </div>

      <K12ContinueWatching
        url="/k-12-school/resources/audio-books/"
        resourceType="Audio Books"
        requestURL="k-12-school/resources/audio-books"
      />

      <K12ExploreSection
        url="/k-12-school/resources/audio-books"
        resourceType="Audio Books"
        requestURL="k-12-school/resources/audio-books"
      />
    </K12ResourcesLayout>
  );
};

export default AudioBooks;
