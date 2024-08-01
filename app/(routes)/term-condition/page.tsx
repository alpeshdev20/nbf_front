"use client";

//* Importing Component
import React from "react";
import Navbar from "@/components/layout/Navbar/Navbar";
import NewsLetter from "@/components/NewsLetter/NewsLetter";
import Footer from "@/components/layout/Footer/Footer";
import { getTermsAndConditions } from "@/services/cms";

export default function TermAndCondition() {
  const { cmsData, isSuccess } = getTermsAndConditions();

  return (
    <>
      {/* Navbar  */}
      <Navbar
        navType="main"
        btnClass="primary"
        btnURL="/explore-k12"
        btnContent="EXPLORE K12/SCHOOL"
      />

      <div className="cms_container">
        <div className="app-container">
          <div
            className="cms_content"
            dangerouslySetInnerHTML={{
              __html: isSuccess ? cmsData?.content : "",
            }}
          ></div>
        </div>
      </div>

      {/* News Letter  */}
      <NewsLetter />

      {/* Footer  */}
      <Footer />
    </>
  );
}
