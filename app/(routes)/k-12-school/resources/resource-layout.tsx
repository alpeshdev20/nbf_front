"use client";

//* Importing Component
import React, { ReactNode } from "react";
import K12Navbar from "@/components/layout/Navbar/K12Navbar";
import NewsLetter from "@/components/NewsLetter/NewsLetter";
import Footer from "@/components/layout/Footer/Footer";
import AdsBanner from "@/components/Resources/AdsBanner/AdsBanner";
import K12ResourcesTabs from "@/components/Resources/ResourcesTabs/K12ResourcesTabs";
import ResourcesHighlights from "@/components/Resources/ResourcesHighlights/ResourcesHighlights";
//* interface
interface ResourcesLayoutInterface {
  children: ReactNode;
  showAddBanner?: boolean;
  showResourcesHighlights?: boolean;
  h1Info?:string;
}

const K12ResourcesLayout: React.FC<ResourcesLayoutInterface> = ({
  h1Info,
  children,
  showAddBanner = true,
  showResourcesHighlights = true,
}) => {
  return (
    <>
      {/* Navbar  */}
      <K12Navbar
        navType="k12"
        btnClass="secondary"
        btnURL="/"
        btnContent="EXPLORE HIGHER EDUCATION"
      />

      {/* Ads Banner  */}
      {showAddBanner && <AdsBanner />}
      
      {h1Info ? <h1 className="h1-home-screen-seo-k12">
         {h1Info}
      </h1>
      :''}

      <K12ResourcesTabs />

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

export default K12ResourcesLayout;
