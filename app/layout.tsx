//* Component
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import SessionProvider from "@/providers/SessionProvider";

//* Metadata
export const metadata: Metadata = {
  title: "Netbookflix",
  description: "Online portal",
};

//* Css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/global.css";
import "@/styles/app.css";
import "@/styles/sliders.css";
import "@/styles/user.css";
import "@/styles/modal.css";
import TanStackProvider from "@/providers/TanStackProvider";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        ></link>
        
         <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W7G24L6J');`
          }}
        />
       

       
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`}
      ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3FG9Q2BZJH');`
          }}
          />
      </head>
      <body>
         
           
          <iframe
           src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        
          
      
        <TanStackProvider>
          <SessionProvider>{children}</SessionProvider>
        </TanStackProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
