//* importing component
import React from "react";
import ResourcesLayout from "../resource-layout";
import ContinueWatching from "@/components/Resources/ContinueWatching/ContinueWatching";
import ExploreSection from "@/components/Resources/ExploreSection/ExploreSection";

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
        url="/resources/class-notes/info"
        resourceType="Class Notes"
        requestURL="resources/class-notes"
      />

      <ExploreSection
        url="/resources/class-notes/info"
        resourceType="Class Notes"
        requestURL="resources/class-notes"
      />
    </ResourcesLayout>
  );
};

export default ClassNotes;
