//* importing component
import React from "react";
import K12ResourcesLayout from "../resource-layout";
import K12ContinueWatching from "@/components/Resources/ContinueWatching/K12ContinueWatching";
import K12ExploreSection from "@/components/Resources/ExploreSection/K12ExploreSection";
import type { Metadata } from "next";

//* Metadata
export const metadata: Metadata = {
  title: "Class Notes Online - Your Go-To Resource for Easy Study Note",
  description: "Find comprehensive online class notes and notebooks. Access and study class notes online to enhance your learning experience anytime, anywhere.",
};
const ClassNotes = () => {
  return (
    <K12ResourcesLayout>
      <div className="resouses-title books">
        <div className="app-container">
          <h5>
            Class<span>Notes</span>
          </h5>
        </div>
      </div>

      <K12ContinueWatching
        url="/k-12-school/resources/class-notes/"
        resourceType="Class Notes"
        requestURL="k-12-school/resources/class-notes"
      />

      <K12ExploreSection
        url="/k-12-school/resources/class-notes"
        resourceType="Class Notes"
        requestURL="k-12-school/resources/class-notes"
      />
    </K12ResourcesLayout>
  );
};

export default ClassNotes;
