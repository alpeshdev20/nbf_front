"use client";

import React, { useEffect, useState } from "react";
import { useGetBlogs } from "@/services/blogs"; // Ensure this is the correct import
import Button from "@/components/ui/Button/Button";
import Image from "next/image";
import Style from "@/components/BlogCard/BlogCard.module.css";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

interface Blog {
  id: number;
  title: string;
  content: string;
  image: string;
  slug: string;
}

interface ExploreBlogsSectionProps {
  url: string;
  requestURL: string;
}

const ExploreBlogsSection: React.FC<ExploreBlogsSectionProps> = ({
  url,
  requestURL,
}) => {
  const [startFrom, setStartFrom] = useState(0);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { blogData, isLoading, isError, isSuccess } = useGetBlogs(startFrom, 36, requestURL);

  useEffect(() => {
    if (isSuccess && blogData.length > 0) {
      setBlogs((prevBlogs) => {
        const updatedBlogs: Blog[] = [...prevBlogs, ...blogData] as Blog[];

        const uniqueBlogs = updatedBlogs.reduce((acc: Blog[], blog: Blog) => {
          if (!acc.some((b) => b.id === blog.id)) {
            acc.push(blog);
          }
          return acc;
        }, []);

        return uniqueBlogs;
      });

      if (blogData.length < 36) {
        setHasMore(false);
      }
    }
  }, [blogData, isSuccess]);

  const loadMoreBlogs = () => {
    setStartFrom((prev) => prev + 36);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching blogs. Please try again later.</p>;
  }

  // Function to truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <>
      {blogs.length > 0 ? (
        blogs.map((item) => (
          <div key={item.id} className={Style.blog_card}>
            <div className={Style.blog_image}>
              <Image src={item.image} alt="Blog Image" width={500} height={300} />
            </div>
            <div className={Style.blog_content}>
              <h6>{item.title}</h6>
              <p dangerouslySetInnerHTML={{ __html: truncateText(item.content, 30) }} /> {/* Render truncated content */}
              <p>Prerna Mukharjee 20 Dec 2021</p>
              <Link href={`/blogs/${item.slug}`}>
                Read more <FaArrowRight />
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No blogs available</p>
      )}

      {hasMore && !isLoading && (
        <div className="show-more-button-container">
          <Button btnType="button" btnColor="secondary" content="Show More" clickEventName={loadMoreBlogs} />
        </div>
      )}

      {!hasMore && <p>No more blogs available.</p>}
    </>
  );
};

export default ExploreBlogsSection;
