//* Importing Components
import React from "react";
import Slider from "react-slick";
import Image, { StaticImageData } from "next/image";

//* css
import Style from "@/components/sliders/BooksSlider/BooksSlider.module.css";
import ResourcesInterface from "@/interfaces/Resources";

//* Images
import recommendedImage from "@/public/images/common/recommendation.png";

//* Interface
interface BooksSlider {
  title: string;
  slidesToShow: number;
  titleColor: string;
  data: ResourcesInterface[];
}

function BooksSlider({ title, slidesToShow, data, titleColor }: BooksSlider) {
  const settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 2500,
    delay: 2000,
    arrows: false,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    loop: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className={`${Style.books__slider_wrapper} books__slider_wrapper`}>
      <h2 className={Style.books__title} style={{ color: titleColor }}>
        {title}
      </h2>
      {data && (
        <Slider {...settings}>
          {data?.map((item) => (
            <div className={Style.books__slide} key={item.resource_id}>
              <Image
                src={item.resource_image ? item.resource_image : recommendedImage}
                width={173}
                height={268}
                alt="Books"
                className={Style.books__slider_image}
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}

export default BooksSlider;
