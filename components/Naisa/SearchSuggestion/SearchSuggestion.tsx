//* Importing Components
import React from "react";
import DefaultResourceImage from "@/images/common/recommendation.png";
import ResourcesInterface from "@/interfaces/Resources";
import ResourceCard from "@/components/Resources/ResourceCard/ResourceCard";

const SearchSuggestion: React.FC<{
  suggestions: ResourcesInterface[] | [] | undefined;
}> = ({ suggestions }) => {
  return (
    <>
      {suggestions?.length !== 0 && (
        <div className="search_result_resource_suggestion">
          {suggestions?.map((data) => {
            let url = "/";
            if (data.material_type === "Videos Lectures & Video Podcast") {
              url = `/resources/videos/${data.slug}`;
            } else if (data.material_type === "Class Notes") {
              url = `/resources/class-notes/${data.slug}`;
            } else if (data.material_type === "Audio Books & Audio Podcast") {
              url = `/resources/audio-books/${data.slug}`;
            } else if (data.material_type === "Books" || data.material_type === "e-Books") {
              url = `/resources/books/${data.slug}`;
            }
            else if (data.material_type === "Gamified Learning") {
              url = `/resources/gamified-learning/${data.slug}`;
            } else {
              url = "/";
            }
            return (
              <ResourceCard
                key={data.resource_id}
                image={
                  data.resource_image
                    ? data.resource_image
                    : DefaultResourceImage
                }
                author={data.author ?? ""}
                title={data.resource_name}
                rating={data.rating}
                totalReviews={data.reviews}
                // isUserLogin={true}
                url={`${url}?id=${data.resource_id}`}
                resourceType={data.material_type}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default SearchSuggestion;
