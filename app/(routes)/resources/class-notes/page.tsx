//* importing component
import React from "react";
import ResourcesLayout from "../resource-layout";
import ContinueWatching from "@/components/Resources/ContinueWatching/ContinueWatching";
import ExploreSection from "@/components/Resources/ExploreSection/ExploreSection";
import type { Metadata } from "next";

//* Metadata
export const metadata: Metadata = {
  title: "Class Notes Online - Your Go-To Resource for Easy Study Note",
  description: "Find comprehensive online class notes and notebooks. Access and study class notes online to enhance your learning experience anytime, anywhere.",
};
const ClassNotes = () => {
  return (
    <ResourcesLayout>
      <div className="resouses-title books">
        <div className="app-container">
          <h5>
            Class<span>Notes</span>
          </h5>
        </div>
      </div>

      <ContinueWatching
        url="/resources/class-notes/"
        resourceType="Class Notes"
        requestURL="resources/class-notes"
      />

      <ExploreSection
        url="/resources/class-notes"
        resourceType="Class Notes"
        requestURL="resources/class-notes"
      />
    </ResourcesLayout>
  );
};

export default ClassNotes;
