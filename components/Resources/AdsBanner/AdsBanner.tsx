//* importing component
import React from "react";
import Image from "next/image";

//* images
import Banner from "@/images/common/ads-banner.png";

//* css
import Style from "@/components/Resources/AdsBanner/AdsBanner.module.css";

const AdsBanner = () => {
  return (
    <div className={Style.ads_banner_section}>
      <Image src={Banner} alt="Banner" priority />
    </div>
  );
};

export default AdsBanner;
