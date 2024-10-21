"use client";

//* importng components
import React, { useEffect, useState } from "react";
import ResourceCard from "../ResourceCard/ResourceCard";
import { getResources } from "@/services/resources";
import Button from "@/components/ui/Button/Button";
import { useSession } from "@/providers/SessionProvider";
import ResourceCardLoader from "@/components/Resources/ResourceCardLoader/ResourceCardLoader";
import Filters from "@/components/Filters/Filters";
import NoDataFound from "@/components/NoDataFound/NoDataFound";

//* images
import DefaultResourceImage from "@/images/common/recommendation.png";

//* interface
import ResourcesInterface from "@/interfaces/Resources";
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

interface Option {
  value: number;
  label: string;
}

const ExploreSection: React.FC<ResourceCardInterface> = ({
  url,
  resourceType,
  requestURL,
}) => {
  const { session } = useSession();
  const [startFrom, setStartFrom] = useState<number>(0);
  const [resources, setResources] = useState<ResourcesInterface[]>([]);

  const [selectedAgeGroup, setSelectedAgeGroup] = useState<Option | null>(null);
  const [selectedGenres, setselectedGenres] = useState<Option | null>(null);
  const [showMoreClicked, setShowMoreClicked] = useState(false);

  const { resourceData, isLoading, isError, isSuccess } = getResources(
    startFrom,
    36,
    requestURL,
    selectedGenres?.value || 0,
    selectedAgeGroup?.value || 0
  );

  useEffect(() => {
    if (!isLoading && isSuccess) {
      if (showMoreClicked) {
        setResources([...resources, ...resourceData]);
        setShowMoreClicked(false);
      } else {
        setResources(resourceData);
      }
    }
  }, [
    resourceData,
    startFrom,
    isLoading,
    selectedGenres?.value,
    selectedAgeGroup?.value,
  ]);

  const showMore = () => {
    setShowMoreClicked(true);
    setStartFrom((prev) => prev + 36);
  };

  return (
    <>
      {/* Filters  */}
      <Filters
        setSelectedAgeGroup={setSelectedAgeGroup}
        setselectedGenres={setselectedGenres}
        selectedAgeGroup={selectedAgeGroup}
        selectedGenres={selectedGenres}
      />

      <div className="resources-explore-section">
        <div className="app-container">
          <h5>Explore More</h5>
          {!isLoading && resources.length === 0 && <NoDataFound />}
          <div className="resources-explore-container">
            {resources.length !== 0 &&
              resources.map((data) => (
                <ResourceCard
                  key={data.slug}
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
                      ? `${url}/${data.slug}`
                      : "/log-in"
                  }
                  resourceType={resourceType}
                />
              ))}
            {isLoading && <ResourceCardLoader counter={36} />}
          </div>
        </div>
      </div>
      {isSuccess && resourceData.length === 36 && (
        <div className="app-container">
          <div className="resource-show-more-button-container">
            <Button
              btnColor="secondary"
              btnType="button"
              content={isLoading ? "Loading please wait..." : "SHOW MORE"}
              clickEventName={showMore}
              disabled={isLoading || isError || !isSuccess}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ExploreSection;