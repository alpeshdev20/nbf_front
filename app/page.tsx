//* Importing Component
import Navbar from "@/components/layout/Navbar/Navbar";
import Image from "next/image";
import Head from 'next/head'; // Import Head for meta tags
import Naisa from "@/components/ExploreNaisa/Naisa";
import SubscriptionWithCategory from "@/components/SubscriptionWithCategory/SubscriptionWithCategory";
import Partners from "@/components/sliders/Partners/Partners";
import NewsLetter from "@/components/NewsLetter/NewsLetter";
import Footer from "@/components/layout/Footer/Footer";
import Testimonials from "@/components/sliders/Testimonials/Testimonials";
import RecommandationHome from "@/components/sliders/RecommandationHome/RecommandationHome";
import HomeHero from "@/components/HomeHero/HomeHero";
import type { Metadata } from "next";
import { checkNewUser } from "@/services/authService"; // Import the service

//* Metadata
export const metadata: Metadata = {
  title: "Your Online Bookstore for Instant Reading Anywhere, Anytime",
  description: "Netbookflix: A digital textbook platform with the best audio books, video books, and online textbooks for easy, convenient reading anytime. ",
};
//* Importing Image
import TickIcon from "@/icons/tick.png";
import dynamic from "next/dynamic";
// Lazy load the client-side check
const CheckNewUserBanner = dynamic(() => import("@/components/CheckNewUserBanner/CheckNewUserBanner"), {
  ssr: false,
})
export default function Home() {
  const isNewUser = checkNewUser(); // Call the service function
console.log('====================================');
console.log("isNewUser" ,isNewUser);
console.log('====================================');
  return (
    <>
      {/* navbar  */}
      <div className="fiexd-navbar">
        <Navbar
          navType="home"
          btnClass="primary"
          btnURL="/explore-k12"
          btnContent="EXPLORE K12/SCHOOL"
        />
      </div>
     

     {/* Client Component for Checking New User */}
     <CheckNewUserBanner />
      {/* Banner  */}
      <HomeHero />

        <h1 className="h1-home-screen-seo">
             Best online Learning Resources subscription platform
        </h1>
      <div className="home-features-section">
        {/* Explore  naisa  */}
        <Naisa />

        {/* subscriptions */}
        <SubscriptionWithCategory bgType="higher-edu" icon={TickIcon} />

        {/* Partners  */}
        <Partners />
      </div>

      {/* Recommandation  */}
      <RecommandationHome />

      {/* Testimonials  */}
      <Testimonials />

      {/* News Letter  */}
      <NewsLetter />

      {/* Footer  */}
      <Footer />
    </>
  );
}