"use client";

//* Importing Component
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCoverflow, Autoplay } from "swiper/modules";

//* Importing Css
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import Style from "@/components/sliders/Testimonials/Testimonials.module.css";

//* import icons
import { RiDoubleQuotesR } from "react-icons/ri";

const Testimonials: React.FC = () => {
  return (
    <section
      className={Style.testimonial_section + " " + "testimonial__slider"}
    >
      <div className="app-container">
        <Swiper
          modules={[Pagination, EffectCoverflow, Autoplay]}
          effect={"coverflow"}
          slidesPerView="auto"
          pagination={{ clickable: true }}
          loop={true}
          centeredSlides={true}
          speed={1000}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 250,
            depth: 200,
            modifier: 1,
            slideShadows: false,
          }}
          className={Style.testimonial_caroursel}
        >
          <SwiperSlide className={Style.testimonial_card}>
            <div className={Style.testimonial_content}>
              <RiDoubleQuotesR />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
            </div>

            <div className={Style.user_testimonial_info}>
              <h5>Amol M Pradhan</h5>
              <p>General Manager Information Technology</p>
              <h6>NOCIL Limited</h6>
            </div>
          </SwiperSlide>

          <SwiperSlide className={Style.testimonial_card}>
            <div className={Style.testimonial_content}>
              <RiDoubleQuotesR />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
            </div>

            <div className={Style.user_testimonial_info}>
              <h5>Amol M Pradhan</h5>
              <p>General Manager Information Technology</p>
              <h6>NOCIL Limited</h6>
            </div>
          </SwiperSlide>

          <SwiperSlide className={Style.testimonial_card}>
            <div className={Style.testimonial_content}>
              <RiDoubleQuotesR />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
            </div>

            <div className={Style.user_testimonial_info}>
              <h5>Amol M Pradhan</h5>
              <p>General Manager Information Technology</p>
              <h6>NOCIL Limited</h6>
            </div>
          </SwiperSlide>

          <SwiperSlide className={Style.testimonial_card}>
            <div className={Style.testimonial_content}>
              <RiDoubleQuotesR />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
            </div>

            <div className={Style.user_testimonial_info}>
              <h5>Amol M Pradhan</h5>
              <p>General Manager Information Technology</p>
              <h6>NOCIL Limited</h6>
            </div>
          </SwiperSlide>

          <SwiperSlide className={Style.testimonial_card}>
            <div className={Style.testimonial_content}>
              <RiDoubleQuotesR />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
            </div>

            <div className={Style.user_testimonial_info}>
              <h5>Amol M Pradhan</h5>
              <p>General Manager Information Technology</p>
              <h6>NOCIL Limited</h6>
            </div>
          </SwiperSlide>

          <SwiperSlide className={Style.testimonial_card}>
            <div className={Style.testimonial_content}>
              <RiDoubleQuotesR />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
            </div>

            <div className={Style.user_testimonial_info}>
              <h5>Amol M Pradhan</h5>
              <p>General Manager Information Technology</p>
              <h6>NOCIL Limited</h6>
            </div>
          </SwiperSlide>

          <SwiperSlide className={Style.testimonial_card}>
            <div className={Style.testimonial_content}>
              <RiDoubleQuotesR />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
            </div>

            <div className={Style.user_testimonial_info}>
              <h5>Amol M Pradhan</h5>
              <p>General Manager Information Technology</p>
              <h6>NOCIL Limited</h6>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
