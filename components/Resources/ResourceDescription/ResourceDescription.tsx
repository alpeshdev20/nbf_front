"use client";
//* importing Components
import React, { useState } from "react";

//* css
import Style from "@/components/Resources/ResourceDescription/ResourceDescription.module.css";

//* Interface
interface ResourceDescriptionInterface {
  summary: string;
  toc: string | null;
  authorDetails: string | null;
}

const ResourceDescription: React.FC<ResourceDescriptionInterface> = ({
  summary,
  toc,
  authorDetails,
}) => {
  const [tab, setTab] = useState({
    summary: true,
    toc_tab: false,
    author: false,
  });
  return (
    <div className={Style.resource_description_container}>
      <div className={Style.resource_description_tab_container}>
        <div
          className={
            tab.summary
              ? `${Style.resource_description_tabs} ${Style.tab_active}`
              : Style.resource_description_tabs
          }
          onClick={() =>
            setTab({
              summary: true,
              toc_tab: false,
              author: false,
            })
          }
        >
          <p>Summary</p>
        </div>
        <div
          className={
            tab.toc_tab
              ? `${Style.resource_description_tabs} ${Style.tab_active}`
              : Style.resource_description_tabs
          }
          onClick={() =>
            setTab({
              summary: false,
              toc_tab: true,
              author: false,
            })
          }
        >
          <p>Table of content</p>
        </div>
        <div
          className={
            tab.author
              ? `${Style.resource_description_tabs} ${Style.tab_active}`
              : Style.resource_description_tabs
          }
          onClick={() =>
            setTab({
              summary: false,
              toc_tab: false,
              author: true,
            })
          }
        >
          <p>Author Detail</p>
        </div>
      </div>

      <div className={Style.resource_description_content}>
        {tab.summary && (
          <>
            <p>{summary}</p>
          </>
        )}

        {tab.toc_tab && (
          <>
            <p>{toc ? toc : "No Details Available...."}</p>
          </>
        )}

        {tab.author && (
          <>
            <p>{authorDetails ? authorDetails : "No Details Available...."}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ResourceDescription;
