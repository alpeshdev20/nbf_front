// components/Resources/AdsBanner/AdsBanner.js

import React from "react"; 
import Slider from "react-slick";
import Image from "next/image";
import Style from "@/components/Resources/AdsBanner/AdsBanner.module.css";
import { useGetAds } from "@/services/adsService"; 

const AdsBanner = () => {
  const { adsData, isLoading, isError } = useGetAds(); 

  // Slider settings
  const settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 2500,
    delay: 2000,
    arrows: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    loop: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrow: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrow: false,
        },
      },
    ],
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching ads</div>;

  return (
    <div className={Style.ads_banner_section}>
      <Slider {...settings}>
        {adsData.map((ad) => (
          <div key={ad.id} className={Style.slide_container}>
            <a href={ad.link} target="_blank" rel="noopener noreferrer">
              <Image 
                src={ad.image} 
                alt={`Ad ${ad.link}`} 
                priority 
                layout="fixed" // Use fixed layout
                width={450} // Set fixed width
                height={150} // Set fixed height
                className={Style.book_image} // Custom style for image
              />
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AdsBanner;
