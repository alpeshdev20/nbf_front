//* Importing Component
import Navbar from "@/components/layout/Navbar/Navbar";
import Image from "next/image";
import Naisa from "@/components/ExploreNaisa/Naisa";
import SubscriptionWithCategory from "@/components/SubscriptionWithCategory/SubscriptionWithCategory";
import Partners from "@/components/sliders/Partners/Partners";
import NewsLetter from "@/components/NewsLetter/NewsLetter";
import Footer from "@/components/layout/Footer/Footer";
import Testimonials from "@/components/sliders/Testimonials/Testimonials";
import RecommandationHome from "@/components/sliders/RecommandationHome/RecommandationHome";
import HomeHero from "@/components/HomeHero/HomeHero";

//* Importing Image
import TickIcon from "@/icons/tick.png";

export default function Home() {
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

      {/* Banner  */}
      <HomeHero />

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