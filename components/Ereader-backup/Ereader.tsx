// "use client"; 
// import React, { useState } from "react";
// import "./style.css";
// import Ereader from "../heightlight/Heighlight";

// interface MenuItem {
//   title: string;
//   icon: JSX.Element;
//   gap?: boolean;
// }

// const Ereader_b: React.FC = () => {
//   const [open, setOpen] = useState<boolean>(false); // Sidebar open state
//   const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null); // Track active menu index

//   // Define menu items with titles and SVG elements for icons
//   const Menus: MenuItem[] = [
//     {
//       title: "Overview",
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
//           <path fill="currentColor" d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z" />
//         </svg>
//       ),
//     },
//     {
//       title: "Transactions",
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
//           <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
//         </svg>
//       ),
//     },
//     {
//       title: "Loyalty Cards",
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
//           <path fill="currentColor" d="M3 4h18v2H3zm0 4h18v2H3zm0 4h18v2H3zm0 4h18v2H3z" />
//         </svg>
//       ),
//       gap: true,
//     },
//     {
//       title: "Subscriptions",
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
//           <path fill="currentColor" d="M3 4h18v2H3zm0 4h18v2H3zm0 4h18v2H3zm0 4h18v2H3z" />
//         </svg>
//       ),
//     },
//     {
//       title: "Debts",
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
//           <path fill="currentColor" d="M3 4h18v2H3zm0 4h18v2H3zm0 4h18v2H3zm0 4h18v2H3z" />
//         </svg>
//       ),
//     },
//     {
//       title: "Legal information",
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
//           <path fill="currentColor" d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z" />
//         </svg>
//       ),
//     },
//     {
//       title: "Notifications",
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
//           <path fill="currentColor" d="M3 4h18v2H3zm0 4h18v2H3zm0 4h18v2H3zm0 4h18v2H3z" />
//         </svg>
//       ),
//       gap: true,
//     },
//     {
//       title: "Settings",
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
//           <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
//         </svg>
//       ),
//     },
//   ];

//   // Handle when a menu item is clicked
//   const handleMenuClick = (index: number) => {
//     if (activeMenuIndex === index) {
//       setOpen(false); // Close sidebar if the same menu item is clicked again
//     } else {
//       setActiveMenuIndex(index);
//       setOpen(true); // Open sidebar for a new menu item
//     }
//   };

//   // Toggle sidebar open/close when the sidebar toggle button is clicked
//   const toggleSidebar = () => {
//     setOpen(prevState => !prevState); // Toggle the open state of the sidebar
//   };

//   return (


//   <div className="content-wrapper">
//     < Ereader />
//   </div>
//     // <div className="e-reader">
//     //   <div className="sidebar-container">
//     //     <div className="saved">
//     //       <button>&#x2750;</button>
//     //       <button>&#10061;</button>
//     //     </div>

//     //     <div className={`sidebar ${open ? "open" : ""}`}>
//     //       <div
//     //         className={`sidebar-toggle ${!open ? "rotate" : ""}`}
//     //         onClick={toggleSidebar} // Toggle sidebar visibility
//     //       >
//     //         {/* Sidebar Toggle Button */}
//     //         &#9776; {/* Hamburger icon */}
//     //       </div>

//     //       <div className="sidebar-header">
//     //         <h1 className={`logo ${!open ? "hidden" : ""}`}>Netbookflix</h1>
//     //       </div>

//     //       <ul className="menu-list">
//     //         {Menus.map((menu, index) => (
//     //           <li
//     //             key={index}
//     //             className={`menu-item ${menu.gap ? "gap" : ""} ${
//     //               activeMenuIndex === index ? "active" : ""
//     //             }`}
//     //             onClick={() => handleMenuClick(index)} // Handle menu item click
//     //           >
//     //             <span className="menu-icon">{menu.icon}</span>
//     //             <span className={`menu-title ${!open ? "hidden" : ""}`}>
//     //               {menu.title}
//     //             </span>
//     //           </li>
//     //         ))}
//     //       </ul>
//     //     </div>

//     //   {/* Content Wrapper - Center content between header and footer */}
//       // <div className="content-wrapper">
//       //   < Ereader />
//       // </div>

//     //   </div>
//     //   {/* Footer */}
//     //   <div className={`footer ${open ? "footer-collape" : ""}`}>
//     //     <div>
//     //       <span>chapter title placeholder</span>
//     //     </div>
//     //     <div className="footer-inner">
//     //       <div>Prev Chapter</div>
//     //       <div>Next Chapter</div>
//     //     </div>
//     //   </div>
//     // </div>
//   );
// };

// export default Ereader_b;
