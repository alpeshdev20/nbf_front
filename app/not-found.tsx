//* Importing Component
import React from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar/Navbar";
import NewsLetter from "@/components/NewsLetter/NewsLetter";
import Footer from "@/components/layout/Footer/Footer";

//* image
import Custom404Image from "@/public/images/common/404.png";

export default function NotFound() {
  return (
    <>
      {/* Navbar  */}
      <Navbar
        navType="main"
        btnClass="primary"
        btnURL="/explore-k12"
        btnContent="EXPLORE K12/SCHOOL"
      />

      {/* 404 Page  */}
      <div className="error-page">
        <Image src={Custom404Image} alt="404 Image" />
      </div>

      {/* News Letter  */}
      <NewsLetter />

      {/* Footer  */}
      <Footer />
    </>
  );
}
