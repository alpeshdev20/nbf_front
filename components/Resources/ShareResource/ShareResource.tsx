//* importing Components
import React from "react";
import Image from "next/image";
import { successToast } from "@/utils/toast_helper";

//* Icons
import ShareIcon from "@/icons/share.png";

const ShareResource = () => {
  const handleCopyUrl = () => {
    const urlToCopy = window.location.href;
    navigator.clipboard.writeText(urlToCopy);
    successToast("Link copied successfully");
  };

  return (
    <div className="share_resource" onClick={handleCopyUrl}>
      <Image src={ShareIcon} alt="Share Icon" /> <p>Share</p>
    </div>
  );
};

export default ShareResource;
