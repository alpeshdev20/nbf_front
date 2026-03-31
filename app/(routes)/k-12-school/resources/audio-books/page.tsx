// "use client";

//* importing component
import React from "react";
import K12ResourcesLayout from "../resource-layout";
import K12ContinueWatching from "@/components/Resources/ContinueWatching/K12ContinueWatching";
import K12ExploreSection from "@/components/Resources/ExploreSection/K12ExploreSection";
import type { Metadata } from "next";

//* Metadata
export const metadata: Metadata = {
  title: "K 12 School Audio Books | Best Resources for Learning",
  description: "The Top K 12 School Audio Books At Netbookflix. Find The Best Resources For Learning And Help Students Improve Their Education With Engaging Audio Content.",
};
const AudioBooks = () => {
  return (
    <K12ResourcesLayout h1Info="K 12 School Audio Books | Best Resources for Learning">
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
