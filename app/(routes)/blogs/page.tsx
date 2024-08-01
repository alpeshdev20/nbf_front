//* Importing Component
import React from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar/Navbar";
import NewsLetter from "@/components/NewsLetter/NewsLetter";
import Footer from "@/components/layout/Footer/Footer";
import BlogCard from "@/components/BlogCard/BlogCard";
import Button from "@/components/ui/Button/Button";

const Blogs = () => {
  return (
    <>
      {/* Navbar  */}
      <Navbar
        navType="main"
        btnClass="primary"
        btnURL="/explore-k12"
        btnContent="EXPLORE K12/SCHOOL"
      />

      {/* Blogs  */}
      <div className="blogs-section">
        <div className="app-container">
          <h4>Our Blogs</h4>
          <div className="blog-card-container">
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>

          <div className="blog-button-container">
            <Button btnType="button" btnColor="secondary" content="SHOW MORE" />
          </div>
        </div>
      </div>

      {/* News Letter  */}
      <NewsLetter />

      {/* Footer  */}
      <Footer />
    </>
  );
};

export default Blogs;
