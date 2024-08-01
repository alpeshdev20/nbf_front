//* Importing Component
import React from "react";
import Image from "next/image";

//* image
import ComingSoonImage from "@/public/images/common/coming-soon.png";

const ComingSoon = () => {
  return (
    <>
      {/* Coming Soon   */}
      <div className="error-page">
        <Image src={ComingSoonImage} alt="Coming Soon Image" />
      </div>
    </>
  );
};

export default ComingSoon;
