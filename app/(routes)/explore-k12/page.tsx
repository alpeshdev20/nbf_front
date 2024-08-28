//* Importing Component
import Navbar from "@/components/layout/Navbar/Navbar";
import Image from "next/image";
import Naisa from "@/components/ExploreNaisa/Naisa";
import SubscriptionWithCategory from "@/components/SubscriptionWithCategory/SubscriptionWithCategory";
import Partners from "@/components/sliders/Partners/Partners";
import NewsLetter from "@/components/NewsLetter/NewsLetter";
import Footer from "@/components/layout/Footer/Footer";
import Testimonials from "@/components/sliders/Testimonials/Testimonials";
import RecommondationsK12 from "@/components/sliders/RecommondationsK12/RecommondationsK12";
// import K12Categories from "@/components/K12Categories/K12Categories";
import K12Hero from "@/components/K12Hero/K12Hero";

//* Importing Image
import TickIcon from "@/icons/tick.png";

const ExploreK12 = () => {
  return (
    <>
      {/* navbar  */}
      <div className="fiexd-navbar">
        <Navbar
          navType="k12"
          btnClass="secondary"
          btnURL="/"
          btnContent="EXPLORE HIGHER EDUCATION"
        />
      </div>

      {/* Banner  */}
      <K12Hero />

      <div className="home-features-section">
        {/* Explore  naisa  */}
        <Naisa />

        {/* K12 Categories  */}
        {/* <section className="k12-categories-section">
          <div className="app-container">
            <h3>Allows learners to choose over</h3>
            <h2>5 MILLION + PAGES</h2>
            <div className="k12-categories-container">
              <K12Categories title="NCERT" url="/k12-resources/books?type=ncert" />
              <K12Categories title="State Board" url="/k12-resources/books?type=state-board" />
              <K12Categories title="Study Guide" url="/k12-resources/books?type=guides" />
              <K12Categories title="Multiple Language Books" url="/k12-resources/books?type=multiple-language" />
              <K12Categories title="Competitive Exams" url="/k12-resources/books?type=competitive-exam" />
              <K12Categories title="Vocational" url="/k12-resources/books?type=vocational" />
              <K12Categories title="Life Skills" url="/k12-resources/books?type=life-skills" />
              <K12Categories title="Children Books" url="/k12-resources/books?type=ncert" />
            </div>
          </div>
        </section> */}
        {/* subscriptions */}
        <SubscriptionWithCategory bgType="K12" icon={TickIcon} />

        {/* Partners  */}
        <Partners />
      </div>

      {/* Recommandation  */}
      <RecommondationsK12 />

      {/* Testimonials  */}
      <Testimonials />

      {/* News Letter  */}
      <NewsLetter />

      {/* Footer  */}
      <Footer />
    </>
  );
};

export default ExploreK12;
