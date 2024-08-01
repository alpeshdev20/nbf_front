//* importing components
import Image from "next/image";
import React from "react";

//* Importing Image
import NodataFoundImage from "@/icons/no-data.png";

const NoDataFound = () => {
  return (
    <>
      <div className="no-data-found">
        <Image src={NodataFoundImage} alt="No Data found Image" />
      </div>
    </>
  );
};

export default NoDataFound;
