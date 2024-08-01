"use client";

//* Importing Components
import React from "react";
import Image from "next/image";
import Slider from "react-slick";

//* Importing Css
import Style from "@/components/sliders/K12CategoryCarousel/K12CategoryCarousel.module.css";
import { getPublisherLogos } from "@/services/publisher";
import Link from "next/link";

//* Interface
interface K12CategoryInterface {
  title: string;
  url: string;
}

const K12CategoryCarousel: React.FC<K12CategoryInterface> = ({
  title,
  url,
}) => {
  const { publisherLogo, isSuccess } = getPublisherLogos(1, 50);

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    delay: 2000,
  };

  return (
    <section className={Style.k12_category_carousel}>
      <div className={Style.k12_category_carousel_heading}>
        <h6>{title}</h6>
        <Link href={url}>View All</Link>
      </div>

      <div className="k12_category_slider-wrapper">
        <Slider {...settings} className={Style.k12_category__slider}>
          {isSuccess &&
            publisherLogo?.map((data) => {
              return (
                <div
                  className={Style.k12_category_carousel__slide}
                  key={data.id}
                >
                  <div className={Style.k12_category_carousel_slide_item}>
                    <Image
                      src={data.file_path}
                      alt="K12CategoryCarousel"
                      fill={true}
                    />
                  </div>
                </div>
              );
            })}
        </Slider>
      </div>
    </section>
  );
};

export default K12CategoryCarousel;
