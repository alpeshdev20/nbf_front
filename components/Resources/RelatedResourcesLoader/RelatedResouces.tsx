"use client";

//* Importing components
import React from "react";
import Skeleton from "react-loading-skeleton";

//* importing Css
import "react-loading-skeleton/dist/skeleton.css";
import Style from "@/components/Resources/ResourceInfoLoader/ResourceInfoLoader.module.css";

const RelatedResourceLoader = () => {
  return (
    <div className="releated_resources_section">
      <h4>
        <Skeleton className={Style.title} />
      </h4>

      <div className={Style.related_books_container}>
        <Skeleton className={Style.related_books} />
        <Skeleton className={Style.related_books} />
        <Skeleton className={Style.related_books} />
        <Skeleton className={Style.related_books} />
        <Skeleton className={Style.related_books} />
        <Skeleton className={Style.related_books} />
        <Skeleton className={Style.related_books} />
      </div>
    </div>
  );
};

export default RelatedResourceLoader;
