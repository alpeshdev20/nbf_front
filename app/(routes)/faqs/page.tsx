//* Importing Components
import React from "react";
import Navbar from "@/components/layout/Navbar/Navbar";
import NewsLetter from "@/components/NewsLetter/NewsLetter";
import Footer from "@/components/layout/Footer/Footer";
import Image from "next/image";
import { get } from "@/utils/fetch";
import { Metadata } from "next";

//* images
import Banner from "@/images/faqs/banner.png";

//* Interface for CMS Data
interface CmsInterface {
  page_name: string;
  content: string;
}
 
//* Metadata
 export const metadata: Metadata = {
  title: "FAQs - NetbookFlix: Your Questions Answered",
  description: "Have questions about NetbookFlix? Explore our comprehensive FAQ section to find answers and learn more about our services and features.",
};

//* FAQs Page Component
export default async function Faqs() {
  const apiUrl = process.env.API_URL || ""; // Fallback to empty string if not defined
  // let cmsData: CmsInterface | null = null;
  let cmsData;
  try {
    // Using the get function to fetch data
     cmsData = await get(`${apiUrl}faqs`);
    console.log("CMS Data:", cmsData.content); // Logs in the terminal
  } catch (error) {
    console.error("Failed to fetch FAQs data:", error);
  }


  return (
    <>
      {/* Navbar */}
      <Navbar
        navType="main"
        btnClass="primary"
        btnURL="/explore-k12"
        btnContent="EXPLORE K12/SCHOOL"
      />

      {/* Banner Section */}
      <div className="faqs_section">
        <div className="faqs-banner">
          <Image src={Banner} alt="FAQ Banner" priority />
        </div>
      </div>

      {/* CMS Content Section */}
      <div className="cms_container">
        <div className="app-container">
          {cmsData ? (
            <div
              className="cms_content"
              dangerouslySetInnerHTML={{
                __html: cmsData.response.content, // Ensure cmsData.content is a valid HTML string
              }}
            ></div>
          ) : (
            <p>Content not available at the moment.</p>
          )}
        </div>
      </div>

      {/* Newsletter */}
      <NewsLetter />

      {/* Footer */}
      <Footer />
    </>
  );
}
