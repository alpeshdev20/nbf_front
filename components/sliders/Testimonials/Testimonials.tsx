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
          {/* <Swiper> */}
  <SwiperSlide className={Style.testimonial_card}>
    <div className={Style.testimonial_content}>
      <iframe
        src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fchetan.kannangar%2Fposts%2Fpfbid0258hFc3M8yYanknD3eGNE8qKp1wipMfebj19m7yaUiLxTnJrWZY3DDUXDRMpf4ktDl&show_text=true&width=400"
        width="400"
        height="169"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe>
    </div>
  </SwiperSlide>

  <SwiperSlide className={Style.testimonial_card}>
    <div className={Style.testimonial_content}>
      <RiDoubleQuotesR />
      <iframe
        src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fresourceupdate%2Fposts%2Fpfbid0xtfRcCQFS6ney1aqSjkZurPkp9qBcDuisGN6ktbEEnqCKar289Aw4ukjuXRnvN79l&show_text=true&width=400"
        width="400"
        height="207"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe>
    </div>
  </SwiperSlide>

  <SwiperSlide className={Style.testimonial_card}>
    <div className={Style.testimonial_content}>
      <RiDoubleQuotesR />
      <iframe
        src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid02kftVjfGkt3z45aADDFzCCAidLSoccEaDZy95bZuuFLsq3seFCF3jGwanTkKgX3ZLl%26id%3D100010906936762&show_text=true&width=400"
        width="400"
        height="169"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe>
    </div>
  </SwiperSlide>

  <SwiperSlide className={Style.testimonial_card}>
    <div className={Style.testimonial_content}>
      <RiDoubleQuotesR />
      <iframe
        src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Favijit.sinha.963%2Fposts%2Fpfbid02v3D5Bw5XX4Tx9RumbendCDV5bZVc3k2c1khVSC4FeNvTqYmzRkU2zg2Dj6CAXtX8l&show_text=true&width=400"
        width="400"
        height="227"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe>
    </div>
  </SwiperSlide>

  <SwiperSlide className={Style.testimonial_card}>
    <div className={Style.testimonial_content}>
      <RiDoubleQuotesR />
      <iframe
        src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fsomen.chakrabarty.58%2Fposts%2Fpfbid0VPycTc83YCGzpdMmRuu1dk6Ti9E4NSVAS2fTkKuwC9k6T4iTxUqiUyEeQyQvfJ24l&show_text=true&width=400"
        width="400"
        height="186"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe>
    </div>
  </SwiperSlide>

  <SwiperSlide className={Style.testimonial_card}>
    <div className={Style.testimonial_content}>
      <RiDoubleQuotesR />
      <iframe
        src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fkrishan.murari.5437%2Fposts%2Fpfbid0NwH3VVGQ9JBZGxuJLvU2T3q2nMRnCMu4qxkm9ZRREwSYgSA4NJkDkTcLvFsf2oYZl&show_text=true&width=400"
        width="400"
        height="186"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe>
    </div>
  </SwiperSlide>

  <SwiperSlide className={Style.testimonial_card}>
    <div className={Style.testimonial_content}>
      <RiDoubleQuotesR />
      <iframe
        src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Framnath.gopalan.3%2Fposts%2Fpfbid02hFTFkBHACF7RgpK543ezE8vGmN3768j7KLJYdrbDupmD2k8Prwh9gdCa7y8DViDRl&show_text=true&width=400"
        width="400"
        height="186"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe>
    </div>
  </SwiperSlide>
</Swiper>

      </div>
    </section>
  );
};

export default Testimonials;
