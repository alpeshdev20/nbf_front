"use client";

//* Importing components
import React, { Suspense } from "react";
import Image from "next/image";
import ResourcesLayout from "../../resource-layout";
import ResourceDescription from "@/components/Resources/ResourceDescription/ResourceDescription";
import RelatedResources from "@/components/sliders/RelatedResources/RelatedResources";
import { useSearchParams } from "next/navigation";
import { getResourcesInfo } from "@/services/resources";
import NoDataFound from "@/components/NoDataFound/NoDataFound";
import ResourceInfoLoader from "@/components/Resources/ResourceInfoLoader/ResourceInfoLoader";
import ShareResource from "@/components/Resources/ShareResource/ShareResource";
import Wishlist from "@/components/Resources/Wishlist/Wishlist";
import ResourcePlayerButton from "@/components/Resources/ResourcePlayerButton/ResourcePlayerButton";

//* Icons
import ResourceTypeIcon from "@/images/categories/class-card-icon.png";
import { FaCaretRight } from "react-icons/fa";

//* Image
import DefaultResourceImage from "@/images/common/recommendation.png";

const ResourceDetails = ({ params }: { params: { slug: string } }) => {
  // Extract slug from params
  const { slug } = params;

  // Fetch resource info based on slug
  const { resourceInfo, isLoading } = getResourcesInfo(slug ?? "");

  return (
    <>
      <ResourcesLayout showAddBanner={false} showResourcesHighlights={false}>
        {isLoading && <ResourceInfoLoader />}

        {!isLoading && resourceInfo === null && <NoDataFound />}

        {!isLoading && resourceInfo !== null && (
          <div className="resource-info-section">
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
                    <div className="author_info">
                      <p>{resourceInfo.author}</p>
                      <h4>{resourceInfo.resource_name}</h4>
                      <div className="resource_criteria">
                        <p>
                          <FaCaretRight /> Published In {resourceInfo.year}
                        </p>
                        <p>
                          <FaCaretRight /> Copyright by {resourceInfo.publisher_name}
                        </p>
                      </div>
                    </div>

                    {/* Player Button */}
                    <ResourcePlayerButton
                      format={resourceInfo.format ?? ""}
                      btnContext="Read Now"
                      resourceLink={resourceInfo.resource ?? ""}
                      resourceId={slug ?? ""}
                    />

                    <ul className="resource_other_info">
                      <li>Format - {resourceInfo.format}</li>
                      <li>Language - {resourceInfo.language}</li>
                      <li>Pages - {resourceInfo.length}</li>
                      <li>Product Category - {resourceInfo.genre}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Resource Description and Summary */}
              <ResourceDescription
                summary={resourceInfo.summary ?? ""}
                toc={resourceInfo.table_of_content ?? ""}
                authorDetails={resourceInfo.author_detail ?? ""}
              />

              {/* Related Resources */}
              <RelatedResources resourceId={slug} />
            </div>
          </div>
        )}
      </ResourcesLayout>
    </>
  );
};

const ClassNotesInfo = ({ params }: { params: { slug: string } }) => {
  return (
    <Suspense>
      <ResourceDetails params={params} />
    </Suspense>
  );
};

export default ClassNotesInfo;
