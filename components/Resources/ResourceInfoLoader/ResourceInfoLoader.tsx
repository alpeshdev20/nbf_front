"use client";

//* Importing components
import React from "react";
import Skeleton from "react-loading-skeleton";

//* importing Css
import "react-loading-skeleton/dist/skeleton.css";
import Style from "@/components/Resources/ResourceInfoLoader/ResourceInfoLoader.module.css";

const ResourceInfoLoader = () => {
  return (
    <div className="resouce-info-section">
      <div className="app-container">
        {/* Resource Info */}
        <div className="resources-info-container">
          <div className="resource-info">
            <div className="resource_image_container">
              <div className="resource_wishlist">
                <Skeleton />
                <p>
                  <Skeleton className={Style.resource_wishlist} />
                </p>
              </div>
              <div className="resource_image">
                <Skeleton className={Style.resource_image} />
              </div>
              <div className="share_resource">
                <p>
                  <Skeleton className={Style.share_resource} />
                </p>
              </div>
            </div>
            <div className="resource_content">
              <div className="resource_rating">
                <p>
                  <Skeleton className={Style.resource_rating} />
                </p>
              </div>
              <div className="author_info">
                <p>
                  <Skeleton className={Style.resource_details} />
                </p>
                <h4>
                  <Skeleton className={Style.resource_details} />
                </h4>
                <div className="resource_criteria">
                  <p>
                    <Skeleton className={Style.resource_details} />
                  </p>
                  <p>
                    <Skeleton className={Style.resource_details} />
                  </p>
                  <p>
                    <Skeleton className={Style.resource_details} />
                  </p>
                </div>
              </div>

              <div className="resource_action_container">
                <Skeleton className={Style.action_button} />
              </div>

              <ul
                className={`resource_other_info ${Style.resource_other_info}`}
              >
                <li>
                  <Skeleton />
                </li>
                <li>
                  <Skeleton />
                </li>
                <li>
                  <Skeleton />
                </li>
                <li>
                  <Skeleton />
                </li>
                <li>
                  <Skeleton />
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Resource Description and Summary  */}
        <Skeleton className={Style.discription} />
      </div>
    </div>
  );
};

export default ResourceInfoLoader;
