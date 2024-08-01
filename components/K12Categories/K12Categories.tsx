//* Importing Components
import React from "react";
import Link from "next/link";

//* Importing Interface
interface K12CategoriesInterface {
  title: string;
  url: string;
}

//* css
import Style from "@/components/K12Categories/K12Categories.module.css";

//* Icons
import { FaChevronRight } from "react-icons/fa";

const K12Categories: React.FC<K12CategoriesInterface> = ({ title, url }) => {
  return (
    <Link href={url} className={Style.card}>
      <p>{title}</p>
      <FaChevronRight />
    </Link>
  );
};

export default K12Categories;
