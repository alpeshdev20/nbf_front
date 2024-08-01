//* import components
import React from "react";
import Image from "next/image";

//* Import image
import BlogImage from "@/public/images/common/blog.jpg";

//* css
import Style from "@/components/BlogCard/BlogCard.module.css";
import Link from "next/link";

//* icons
import { FaArrowRight } from "react-icons/fa6";

const BlogCard = () => {
  return (
    <div className={Style.blog_card}>
      <div className={Style.blog_image}>
        <Image src={BlogImage} alt="Blog Image" />
      </div>
      <div className={Style.blog_content}>
        <h6>Education socializes children into society</h6>
        <p>
          Education socializes children into society by teaching cultural values
          and norms. It equips them with the skills needed to become
          productive...
        </p>
        <p>Prerna Mukharjee 20 Dec 2021</p>
        <Link href="/blog-info">
          Read more <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
