//* Importing Component
import React from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar/Navbar";
import NewsLetter from "@/components/NewsLetter/NewsLetter";
import Footer from "@/components/layout/Footer/Footer";

export default function PaymentSuccess() {
  return (
    <>
      {/* Navbar  */}
      <Navbar
        navType="main"
        btnClass="primary"
        btnURL="/explore-k12"
        btnContent="EXPLORE K12/SCHOOL"
      />

      <div className="centered-container">
          <h1 className="payment-fonts ">Payment failed</h1>
          <h3 className="payment-fonts ">Please try again after some time</h3>
      </div>

      {/* News Letter  */}
      <NewsLetter />

      {/* Footer  */}
      <Footer />
    </>
  );
}
