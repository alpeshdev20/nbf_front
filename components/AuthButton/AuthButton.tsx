//* Impotring Components
import React from "react";
import Image, { StaticImageData } from "next/image";

//* Interface
interface AuthButtonInterface {
  img: StaticImageData;
  content: string;
}

//* css
import Style from "@/components/AuthButton/AuthButton.module.css";

const AuthButton: React.FC<AuthButtonInterface> = ({ img, content }) => {
  return (
    <div className={Style.auth_button}>
      <div className={Style.auth_img}>
        <Image src={img} alt={content} />
      </div>
      <p>{content}</p>
    </div>
  );
};

export default AuthButton;
