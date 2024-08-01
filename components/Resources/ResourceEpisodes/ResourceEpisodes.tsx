"use client";

//* Components
import React from "react";
import ResourceCard from "@/components/Resources/ResourceCard/ResourceCard";
import { getResourceEpisodes } from "@/services/resources";
import RelatedResourceLoader from "@/components/Resources/RelatedResourcesLoader/RelatedResouces";

//* css
import Style from "@/components/sliders/RelatedResources/RelatedResources.module.css";

//* Images
import DefaultResourceImage from "@/images/common/recommendation.png";

//* interface
interface ResourceEpisodesInterface {
  resourceId: string;
}

const ResourceEpisodes: React.FC<ResourceEpisodesInterface> = ({
  resourceId,
}) => {
  const { resourceEpisodes, isLoading } = getResourceEpisodes(resourceId ?? "");

  return (
    <>
      {isLoading && <RelatedResourceLoader />}

      {!isLoading && resourceEpisodes.length !== 0 && (
        <div className="releated_resources_section">
          <h6>Episodes</h6>

          <div className={Style.related_resources_contianer}>
            {resourceEpisodes?.map((data) => {
              let url = "/";
              if (data.material_type === "Videos") {
                url = `/resources/videos/info/${data.resource_id}`;
              } else if (data.material_type === "Class Notes") {
                url = `/resources/class-notes/info/${data.resource_id}`;
              } else if (data.material_type === "Audio Books") {
                url = `/resources/audio-books/info/${data.resource_id}`;
              } else if (data.material_type === "Books") {
                url = `/resources/books/info/${data.resource_id}`;
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
                    title={data.resource_name}
                    rating={0}
                    totalReviews={0}
                    author=""
                    resourceType={data.material_type ?? ""}
                    isUserLogin={true}
                    url={url}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default ResourceEpisodes;
