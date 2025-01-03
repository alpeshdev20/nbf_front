import React from "react";
import Navbar from "@/components/layout/Navbar/Navbar";
import NewsLetter from "@/components/NewsLetter/NewsLetter";
import Footer from "@/components/layout/Footer/Footer";
import ExploreBlogsSection from "@/components/blogs/ExploreBlogsSection";
import { Metadata } from "next";
 
//* Metadata
 export const metadata: Metadata = {
  title: "NetbookFlix Blog: Insights on Education and Technology",
  description: "Stay updated with the latest trends, tips, and insights in education, technology, and innovation through the NetbookFlix blog.",
};

const Blogs = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar
        navType="main"
        btnClass="primary"
        btnURL="/explore-k12"
        btnContent="EXPLORE K12/SCHOOL"
      />
       <h1 className="h1-home-screen-seo">
            Blogs | Netbookflix
       </h1>
      {/* Blogs Section */}
      <div className="blogs-section">
        <div className="app-container">
          <h4>Our Blogs</h4>
          <div className="blog-card-container">
            <ExploreBlogsSection
              url="/blogs"  // Pass the API URL to fetch blogs
              requestURL="blogs"  // The relative URL path for blogs
            />
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <NewsLetter />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Blogs;