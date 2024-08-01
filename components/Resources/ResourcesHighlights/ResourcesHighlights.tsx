//* importing Components
import React from "react";
import Image from "next/image";

//* css
import Style from "@/components/Resources/ResourcesHighlights/ResourcesHighlights.module.css";

//* icons
import AmazingValueIcon from "@/icons/amazing-value.png";
import SafePaymentIcon from "@/icons/safe-payment.png";
import CollectionIcon from "@/icons/collections.png";

const ResourcesHighlights = () => {
  return (
    <div className={Style.resources_highlights_section}>
      <div className="app-container">
        <div className={Style.resources_highlights_container}>
          <div className={Style.highlight_card}>
            <div className={Style.highlight_image}>
              <Image src={CollectionIcon} alt="5 million + collection" />
            </div>
            <div className={Style.highlight_content}>
              <h6>5 million + collection</h6>
              <p>Read Topically</p>
            </div>
          </div>

          <div className={Style.highlight_card}>
            <div className={Style.highlight_image}>
              <Image src={AmazingValueIcon} alt="Amazing Value" />
            </div>
            <div className={Style.highlight_content}>
              <h6>Amazing Value</h6>
              <p>We offer competitive price.</p>
            </div>
          </div>

          <div className={Style.highlight_card}>
            <div className={Style.highlight_image}>
              <Image src={SafePaymentIcon} alt="Safe Payment" />
            </div>
            <div className={Style.highlight_content}>
              <h6>Safe Payment</h6>
              <p>100% secure payment.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesHighlights;
