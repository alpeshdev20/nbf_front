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
      </head>
      <body>
        <TanStackProvider>
          <SessionProvider>{children}</SessionProvider>
        </TanStackProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
