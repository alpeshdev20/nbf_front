"use client";
import 'regenerator-runtime/runtime';
import React, { useState, Suspense, useEffect } from "react";
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
import { decryption } from "@/services/decryption";
//* Icons
import ResourceTypeIcon from "@/images/categories/book-card-icon.png";
import { FaCaretRight } from "react-icons/fa";

//* Image
import DefaultResourceImage from "@/images/common/recommendation.png";
import PDF_E_reader from "@/components/Players/PdfReader/PDF_E_reader";
import { errorToast } from "@/utils/toast_helper";
import { post } from "@/utils/fetch";
import { MdMargin } from "react-icons/md";
// import Ereader from "@/components/heightlight/Heighlight";
// import Ereader2 from "@/components/Ereader-backup/Ereader";
// import Ereader_b from "@/components/Ereader-backup/Ereader";

const ResourceDetails = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const { slug } = params;

  //decrpte url State
  const [decryptedurl, Setdecryptedurl] = useState<string | null>(null);
  // State to check user login status
  const { session } = useSession();

  const userId = session?.user?.user_id;
  // console.log("userId in bookumoduel componenets" ,userId);
  // console.log("resourceId in bookumoduel componenets" ,slug);


  // State to control visibility of the ResourcePlayerButton section
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  const { resourceInfo, isLoading } = getResourcesInfo(slug ?? "");

  const [showFormat, setShowFormat] = useState<string>("");

  const handleStartFreeTrial = () => {
    router.push("/sign-up");
  };

  useEffect(() => {  
    // Check if resourceInfo is not null and has the resource property
    if (resourceInfo && resourceInfo.resource) {
       const decryptedurlData =  decryption(resourceInfo.resource)

       Setdecryptedurl(decryptedurlData);
      
    } else {
      console.warn('resourceInfo is null or does not have a resource property');
    }
  }, [resourceInfo]);
  
  const togglePlayerVisibility = (format: string, resourceLink: string) => {
    
    if (!format) {
      errorToast("Failed to load file, please try again later.");
      return;
    }
    if (!resourceLink) {
      errorToast("Please upgrade your plan to access this resource.");
      return;
    }
    setIsPlayerVisible((prev) => !prev); // Toggle the player visibility
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
                      <p>
                        <FaCaretRight /> Copyright by {resourceInfo.publisher_name}
                      </p>
                    </div>
                  </div>

                 {/* Toggle Player Button */}
                    {session.isLoggedIn ? (
                      <div>
                        {resourceInfo.format === "pdf" ? (
                          <>
                            <button
                        onClick={() =>
                          togglePlayerVisibility(
                            resourceInfo.format ?? "",
                            resourceInfo.resource ?? ""
                          )
                        }
                        className={styles.ready_now_btn}
                      >
                        {isPlayerVisible ? "Close Player" : "Read Now"}
                      </button>

                            {isPlayerVisible && (
                              <div className={styles.playerContainer}>
                                <button
                                  style={{
                                    background: 'var(--secondary-color)',
                                    color: 'var(--white)',
                                  }}
                                  onClick={() => setIsPlayerVisible(false)}
                                  className={styles.togglePlayerButton}
                                >
                                  Close Player
                                </button>

                                <div style={{ marginTop: '13px' }}>
                                  <PDF_E_reader
                                    fileUrl={decryptedurl ?? ""}
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
                        ) :
                        (
                          <ResourcePlayerButton
                            format={resourceInfo.format ?? ""}
                            btnContext={isPlayerVisible ? "Close" : "Read Now"} // Toggle button text
                            resourceLink={decryptedurl ?? ""}
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
