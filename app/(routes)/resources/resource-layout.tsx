"use client";

//* Importing Component
import React, { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar/Navbar";
import NewsLetter from "@/components/NewsLetter/NewsLetter";
import Footer from "@/components/layout/Footer/Footer";
import AdsBanner from "@/components/Resources/AdsBanner/AdsBanner";
import ResourcesTabs from "@/components/Resources/ResourcesTabs/ResourcesTabs";
import ResourcesHighlights from "@/components/Resources/ResourcesHighlights/ResourcesHighlights";
//* interface
interface ResourcesLayoutInterface {
  children: ReactNode;
  showAddBanner?: boolean;
  showResourcesHighlights?: boolean;
}

const ResourcesLayout: React.FC<ResourcesLayoutInterface> = ({
  children,
  showAddBanner = true,
  showResourcesHighlights = true,
}) => {
  return (
    <>
      {/* Navbar  */}
      <Navbar
        navType="main"
        btnClass="primary"
        btnURL="/explore-k12"
        btnContent="EXPLORE K12/SCHOOL"
      />

      {/* Ads Banner  */}
      {showAddBanner && <AdsBanner />}

      <ResourcesTabs />

      {/* UI of the resource page will appear here  */}
      {children}

      {/* Resources Highlights  */}
      {showResourcesHighlights && <ResourcesHighlights />}

      {/* News Letter  */}
      <NewsLetter />

      {/* Footer  */}
      <Footer />
    </>
  );
};

export default ResourcesLayout;
