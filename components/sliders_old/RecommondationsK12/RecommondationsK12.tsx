"use client";

//* Importing Component
import React from "react";
import Image from "next/image";
import BooksSlider from "@/components/sliders/BooksSlider/BooksSlider";
import { getResources } from "@/services/resources";

//* import css
import Style from "@/components/sliders/RecommondationsK12/RecommondationsK12.module.css";

//* Images
import bgImage from "@/images/k12/recommendation.jpg";

const RecommondationsK12 = () => {
  const booksData = getResources(70, 15, "resources/books", 0, 0);
  const booksData2 = getResources(110, 15, "resources/books", 0, 0);

  return (
    <div className={Style.recommendation__section}>
      <Image
        src={bgImage}
        alt="Recommendation"
        className={Style.recommendation__bg_image}
        priority
      />
      <div className={Style.recommendation__content}>
        <h2 className={Style.recommendation__title}>
          <b>Recommendations</b> for you
        </h2>
        <div className={Style.recommendation__slide_container}>
          {booksData?.resourceData && (
            <BooksSlider
              title="Popular"
              data={booksData?.resourceData}
              slidesToShow={4}
              titleColor="#000"
            />
          )}
          {booksData2?.resourceData && (
            <BooksSlider
              title="Recently Added"
              data={booksData2?.resourceData}
              slidesToShow={4}
              titleColor="#000"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommondationsK12;
