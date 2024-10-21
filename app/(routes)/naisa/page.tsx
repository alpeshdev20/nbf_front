//* importing Components
import React from "react";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import NaisaSection from "@/components/Naisa/NaisaSection/NaisaSection";

const Naisa = () => {
  return (
    <>
      {/* Navbar  */}
      <Navbar
        navType="main"
        btnClass="primary"
        btnURL="/explore-k12"
        btnContent="EXPLORE K12/SCHOOL"
      />

      {/* Naisa Section  */}
      <NaisaSection />

      {/* Footer  */}
      {/* <Footer /> */}
    </>
  );
};

export default Naisa;
