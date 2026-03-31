"use client"
//* Component
import { useEffect } from "react";
import { useSession } from "@/providers/SessionProvider";
import { post } from "@/utils/fetch";
// import { metadata } from '@/services/metadata'; // Adjust the path as necessary
import OneSignal from 'react-onesignal';


import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import SessionProvider from "@/providers/SessionProvider";


//* Metadata
 const metadata: Metadata = {
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

// import GoogleAnalytics from '@/components/GoogleAnalytics';
// import { Inter } from 'next/font/google'; // Importing the font, if needed
// const inter = Inter({ subsets: ['latin'] }); // Initialize the font, if needed

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const { session } = useSession(); // Get session context

  useEffect(() => {
    // Ensure this code runs only on the client side
    if (typeof window !== 'undefined') {
      OneSignal.init({
        appId: 'fc640918-198c-4dc9-90c7-e9d0663a66a2',
        safari_web_id: "web.onesignal.auto.00e855ed-5f66-45b8-ad03-54b1e142944e",
        notifyButton: {
          enable: true,
          prenotify: true,
          showCredit: false,
          text: {
            'tip.state.unsubscribed': 'Subscribe to notifications',
            'tip.state.subscribed': "You're subscribed to notifications",
            'tip.state.blocked': 'You have blocked notifications',
            'message.prenotify': 'Click to subscribe to notifications',
            'message.action.subscribed': "Thanks for subscribing!",
            'message.action.resubscribed': "You're subscribed to notifications",
            'message.action.unsubscribed': "You won't receive notifications again",
            'message.action.subscribing': "Subscribing...",
            'dialog.main.title': 'Manage Site Notifications',
            'dialog.main.button.subscribe': 'SUBSCRIBE',
            'dialog.main.button.unsubscribe': 'UNSUBSCRIBE',
            'dialog.blocked.title': 'Unblock Notifications',
            'dialog.blocked.message': "Follow these instructions to allow notifications:"
          }
        },
        allowLocalhostAsSecureOrigin: true
      });
    }
  }, []);
  useEffect(() => {
    let interval;
    if (localStorage.getItem("user_id") != null) {
      interval = setInterval(() => {
        logTimeSpent(5000);
      }, 5000);
    } else {
      if (interval) {
        clearInterval(interval);  // Clear the interval if it exists
      }
    }

  }, [session]);

  //* Updating User Reading stats
  const logTimeSpent = (time: number) => {
    post(`${process.env.API_URL}users-stats/update-user-time-spent-on-nbf`, {
      time,
    })
      .then((data) => {
        // Handle success if needed
      })
      .catch((error) => {
        // Handle error if needed
      });
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        ></link>

         {/* <!-- Google Tag Manager --> */}
         <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W7G24L6J');`
          }}
        />
        {/* <!-- End Google Tag Manager --> */}

        {/* <!-- Google tag (gtag.js) --> */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`}
      ></script>
{/*  */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3FG9Q2BZJH');`
          }}
          />

        {/* <!-- New Google tag (gtag.js) for 'G-G4CNMD0E6R' --> */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-G4CNMD0E6R"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-G4CNMD0E6R');`
          }}
        />
        {/* Google Site Verification Meta Tag */}
        <meta name="google-site-verification" content="3QiaS_EW9XYkOwpcsEhu0rMu3y4biRhlIH2UNuCicnM" />
        
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
