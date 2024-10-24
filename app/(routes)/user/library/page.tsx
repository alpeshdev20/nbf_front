"use client";

//* Compoonents
import React from "react";
import UserLayout from "../user-layout";
import WishListAndLibraryResourceCard from "@/components/Resources/WishListAndLibraryResourceCard/WishListAndLibraryResourceCard";
import { getUsersLibrary } from "@/services/resources";
import NoDataFound from "@/components/NoDataFound/NoDataFound";
import ResourceCardLoader from "@/components/Resources/ResourceCardLoader/ResourceCardLoader";

//* Icons
import LibraryIcon from "@/icons/library.png";

//* images
import DefaultResourceImage from "@/images/common/recommendation.png";

const Library = () => {
  const { libraryData, isLoading } = getUsersLibrary();

  return (
    <UserLayout pageIcon={LibraryIcon} pageTitle="Library">
      <section className="user-library-section">
        <div className="user-library-contianer">
          {!isLoading && libraryData.length === 0 && <NoDataFound />}
          <div className="user-library-card-container">
            {isLoading && <ResourceCardLoader counter={15} />}
            {!isLoading &&
              libraryData.length !== 0 &&
              libraryData.map((data) => {
                let url = "/";
                if (data.material_type === "Videos") {
                  url = `/resources/videos/${data.slug}`;
                } else if (data.material_type === "Class Notes") {
                  url = `/resources/class-notes/${data.slug}`;
                } else if (data.material_type === "Audio Books") {
                  url = `/resources/audio-books/${data.slug}`;
                } else if (data.material_type === "Books" || data.material_type === "e-Books") {
                  url = `/resources/books/${data.slug}`;
                } else {
                  url = "/";
                }
                

                return (
                  <WishListAndLibraryResourceCard
                    detailContext="Read Now"
                    resourceId={data.resource_id}
                    // removeContext="Remove"
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
                    pageURL={`${url}`}
                    resourceType={data.material_type}
                  />
                );
              })}
          </div>
        </div>
      </section>
    </UserLayout>
  );
};

export default Library;
