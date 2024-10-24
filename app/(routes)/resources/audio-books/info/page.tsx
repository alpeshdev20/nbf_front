"use client";

//* importing component;
import React, { Suspense } from "react";
import Image from "next/image";
import ResourcesLayout from "../../resource-layout";
import StarRating from "@/components/StarRating/StarRating";
import ResourceDescription from "@/components/Resources/ResourceDescription/ResourceDescription";
import RelatedResources from "@/components/sliders/RelatedResources/RelatedResources";
import { useSearchParams } from "next/navigation";
import { getResourcesInfo } from "@/services/resources";
import NoDataFound from "@/components/NoDataFound/NoDataFound";
import ResourceInfoLoader from "@/components/Resources/ResourceInfoLoader/ResourceInfoLoader";
import Wishlist from "@/components/Resources/Wishlist/Wishlist";
import ShareResource from "@/components/Resources/ShareResource/ShareResource";
import ResourceEpisodes from "@/components/Resources/ResourceEpisodes/ResourceEpisodes";
import ResourcePlayerButton from "@/components/Resources/ResourcePlayerButton/ResourcePlayerButton";

//* Icons
import ResourceTypeIcon from "@/images/categories/audio-card-icon.png";
import { FaCaretRight } from "react-icons/fa";

//*image
import DefaultResourceImage from "@/images/common/recommendation.png";

const ResourceDetails = () => {
  const params = useSearchParams();
  const resourceId = params.get("id");

  const { resourceInfo, isLoading } = getResourcesInfo(resourceId ?? "");

  return (
    <>
      <ResourcesLayout showAddBanner={false} showResourcesHighlights={false}>
        {isLoading && <ResourceInfoLoader />}

        {!isLoading && resourceInfo === null && <NoDataFound />}

        {!isLoading && resourceInfo !== null && (
          <div className="resouce-info-section">
            <div className="app-container">
              {/* Resource Info */}
              <div className="resources-info-container">
                <div className="resource-info">
                  <div className="resource_image_container">
                    <Wishlist
                      isWishlisted={resourceInfo.wishlist ?? false}
                      resourceId={resourceInfo.resource_id}
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
                    {/* <div className="resource_rating">
                      <StarRating rating={resourceInfo?.rating} />
                      <p>( {resourceInfo.reviews} Reviews)</p>
                    </div> */}
                    <div className="author_info">
                      <p>{resourceInfo.author}</p>
                      <h4>{resourceInfo.resource_name}</h4>
                      <div className="resource_criteria">
                        {/* <p>
                        <FaCaretRight /> For Kids - 03yrs - 08yrs
                      </p> */}
                        <p>
                          <FaCaretRight /> Published In {resourceInfo.year}
                        </p>
                        <p><FaCaretRight /> Copyright by {resourceInfo.publisher_name}</p>
                      </div>
                    </div>

                    <ResourcePlayerButton
                      format={resourceInfo.format ?? ""}
                      btnContext="Listen Now"
                      resourceLink={resourceInfo.resource ?? ""}
                      resourceId={resourceId ?? ""}
                    />

                    <ul className="resource_other_info">
                      {/* <li>ISBN Product Code - {resourceInfo.isbn_code}</li> */}
                      <li>Format - {resourceInfo.format}</li>
                      <li>Language - {resourceInfo.language}</li>
                      <li>Duration - {resourceInfo.length}</li>
                      <li>Product Category - {resourceInfo.genre}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Resource Description and Summary  */}
              <ResourceDescription
                summary={resourceInfo.summary ?? ""}
                toc={resourceInfo.table_of_content ?? ""}
                authorDetails={resourceInfo.author_detail ?? ""}
              />

              {/* Episodes  */}
              <ResourceEpisodes resourceId={params.get("id") ?? ""} />

              {/* Related Resources  */}
              <RelatedResources resourceId={params.get("id") ?? ""} />
            </div>
          </div>
        )}
      </ResourcesLayout>
    </>
  );
};

const AudioBookInfo = () => {
  return (
    <>
      <Suspense>
        <ResourceDetails />
      </Suspense>
    </>
  );
};

export default AudioBookInfo;
