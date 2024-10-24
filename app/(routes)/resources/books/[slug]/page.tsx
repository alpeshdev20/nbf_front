"use client";

import React, { Suspense, useState, useEffect } from "react";
import Image from "next/image";
import ResourcesLayout from "../../resource-layout";
import StarRating from "@/components/StarRating/StarRating";
import ResourceDescription from "@/components/Resources/ResourceDescription/ResourceDescription";
import RelatedResources from "@/components/sliders/RelatedResources/RelatedResources";
import { getResourcesInfo } from "@/services/resources";
import Wishlist from "@/components/Resources/Wishlist/Wishlist";
import ShareResource from "@/components/Resources/ShareResource/ShareResource";
import ResourceInfoLoader from "@/components/Resources/ResourceInfoLoader/ResourceInfoLoader";
import NoDataFound from "@/components/NoDataFound/NoDataFound";
import ResourcePlayerButton from "@/components/Resources/ResourcePlayerButton/ResourcePlayerButton";
import { useRouter } from "next/navigation";
import styles from "./BookInfo.module.css";
import { useSession } from "@/providers/SessionProvider";


//* Icons
import ResourceTypeIcon from "@/images/categories/book-card-icon.png";
import { FaCaretRight } from "react-icons/fa";

//* Image
import DefaultResourceImage from "@/images/common/recommendation.png";

const ResourceDetails = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const { slug } = params;

  // State to check user login status
  const { session } = useSession();

  const { resourceInfo, isLoading } = getResourcesInfo(slug ?? "");

  const handleStartFreeTrial = () => {
    router.push("/sign-up");
  };

  return (
    <ResourcesLayout showAddBanner={false} showResourcesHighlights={false}>
      {isLoading && <ResourceInfoLoader />}
      {!isLoading && resourceInfo === null && <NoDataFound />}
      {!isLoading && resourceInfo !== null && (
        <div className="resouce-info-section">
          <div className="app-container">
            <div className="resources-info-container">
              <div className="resource-info">
                <div className="resource_image_container">
                  <Wishlist
                    isWishlisted={resourceInfo.wishlist ?? false}
                    resourceId={resourceInfo.slug}
                  />
                  <div className="resource_image">
                    <div className="resource_icon">
                      <Image src={ResourceTypeIcon} alt="Resource Icon" />
                    </div>
                    <Image
                      src={
                        resourceInfo.resource_image
                          ? resourceInfo.resource_image
                          : DefaultResourceImage
                      }
                      width={274}
                      height={421}
                      alt="Resource Image"
                    />
                  </div>
                  <ShareResource />
                </div>
                <div className="resource_content">
                  <div className="author_info">
                    <p>{resourceInfo.author}</p>
                    <h4>{resourceInfo.resource_name}</h4>
                    <div className="resource_criteria">
                      <p>
                        <FaCaretRight /> Published In {resourceInfo.year}
                      </p>
                      <p><FaCaretRight /> Copyright by {resourceInfo.publisher_name}</p>
                    </div>
                  </div>

                  {/* Player Button */}
                  {session.isLoggedIn ? (
                    <ResourcePlayerButton
                      format={resourceInfo.format ?? ""}
                      btnContext="Read Now"
                      resourceLink={resourceInfo.resource ?? ""}
                      resourceId={slug ?? ""}
                    />
                  ) : (
                    <button 
                    onClick={handleStartFreeTrial} 
                    className={styles.startFreeTrialButton} // Use the imported class
                  >
                    Start Free Trial
                  </button>
                  )}

                  <ul className="resource_other_info">
                    <li>ISBN Product Code - {resourceInfo.tags}</li>
                    <li>Format - {resourceInfo.format}</li>
                    <li>Language - {resourceInfo.language}</li>
                    <li>Pages - {resourceInfo.length}</li>
                    <li>Product Category - {resourceInfo.genre}</li>
                    <li>Contet Type  - {resourceInfo.material_category}</li>
                    <li>Age Gruop - {resourceInfo.age_text}</li>
                  </ul>
                </div>
              </div>
            </div>

            <ResourceDescription
              summary={resourceInfo.summary ?? ""}
              toc={resourceInfo.table_of_content ?? ""}
              authorDetails={resourceInfo.author_detail ?? ""}
            />

            <RelatedResources resourceId={slug} />
          </div>
        </div>
      )}
    </ResourcesLayout>
  );
};

const BookInfo = ({ params }: { params: { slug: string } }) => {
  return (
    <Suspense>
      <ResourceDetails params={params} />
    </Suspense>
  );
};

export default BookInfo;
