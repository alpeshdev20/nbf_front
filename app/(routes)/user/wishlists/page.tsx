"use client";

//* Compoonents
import React from "react";
import UserLayout from "../user-layout";
import WishListAndLibraryResourceCard from "@/components/Resources/WishListAndLibraryResourceCard/WishListAndLibraryResourceCard";
import { getUsersWishlists } from "@/services/resources";

//* Icons
import WishlistIcon from "@/icons/wishlist.png";

//* images
import DefaultResourceImage from "@/images/common/recommendation.png";
import ResourceCardLoader from "@/components/Resources/ResourceCardLoader/ResourceCardLoader";
import NoDataFound from "@/components/NoDataFound/NoDataFound";

const Wishlists = () => {
  const { wishlistsData, isLoading } = getUsersWishlists();

  return (
    <UserLayout pageIcon={WishlistIcon} pageTitle="Wishlist">
      <section className="user-library-section">
        <div className="user-library-contianer">
        {!isLoading && wishlistsData.length === 0 && <NoDataFound />}
          <div className="user-library-card-container">
            {isLoading && <ResourceCardLoader counter={15} />}
            {!isLoading &&
              wishlistsData.length !== 0 &&
              wishlistsData.map((data) => {
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
                    resourceId={data.slug as string}
                    removeContext="Remove"
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

export default Wishlists;
