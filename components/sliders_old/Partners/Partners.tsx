"use client";

//* Importing Components
import React from "react";
import Image from "next/image";
import Slider from "react-slick";

//* Importing Images
// import Partner1 from "@/images/partners/1.png";
// import Partner2 from "@/images/partners/2.png";
// import Partner3 from "@/images/partners/3.png";
// import Partner4 from "@/images/partners/4.png";

//* Importing Css
import Style from "@/components/sliders/Partners/Partners.module.css";
import { getPublisherLogos } from "@/services/publisher";

const Partners: React.FC = () => {
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
    <section className={Style.partners}>
      <div className="app-container">
        <h6>
          Our <span>Partners</span>
        </h6>

        <div className="partners__slider-wrapper">
          <Slider {...settings} className={Style.partners__slider}>
            {isSuccess &&
              publisherLogo?.map((data) => {
                return (
                  <div className={Style.partners__slide} key={data.id}>
                    <div className={Style.partners__slide_item}>
                      <Image src={data.file_path} alt="Partners" fill={true} />
                    </div>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Partners;
