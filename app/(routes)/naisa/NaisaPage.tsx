"use client"
//* importing Components
import React from "react";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import NaisaSection from "@/components/Naisa/NaisaSection/NaisaSection";
import { Metadata } from "next";

//* Metadata
export const metadata: Metadata = {
  title: "NetbookFlix NAISA: Advancing Indigenous Education",
  description: "Learn about NetbookFlix’s collaboration with NAISA to provide educational resources tailored to support Indigenous education and communities",
};
const NaisaPage = () => {
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
           Naisa | Netbookflix
      </h1>
      {/* Naisa Section  */}
      <NaisaSection />

      {/* Footer  */}
      {/* <Footer /> */}
    </>
  );
};

export default NaisaPage;
