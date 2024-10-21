"use client";

//*  importing components
import React from "react";
import ResourceCard from "../ResourceCard/ResourceCard";
import { getResources } from "@/services/resources";
import { useSession } from "@/providers/SessionProvider";

//* images
import DefaultResourceImage from "@/images/common/recommendation.png";
import ResourceCardLoader from "@/components/Resources/ResourceCardLoader/ResourceCardLoader";

//* interface
interface ResourceCardInterface {
  url: string;
  requestURL: string;
  resourceType:
    | "Books"
    | "Audio Books"
    | "Videos"
    | "Class Notes"
    | "Ar/Vr"
    | "Gamefied";
}

const ContinueWatching: React.FC<ResourceCardInterface> = ({
  url,
  resourceType,
  requestURL,
}) => {
  const { session } = useSession();

  //* Getting Books
  const { resourceData, isLoading } = getResources(0, 0, requestURL, 0, 0);

  {
    isLoading && <ResourceCardLoader counter={6} />;
  }

  if (!isLoading && session.isLoggedIn && resourceData.length !== 0) {
    return (
      <div className="resources-watch-lists-section books">
        <div className="app-container">
          <h5>Continue Listening</h5>

          <div className="resources-watch-lists-container">
            {resourceData?.map((data) => {
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
                  isUserLogin={session.isLoggedIn}
                  url={
                    session.isLoggedIn
                      ? `${url}?id=${data.resource_id}`
                      : "/log-in"
                  }
                  resourceType={resourceType}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (!isLoading && !session.isLoggedIn) {
    return <></>;
  }
};

export default ContinueWatching;
