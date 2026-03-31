//* importing Components
import React from "react";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import NaisaSection from "@/components/Naisa/NaisaSection/NaisaSection";
import { Metadata } from "next";
import NaisaPage from "./NaisaPage";
import Meta from "app/meta";

//* Metadata
export const metadata: Metadata = {
  title: "NetbookFlix NAISA: Advancing Indigenous Education",
  description: "Learn about NetbookFlix’s collaboration with NAISA to provide educational resources tailored to support Indigenous education and communities",
};
const Naisa = () => {

  return (
    <>
      {/* Navbar  */}
      <NaisaPage/>

    </>
  );
};

export default Naisa;
