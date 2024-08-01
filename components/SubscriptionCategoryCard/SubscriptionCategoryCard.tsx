//* Importing Images
import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

//* Interface
interface SubscriptionCategoryCardInterface {
  icon: StaticImageData;
  title?: string;
  url: string;
}

//* Importing Css
import Style from "@/components/SubscriptionCategoryCard/SubscriptionCategoryCard.module.css";

const SubscriptionCategoryCard: React.FC<SubscriptionCategoryCardInterface> = ({
  icon,
  title,
  url,
}) => {
  return (
    <Link href={url} className={Style.card}>
      <div className={Style.card_icon}>
        <Image src={icon} alt={`${title} icon`} />
      </div>

      <div className={Style.card_content}>
        <p>{title}</p>
      </div>
    </Link>
  );
};

export default SubscriptionCategoryCard;
