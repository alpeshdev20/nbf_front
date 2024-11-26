"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import K12ResourcesLayout from "../../resource-layout";
import StarRating from "@/components/StarRating/StarRating";
import ResourceDescription from "@/components/Resources/ResourceDescription/ResourceDescription";
import K12RelatedResources from "@/components/sliders/RelatedResources/K12RelatedResources";
import { getResourcesInfo } from "@/services/resources";
import Wishlist from "@/components/Resources/Wishlist/Wishlist";
import ShareResource from "@/components/Resources/ShareResource/ShareResource";
import ResourceInfoLoader from "@/components/Resources/ResourceInfoLoader/ResourceInfoLoader";
import NoDataFound from "@/components/NoDataFound/NoDataFound";
import ResourcePlayerButton from "@/components/Resources/ResourcePlayerButton/ResourcePlayerButton";
import { useRouter } from "next/navigation";
import styles from "./BookInfo.module.css";
import { useSession } from "@/providers/SessionProvider";
import PDF_E_reader  from  "@/components/Players/PdfReader/PDF_E_reader";
//* Icons
import ResourceTypeIcon from "@/images/categories/book-card-icon.png";
import { FaCaretRight } from "react-icons/fa";

//* Image
import DefaultResourceImage from "@/images/common/recommendation.png";
// import Ereader from "@/components/heightlight/Heighlight";
// import Ereader2 from "@/components/Ereader-backup/Ereader";
// import Ereader_b from "@/components/Ereader-backup/Ereader";

const ResourceDetails = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const { slug } = params;

  // State to check user login status
  const { session } = useSession();

  const userId = session?.user?.user_id;

  // State to control visibility of the ResourcePlayerButton section
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  const { resourceInfo, isLoading } = getResourcesInfo(slug ?? "");

  const handleStartFreeTrial = () => {
    router.push("/sign-up");
  };

  const togglePlayerVisibility = () => {
    setIsPlayerVisible((prev) => !prev); // Toggle the visibility state
  };

  return (
    <K12ResourcesLayout showAddBanner={false} showResourcesHighlights={false}>
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
                      <p>
                        <FaCaretRight /> Copyright by {resourceInfo.publisher_name}
                      </p>
                    </div>
                  </div>

                  {/* Toggle Player Button */}
                  {session.isLoggedIn ? (
                    <div>
                      <ResourcePlayerButton
                        format={resourceInfo.format ?? ""}
                        btnContext={isPlayerVisible ? "Close" : "Read Now"} // Toggle button text
                        resourceLink={resourceInfo.resource ?? ""}
                        resourceId={slug ?? ""}
                      />
                      
                      {/* This button triggers the visibility toggle */}
                      {/* <button
                        onClick={togglePlayerVisibility}
                        className={styles.togglePlayerButton}
                      >
                        {isPlayerVisible ? "Close Player" : "Open Player"}
                      </button> */}

                      {/* Conditionally render the player section based on state */}

                    </div>
                  ) : (
                    <button
                      onClick={handleStartFreeTrial}
                      className={styles.startFreeTrialButton}
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
                    <li>Content Type  - {resourceInfo.material_category}</li>
                    <li>Age Group - {resourceInfo.age_text}</li>
                  </ul>
                </div>
              </div>
            </div>

            <ResourceDescription
              summary={resourceInfo.summary ?? ""}
              toc={resourceInfo.table_of_content ?? ""}
              authorDetails={resourceInfo.author_detail ?? ""}
            />

            <K12RelatedResources resourceId={slug} />
          </div>
        </div>
      )}
    </K12ResourcesLayout>
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
