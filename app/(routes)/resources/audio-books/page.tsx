"use client";

//* importing component
import React from "react";
import ResourcesLayout from "../resource-layout";
import ContinueWatching from "@/components/Resources/ContinueWatching/ContinueWatching";
import ExploreSection from "@/components/Resources/ExploreSection/ExploreSection";

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
        url="/resources/audio-books/info"
        resourceType="Audio Books"
        requestURL="resources/audio-books"
      />

      <ExploreSection
        url="/resources/audio-books/info"
        resourceType="Audio Books"
        requestURL="resources/audio-books"
      />
    </ResourcesLayout>
  );
};

export default AudioBooks;
