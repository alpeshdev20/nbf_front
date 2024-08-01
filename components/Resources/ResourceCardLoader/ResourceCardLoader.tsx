"use client";

//* Importing components
import React from 'react';
import Skeleton from 'react-loading-skeleton'

//* importing Css
import 'react-loading-skeleton/dist/skeleton.css'
import Style from "@/components/Resources/ResourceCardLoader/ResourceCardLoader.module.css";

//* Interface
interface ResourceCardLoaderInterface {
    counter: number;
}

const ResourceCardLoader: React.FC<ResourceCardLoaderInterface> = ({ counter }) => {
    const skeletons = [];

    for (let i = 0; i < counter; i++) {
        // Generate a unique key for each skeleton element
        const key = `skeleton-${i}`;
        skeletons.push(<div key={key} className={Style.skeleton}> <Skeleton className={Style.skeleton_box} /> <Skeleton className={Style.skeleton_line} /><Skeleton className={Style.skeleton_line} /><Skeleton className={Style.skeleton_line} /></div>);
    }

    return <>{skeletons}</>;
}

export default ResourceCardLoader