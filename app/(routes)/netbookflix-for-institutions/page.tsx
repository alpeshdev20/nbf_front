//* Components
import React from "react";
import Button from "@/components/ui/Button/Button";
import Navbar from "@/components/layout/Navbar/Navbar";
import NewsLetter from "@/components/NewsLetter/NewsLetter";
import Footer from "@/components/layout/Footer/Footer";

//* images
import InstructorsImage from "@/images/instructors/instructor.png";
import { Metadata } from "next";

//* Metadata
export const metadata: Metadata = {
  title: "NetbookFlix for Institutions: Revolutionizing Education Managemen",
  description: "Discover how NetbookFlix supports institutions with tools and resources designed to enhance student engagement, learning, and academic success",
};
const NbfForInstitutions = () => {
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
            Netbookflix For Institutions 
      </h1>
      <div className="institutions_section">
        <div className="app-container">
          <div className="institutions_container">
            <div className="institutions_content">
              <p>
                Netbookflix for <span>Institutions</span>
              </p>
              <h6>Netbookflix for Schools,</h6>
              <h6>Colleges and Universities</h6>
              <h3>Unlimited access to</h3>
              <h3>academic and personal</h3>
              <h3>development resources</h3>
              <Button
                link="/partner-with-us?source=institutions"
                content="PARTNER WITH US"
                btnColor="primary"
              />
            </div>
            <Button
              link="/university-press-publishing-services"
              content="KNOW ABOUT UNIVERSITY PRESS PUBLISHING SERVICES"
              btnColor="primary"
              otherClass="press_publising_button"
            />
          </div>
        </div>
      </div>

      {/* News Letter  */}
      <NewsLetter />

      {/* Footer  */}
      <Footer />
    </>
  );
};

export default NbfForInstitutions;
