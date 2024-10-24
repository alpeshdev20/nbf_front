"use client";

import React, { useEffect, useState } from "react";
import { useGetBlogBySlug } from "@/services/blogs"; // Ensure this is the correct import
import Image from "next/image";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import BlogsInterface from "@/interfaces/blogs";
import styles from "./BlogPage.module.css"; // Import CSS module for styling

const BlogPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { blogData: fetchedBlogData, isLoading, isError } = useGetBlogBySlug(slug ?? "");
  const [blogData, setBlogData] = useState<BlogsInterface | null>(null);

  // Update local state when fetched data changes
  useEffect(() => {
    if (fetchedBlogData) {
      setBlogData(fetchedBlogData);
    }
  }, [fetchedBlogData]);

  // Check loading state
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Check error state or if blogData is null
  if (isError || !blogData) {
    return <p>Error fetching blog. Please try again later.</p>;
  }

  return (
    <>
      <Navbar
        navType="main"
        btnClass="primary"
        btnURL="/explore-k12"
        btnContent="EXPLORE K12/SCHOOL"
      />
      <div className={styles.blogContainer}>
        <h2 className={styles.blogTitle}>{blogData.title}</h2>
        <Image
          src={blogData.image}
          alt={blogData.title}
          layout="responsive"
          width={600}
          height={400}
          className={styles.blogImage}
        />
        <div
          className={styles.blogContent}
          dangerouslySetInnerHTML={{ __html: blogData.content }}
        />
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default BlogPage;
