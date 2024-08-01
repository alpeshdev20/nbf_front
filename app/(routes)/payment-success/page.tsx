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
        <h1 className="payment-fonts font-size">Payment success</h1>
        <h2 className="payment-fonts">Deatils shared on respective mail</h2>
      </div>

      {/* News Letter  */}
      <NewsLetter />

      {/* Footer  */}
      <Footer />
    </>
  );
}
