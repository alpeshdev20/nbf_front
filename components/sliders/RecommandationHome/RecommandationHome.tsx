"use client";
//* Importing Component
import React from "react";
import Image from "next/image";
import BooksSlider from "@/components/sliders/BooksSlider/BooksSlider";
import { getResources } from "@/services/resources";

//* import css
import Style from "@/components/sliders/RecommandationHome/RecommandationHome.module.css";

//* images
import bgImage from "@/images/home/recommendation.png";
import phoneImage from "@/public/images/home/mobile.png";

const RecommandationHome = () => {
  //* Fetching resources
  const booksData = getResources(46, 15, "resources/books", 0, 0);
  const booksData2 = getResources(130, 15, "resources/books", 0, 0);

  return (
    <div className={Style.recommendation__section_home}>
      <Image
        src={bgImage}
        alt="Recommendations"
        className={Style.recommendation__bg_image_home}
        priority
      />
      <Image
        className={Style.recommendation__section_home_mobile}
        src={phoneImage}
        alt="Mobile"
        priority
      />
      <div className={Style.recommendation__section_home_content}>
        <h2 className={Style.recommendation__section_home_content_title}>
          <b>Recommendations</b> for you
        </h2>
        {booksData.resourceData && (
          <BooksSlider
            title="Popular"
            data={booksData.resourceData}
            slidesToShow={7}
            titleColor="#000"
          />
        )}
        {booksData2.resourceData && (
          <BooksSlider
            title="Recently Added"
            data={booksData2.resourceData}
            slidesToShow={7}
            titleColor="#000"
          />
        )}
      </div>
    </div>
  );
};

export default RecommandationHome;
