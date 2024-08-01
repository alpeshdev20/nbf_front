import React from "react";
import Link from "next/link";
import { FiLoader } from "react-icons/fi";

interface ButtonInterface {
  content?: string;
  link?: string;
  btnType?: "button" | "reset" | "submit";
  btnColor?: "primary" | "secondary" | "third";
  otherClass?: string;
  clickEventName?: (e: any) => void;
  disabled?: boolean;
  showLoadingButton?: boolean;
}

const Button: React.FC<ButtonInterface> = ({
  content,
  link,
  btnType,
  btnColor,
  otherClass,
  clickEventName,
  disabled,
  showLoadingButton = false,
}) => (
  <>
    {showLoadingButton && (
      <button
        type={btnType ? btnType : "button"}
        className={`btn ${btnColor} btn-loading`}
        disabled={true}
      >
        <FiLoader />
      </button>
    )}
    {!showLoadingButton && link && (
      <Link href={link} className={`btn ${btnColor} ${otherClass}`}>
        {content}
      </Link>
    )}
    {!showLoadingButton && !link && (
      <button
        type={btnType ? btnType : "button"}
        className={`btn ${btnColor} ${otherClass}`}
        onClick={clickEventName}
        disabled={disabled}
      >
        {content}
      </button>
    )}
  </>
);

export default Button;
