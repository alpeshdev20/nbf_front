// import React, { useEffect, useRef, useState } from "react";
// import { Reader } from "./dist/js/epubreader.min.js"; // Assuming this is your EPUB reader module

// interface EpubReaderInterface {
//   path: string;
// }

// const EPUB_E_Reader: React.FC<EpubReaderInterface> = ({ path }) => {
//   const [isLoaded, setIsLoaded] = useState(false); // State to track loading status
//   const containerRef = useRef<HTMLDivElement>(null); // Reference for the container

//   // Dynamically load scripts
//   const loadScript = (src: string) => {
//     return new Promise<void>((resolve, reject) => {
//       const script = document.createElement("script");
//       script.src = src;
//       script.onload = () => resolve();
//       script.onerror = (error) => reject(error);
//       document.body.appendChild(script);
//     });
//   };

//   useEffect(() => {
//     // Flag to ensure the libraries are loaded only once
//     const loadLibraries = async () => {
//       try {
//         // Dynamically load the necessary scripts if they haven't been loaded yet
//         await loadScript("/libs/jszip.min.js");
//         await loadScript("/libs/md5.min.js");
//         await loadScript("/libs/epub.min.js");

//         // After loading, initialize the EPUB reader
//         if (containerRef.current) {
//           const reader = new Reader(path);
//         //   reader.render(containerRef.current); // Assuming render() is the correct method

//           // Successfully loaded and rendered
//           setIsLoaded(true);
//           console.log("Reader initialized and rendered.");
//         }
//       } catch (error) {
//         console.error("Error loading libraries or initializing reader:", error);
//       }
//     };

//     loadLibraries();

//     // Cleanup function: Remove the dynamically loaded scripts on component unmount
//     return () => {
//       document.querySelectorAll("script[src^='/libs']").forEach((script) => {
//         script.remove();
//       });
//     };
//   }, [path]); // Dependencies array ensures this effect runs only when `path` changes

//   return (
//     <div
//       id="epub-reader-container"
//       ref={containerRef}
//       style={{ height: "100%", width: "100%", display: isLoaded ? "block" : "none" }}
//     />
//   );
// };

// export default EPUB_E_Reader;
