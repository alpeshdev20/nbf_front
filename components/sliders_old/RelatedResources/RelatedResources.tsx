"use client";

//* Components
import React from "react";
import Slider from "react-slick";
import ResourceCard from "@/components/Resources/ResourceCard/ResourceCard";
import { getRelatedResources } from "@/services/resources";
import RelatedResourceLoader from "@/components/Resources/RelatedResourcesLoader/RelatedResouces";

//* css
import Style from "@/components/sliders/RelatedResources/RelatedResources.module.css";

//* Images
import DefaultResourceImage from "@/images/common/recommendation.png";

//* interface
interface RelatedResourcesInterface {
  resourceId: string;
}

const RelatedResources: React.FC<RelatedResourcesInterface> = ({
  resourceId,
}) => {
  const { relatedResources, isLoading } = getRelatedResources(resourceId ?? "");

  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 2500,
    delay: 2000,
    arrows: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    loop: true,
  };

  return (
    <>
      {isLoading && <RelatedResourceLoader />}

      {!isLoading && relatedResources.length !== 0 && (
        <div className="releated_resources_section">
          <h4>
            Related <span>Resources</span>
          </h4>

          {relatedResources.length < 6 && (
            <div className={Style.related_resources_contianer}>
              {relatedResources?.map((data) => {
                let url = "/";
                if (data.material_type === "Videos") {
                  url = `/resources/videos/info?id=${data.resource_id}`;
                } else if (data.material_type === "Class Notes") {
                  url = `/resources/class-notes/info?id=${data.resource_id}`;
                } else if (data.material_type === "Audio Books") {
                  url = `/resources/audio-books/info?id=${data.resource_id}`;
                } else if (data.material_type === "Books") {
                  url = `/resources/books/info?id=${data.resource_id}`;
                } else {
                  url = "/";
                }
                return (
                  <div className={Style.slick_slider} key={data.resource_id}>
                    <ResourceCard
                      image={
                        data.resource_image
                          ? data.resource_image
                          : DefaultResourceImage
                      }
                      author={data.author ?? ""}
                      title={data.resource_name}
                      rating={data.rating}
                      totalReviews={data.reviews}
                      resourceType={data.material_type}
                      isUserLogin={true}
                      url={url}
                    />
                  </div>
                );
              })}
            </div>
          )}
          {relatedResources.length >= 6 && (
            <div
              className={`${Style.related_resources_slider} related_resources_slider`}
            >
              <Slider {...settings}>
                {relatedResources?.map((data) => {
                  let url = "/";
                  if (data.material_type === "Videos") {
                    url = `/resources/videos/info?id=${data.resource_id}`;
                  } else if (data.material_type === "Class Notes") {
                    url = `/resources/class-notes/info?id=${data.resource_id}`;
                  } else if (data.material_type === "Audio Books") {
                    url = `/resources/audio-books/info?id=${data.resource_id}`;
                  } else if (data.material_type === "Books") {
                    url = `/resources/books/info?id=${data.resource_id}`;
                  } else if (data.material_type === "Ar/Vr") {
                    url = `/resources/books/info?id=${data.resource_id}`;
                  } else if (data.material_type === "Gamified Learning") {
                    url = `/resources/books/info?id=${data.resource_id}`;
                  } else {
                    url = "/";
                  }
                  return (
                    <div className={Style.slick_slider} key={data.resource_id}>
                      <ResourceCard
                        image={
                          data.resource_image
                            ? data.resource_image
                            : DefaultResourceImage
                        }
                        author={data.author ?? ""}
                        title={data.resource_name}
                        rating={data.rating}
                        totalReviews={data.reviews}
                        resourceType={data.material_type}
                        isUserLogin={true}
                        url={url}
                        relatedSliderClass={true}
                      />
                    </div>
                  );
                })}
              </Slider>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RelatedResources;
