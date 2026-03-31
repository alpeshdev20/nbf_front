
import NbfForPublishersAuthors from "./NbfForPublishersAuthors";
// Metdadata
import { Metadata } from "next";

//* Metadata
export const metadata: Metadata = {
  title: "NetbookFlix for Publishers & Authors: Partnering for Education",
  description: "Partner with NetbookFlix to distribute your educational content. Reach schools, educators, and students through our innovative platform.",
};
const NbfForPublishers = () => {

  return (
    <>
      <NbfForPublishersAuthors />
    </>
  );
};

export default NbfForPublishers;
