"use client";

//* Importing Component
import React from "react";
import Navbar from "@/components/layout/Navbar/Navbar";
import NewsLetter from "@/components/NewsLetter/NewsLetter";
import Footer from "@/components/layout/Footer/Footer";
import { getPrivacyPolicy } from "@/services/cms";

export default function PrivacyPolicyPage() {
  const { cmsData, isSuccess } = getPrivacyPolicy();

  return (
    <>
      {/* Navbar  */}
      <Navbar
        navType="main"
        btnClass="primary"
        btnURL="/explore-k12"
        btnContent="EXPLORE K12/SCHOOL"
      />
      <h1 className="h1-home-screen-seo">
                  Privacy Policy | Netbookflix
      </h1>
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
