// "use client";

// //* Importing Component
// import React, { useState } from "react";
// import Image from "next/image";
// import Navbar from "@/components/layout/Navbar/Navbar";
// import NewsLetter from "@/components/NewsLetter/NewsLetter";
// import Footer from "@/components/layout/Footer/Footer";
// import FaqCard from "@/components/FaqCard/FaqCard";

// //* images
// import Banner from "@/images/faqs/banner.png";

// //* Faqs Data
// import FaqsData from "@/data/faqs";

// const Faqs: React.FC = () => {
//   const [openIndex, setOpenIndex] = useState<number | null>(1);

//   const handleToggle = (index: number) => {
//     setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
//   };

//   return (
//     <>
//       <Navbar
//         navType="main"
//         btnClass="primary"
//         btnURL="/explore-k12"
//         btnContent="EXPLORE K12/SCHOOL"
//       />

//       <div className="faqs_section">
//         <div className="faqs-banner">
//           <Image src={Banner} alt="Faq Banner" priority />
//         </div>

//         <div className="app-container">
//           <div className="faqs-container">
//             {FaqsData.map((faq) => (
//               <FaqCard
//                 key={faq.id}
//                 title={faq.title}
//                 content={faq.content}
//                 id={faq.id}
//                 isOpen={openIndex === faq.id}
//                 onToggle={() => handleToggle(faq.id)}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* News Letter  */}
//       <NewsLetter />

//       {/* Footer  */}
//       <Footer />
//     </>
//   );
// };

// export default Faqs;

"use client";

//* Importing Component
import React from "react";
import Navbar from "@/components/layout/Navbar/Navbar";
import NewsLetter from "@/components/NewsLetter/NewsLetter";
import Footer from "@/components/layout/Footer/Footer";
import { getFaqs } from "@/services/cms";
import Image from "next/image";

// //* images
import Banner from "@/images/faqs/banner.png";

export default function Faqs() {
  const { cmsData, isSuccess } = getFaqs();

  return (
    <>
      {/* Navbar  */}
      <Navbar
        navType="main"
        btnClass="primary"
        btnURL="/explore-k12"
        btnContent="EXPLORE K12/SCHOOL"
      />

      <div className="faqs_section">
        <div className="faqs-banner">
          <Image src={Banner} alt="Faq Banner" priority />
        </div>
      </div>

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
