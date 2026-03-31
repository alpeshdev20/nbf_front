import { Metadata } from "next";
import { getResourcesMetaInfo } from "@/services/resources"; // Use the correct server function
import AudioBookInfo from "./AudioBookInfo"; // Import your component

interface Props {
  params: { slug: string }; // Get the slug from the URL params
}

// This is for generating the metadata (SSR/SSG)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Fetch metadata using the API function (which is already async)
  const { resourceInfo, isLoading, isError, isSuccess } = await getResourcesMetaInfo(params.slug);
  // Returning the metadata for the page (SEO)
  return {
    title: resourceInfo?.meta_title || "Netbookflix", // Default if meta_title doesn't exist
    description: resourceInfo?.meta_description || "Netbookflix", // Default description
    openGraph: {
      title: resourceInfo?.meta_title || "Netbookflix",
      description: resourceInfo?.meta_description || "Netbookflix",
      images: [{ url: resourceInfo?.resource_image || "/default-image.jpg" }], // Default image if none
    },
  };
}

// This is for rendering the page
export default async function Page({ params }: Props) {
  return <AudioBookInfo params={params} />;
}
