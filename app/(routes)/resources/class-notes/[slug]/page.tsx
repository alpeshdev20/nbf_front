"use client";

//* Importing components
import React, { Suspense, useState } from "react";
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
import { useRouter } from "next/navigation";
import styles from "./BookInfo.module.css";
import { useSession } from "@/providers/SessionProvider";

//* Icons
import ResourceTypeIcon from "@/images/categories/class-card-icon.png";
import { FaCaretRight } from "react-icons/fa";

//* Image
import DefaultResourceImage from "@/images/common/recommendation.png";
import PDF_E_reader from "@/components/Players/PdfReader/PDF_E_reader";
import { post } from "@/utils/fetch";

const ResourceDetails = ({ params }: { params: { slug: string } }) => {
  // Extract slug from params
  const { slug } = params;
  const router = useRouter();
  const { session } = useSession();
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  // Fetch resource info based on slug
  const { resourceInfo, isLoading } = getResourcesInfo(slug ?? "");

  const handleStartFreeTrial = () => {
    router.push("/sign-up");
  };
  
  const togglePlayerVisibility = () => {
    setIsPlayerVisible((prev) => !prev); // Toggle the visibility state
  };

  //* Updating User Reading stats
  const updateUserReadingStats = (pageNumber: string) => {
    post(`${process.env.API_URL}users-stats/update-book-read-stats`, {
      id: slug,
      page_number: pageNumber,
    })
      .then((data) => {})
      .catch((error) => {});
  };

  //* Updating User and book stats
  const updateUserAndBookStats = (time: string) => {
    post(`${process.env.API_URL}users-stats/update-book-stats`, {
      id: slug,
      read_time: time,
    })
      .then((data) => {})
      .catch((error) => {});
  };
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
                    {/* Toggle Player Button */}
                    {session.isLoggedIn ? (
                      <div>
                        {resourceInfo.format === "pdf" ? (
                          <>
                            <button
                              onClick={togglePlayerVisibility}
                              className={styles.ready_now_btn}
                            >
                              {isPlayerVisible ? 'Close Player' : 'Read Now'}
                            </button>

                            {isPlayerVisible && (
                              <div className={styles.playerContainer}>
                                <button
                                  style={{
                                    background: 'var(--secondary-color)',
                                    color: 'var(--white)',
                                  }}
                                  onClick={togglePlayerVisibility}
                                  className={styles.togglePlayerButton}
                                >
                                  Close Player
                                </button>

                                <div style={{ marginTop: '13px' }}>
                                  <PDF_E_reader
                                    fileUrl={resourceInfo.resource ?? ""}
                                    resource={slug}
                                    book_id={slug ?? ""}
                                    resourceId={slug ?? ""}
                                    updateUserReadingStats={updateUserReadingStats}
                                    updateUserAndBookStats={updateUserAndBookStats}
                                  />
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <ResourcePlayerButton
                            format={resourceInfo.format ?? ""}
                            btnContext={isPlayerVisible ? "Close" : "Read Now"} // Toggle button text
                            resourceLink={resourceInfo.resource ?? ""}
                            resourceId={slug ?? ""}
                          />
                        )}
                      </div>
                    ) : (
                      <button 
                        onClick={handleStartFreeTrial}
                        className={styles.ready_now_btn}
                      >
                        Start Free Trial
                      </button>
                    )}

                    <ul className="resource_other_info">
                      <li>Format - {resourceInfo.format}</li>
                      <li>Language - {resourceInfo.language}</li>
                      <li>Pages - {resourceInfo.length}</li>
                      <li>Product Category - {resourceInfo.genre}</li>
                      <li>Content Type  - {resourceInfo.mat_category}</li>
                      <li>Age Group - {resourceInfo.age_text}</li>
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
