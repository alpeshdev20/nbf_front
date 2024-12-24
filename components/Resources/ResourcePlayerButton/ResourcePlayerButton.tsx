"use client";

//* importing components
import AudioPlayer from "@/components/Players/AudioPlayer/AudioPlayer";
import EpubPlayer from "@/components/Players/EpubReader/EpubReader";
import PdfReader from "@/components/Players/PdfReader/PdfReader";
import VideoPlayer from "@/components/Players/VideoPlayer/VideoPlayer";
import Button from "@/components/ui/Button/Button";
import { errorToast } from "@/utils/toast_helper";
import React, { useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { post } from "@/utils/fetch";
import { isResourceRead } from "@/services/UsersStats";
import PDF_E_reader from "@/components/Players/PdfReader/PDF_E_reader";
import { useSession } from "@/providers/SessionProvider";
import E_pub_Reader from "@/components/Players/Epubs/containers/Reader"
import Selection from "@/components/Players/Epubs/Epub_custom/Selection";

//* interface
interface ResourcePlayerButtonInterface {
  format: string;
  btnContext: string;
  resourceLink: string;
  resourceId: string;
}

const time = 2000;

const ResourcePlayerButton: React.FC<ResourcePlayerButtonInterface> = ({
  format,
  btnContext,
  resourceLink,
  resourceId,
}) => {

  useEffect(() => {
    // Disable right-click globally
    const disableContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    // Attach the event listener on mount
    document.addEventListener('contextmenu', disableContextMenu);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
    };
  }, []);
  const [showFormat, setShowFormat] = useState<string>("");

  const [open, setOpen] = useState(false);

  const onCloseModal = () => setOpen(false);

   // State to check user login status
   const { session } = useSession();  
  //  console.log("userId in resource player module" ,userId);
  //  console.log("resourceId in resource player module" ,resourceId);

  const handleResourcePlayer = ({ params }: { params: { slug: string } }) => {    
    setShowFormat(format);
    if (!format) {
      errorToast("Failed to load file, please try again later.");
      return false;
    } else {
      if (!resourceLink) {
        errorToast("Please uprgade your plan to access this resource");
        return false;
      } else {
        setOpen(true);
        console.log("show format ", format);
      }
    }
  };
  

  //* Updating User Reading stats
  const updateUserReadingStats = (pageNumber: string) => {
    post(`${process.env.API_URL}users-stats/update-book-read-stats`, {
      id: resourceId,
      page_number: pageNumber,
    })
      .then((data) => {})
      .catch((error) => {});
  };

  //* Updating User and book stats
  const updateUserAndBookStats = (time: string) => {
    post(`${process.env.API_URL}users-stats/update-book-stats`, {
      id: resourceId,
      read_time: time,
    })
      .then((data) => {})
      .catch((error) => {});
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        closeOnOverlayClick={false}
        modalId={
          format === "pdf" || format === "epub"
            ? "modal_pdf_epub_reader"
            : format === "mp3"
            ? "modal_audio_player"
            : "modal_media_player"
        }
      >
        {showFormat === "pdf" && (
          // <PdfReader
          //   resource={resourceLink}
          //   resourceId={resourceId}
          //   updateUserReadingStats={updateUserReadingStats}
          //   updateUserAndBookStats={updateUserAndBookStats}
          // />
          <PDF_E_reader
           resource={resourceLink}
           resourceId={resourceId} 
            fileUrl={resourceLink}
            // userId={userId}
            book_id ={resourceId ?? ""}
            updateUserReadingStats={updateUserReadingStats}
            updateUserAndBookStats={updateUserAndBookStats}
            />
        )}
        {showFormat === "mp3" && (
          <AudioPlayer resource={resourceLink} 
           format={format} 
           resourceId={resourceId}
           updateUserReadingStats={updateUserReadingStats}
           updateUserAndBookStats={updateUserAndBookStats}
          />
        )}
        {showFormat === "mp4" && (
          <VideoPlayer resource={resourceLink} 
          format={format} 
          resourceId={resourceId}
          updateUserAndBookStats={updateUserAndBookStats}
          />
        )}

        {showFormat === "epub" && (
          // <EpubPlayer
          //   resource={resourceLink}
          //   resourceId={resourceId}
          //   updateUserReadingStats={updateUserReadingStats}
          //   updateUserAndBookStats={updateUserAndBookStats}
          // />

          <div className="hello" style={{ marginTop: '13px' }}>
          {/* <E_pub_Reader
            url={resourceLink ?? ""}
            // resource={slug}
            book_id={resourceId ?? ""}
            // resourceId={slug ?? ""}
            // updateUserReadingStats={updateUserReadingStats}
            updateUserAndBookStats={updateUserAndBookStats}
          /> */}

            <Selection 
                resourceLink={resourceLink ?? ""}   
                title={resourceId ?? ""}
                book_id ={resourceId ?? ""}
      
            />
        </div>
        )}
      </Modal>

      <div className="resource_action_container">
        <Button
          btnColor="secondary"
          btnType="button"
          content={btnContext}
          clickEventName={handleResourcePlayer}
        />
      </div>
    </>
  );
};

export default ResourcePlayerButton;