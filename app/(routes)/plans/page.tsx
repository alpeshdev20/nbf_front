//* Importing Component
import React from "react";
import Navbar from "@/components/layout/Navbar/Navbar";
import NewsLetter from "@/components/NewsLetter/NewsLetter";
import Footer from "@/components/layout/Footer/Footer";
import Plan from "@/components/Plans/Plans";
import Head from "next/head";
import Script from "next/script";

const ViewPlans = () => {
  return (
    <>
      {/* Navbar  */}
      <Navbar
        navType="main"
        btnClass="primary"
        btnURL="/explore-k12"
        btnContent="EXPLORE K12/SCHOOL"
      />

      <div className="plans-section">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
          />
        </Head>

        {/* @ts-ignore */}
        <Script
          type="application/javascript"
          src={`${process.env.PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.PAYTM_MID}.js`}
          onLoad="onScriptLoad();"
          crossOrigin="anonymous"
        ></Script>

        
        <div className="app-container">
          <div className="plans-container">
            <Plan />
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

export default ViewPlans;
