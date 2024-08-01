//* Importing Component
import React from "react";
import Image from "next/image";
import Link from "next/link";

//* Importing Image
import NaisaImage from "@/images/home/naisa.png";

//* Importing Css
import Style from "@/components/ExploreNaisa/Naisa.module.css";

const Naisa: React.FC = () => {
  return (
    <div className={Style.naisa_section}>
      <div className={Style.naisa_container}>
        <div className={Style.naisa_content}>
          <div className={Style.naisa_heading}>
            <h4>
              Explore
              <span>
                N<b>AI</b>SA
              </span>
            </h4>
            <p>(Netbookflix AI Student Assistant)</p>
          </div>
          <div className={Style.naisa_feature_container}>
            <div className={Style.naisa_feature}>
              <p>
                Designed to revolutionize the
                <span> Online and Digital READING</span> experience.
              </p>
            </div>
            <div className={Style.naisa_feature}>
              <p>
                Utilizing Generative AI Intelligence, NAISA generates answers
                sourced from the vast Netbookflix content database,
                <span> compiled from credible and Published authors.</span>
              </p>
            </div>
            <div className={Style.naisa_feature}>
              <p>
                Facilitates seamless <span> TOPICAL search</span>, reading, and
                research, empowering students with comprehensive resources at
                their fingertips.
              </p>
            </div>
          </div>
          <div className={Style.naisa_feature}>
            <p>
              Additionally, NAISA provides
              <span> References to supplementary materials</span>, enabling
              further exploration and deeper understanding of the subject.
            </p>
          </div>
        </div>
        <Link href="/naisa" className={Style.naisa_image}>
          <Image
            alt="Naisa"
            src={NaisaImage}
            width={754}
            height={973}
            priority
          />
        </Link>
      </div>
    </div>
  );
};

export default Naisa;
