import { useEffect } from "react";

declare global {
  interface Window {
    OneSignalDeferred?: any[];
  }
}

const useOneSignal = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Avoid double injection
    const isAlreadyLoaded = document.querySelector('script[src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"]');
    if (isAlreadyLoaded) return;

    // Load the script
    const script = document.createElement("script");
    script.src = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
    script.defer = true;
    document.head.appendChild(script);

    // Init OneSignal after script is loaded
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async (OneSignal: any) => {
      await OneSignal.init({
        appId: "fc640918-198c-4dc9-90c7-e9d0663a66a2", 
        safari_web_id: "web.onesignal.auto.00e855ed-5f66-45b8-ad03-54b1e142944e",
        notifyButton: {
          enable: true,
        },
        allowLocalhostAsSecureOrigin: true, // Optional for local testing
      });
    });
  }, []);
};

export default useOneSignal;
