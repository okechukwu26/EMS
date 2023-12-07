// import React, {
//   FormEvent,
//   useContext,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import {
//   SDivider,
//   SLink,
//   SLinkContainer,
//   SLinkIcon,
//   SLinkLabel,
//   SLinkNotification,
//   SLogo,
//   SSearch,
//   SSearchIcon,
//   SSidebar,
//   SSidebarButton,
//   STheme,
//   SThemeLabel,
//   SThemeToggler,
//   SToggleThumb,
// } from "./styles";

// import { logoSVG } from "../../assets/index";

// import {
//   AiOutlineHome,
//   AiOutlineLeft,
//   AiOutlineSearch,
//   AiOutlineSetting,
//   AiOutlineUser,
// } from "react-icons/ai";
// import { MdLogout, MdOutlineAnalytics } from "react-icons/md";
// import { BsPeople } from "react-icons/bs";

// import { ThemeContext } from "../DashboardContainer";
// import { useLocation } from "react-router-dom";

// const Sidebar = ({
//   step,
//   selectStep,
//   onChange,
//   changeSearch,
// }: {
//   step: number;
//   selectStep: (step: number) => void;
//   onChange: (text: string) => void;
//   changeSearch: (search: string) => void;
// }) => {
//   const searchRef = useRef(null);
//   const [user, setUser] = useState({} as any);
//   const [Search, setSearch] = useState("");
//   const { setTheme, theme } = useContext(ThemeContext);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { pathname } = useLocation();
//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log(Search);
//     changeSearch(Search);
//     onChange(Search);
//   };
//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (user !== null) {
//       setUser(JSON.parse(user));
//     }
//   }, []);

//   const searchClickHandler = () => {
//     if (!sidebarOpen) {
//       setSidebarOpen(true);
//       if (searchRef.current) {
//         searchRef.current.focus();
//       }
//     } else {
//       // search functionality
//     }
//   };
//   console.log(step);

//   return (
//     <SSidebar isOpen={sidebarOpen}>
//       <>
//         <SSidebarButton
//           isOpen={sidebarOpen}
//           onClick={() => setSidebarOpen((p) => !p)}
//         >
//           <AiOutlineLeft />
//         </SSidebarButton>
//       </>
//       <SLogo>
//         <img src={logoSVG} alt="logo" />
//       </SLogo>
//       <SSearch
//         onClick={searchClickHandler}
//         style={!sidebarOpen ? { width: `fit-content` } : {}}
//       >
//         <SSearchIcon>
//           <AiOutlineSearch />
//         </SSearchIcon>
//         <form onSubmit={handleSubmit}>
//           <input
//             ref={searchRef}
//             placeholder="Search"
//             style={!sidebarOpen ? { width: 0, padding: 0 } : {}}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </form>
//       </SSearch>
//       <SDivider />
//       {linksArray.map(({ icon, label, notification, to }, index) => (
//         <SLinkContainer
//           key={label}
//           isActive={pathname === to}
//           style={{
//             backgroundColor:
//               step === index ? "rgb(230,230,230)" : "transparent",
//           }}
//         >
//           <SLink
//             style={
//               !sidebarOpen
//                 ? {
//                     width: `fit-content`,
//                     backgroundColor:
//                       step === index ? "rgb(230,230,230)" : "transparent",
//                   }
//                 : {}
//             }
//             onClick={() => selectStep(index)}
//           >
//             <SLinkIcon>{icon}</SLinkIcon>
//             {sidebarOpen && (
//               <>
//                 <SLinkLabel>{label}</SLinkLabel>

//                 {!!notification && (
//                   <SLinkNotification>{notification}</SLinkNotification>
//                 )}
//               </>
//             )}
//           </SLink>
//         </SLinkContainer>
//       ))}
//       <SDivider />
//       {secondaryLinksArray.map(({ icon, label, notification, to }, index) => (
//         <SLinkContainer key={label} isActive={pathname === to}>
//           <SLink
//             to={to}
//             style={!sidebarOpen ? { width: `fit-content` } : {}}
//             onClick={() => selectStep(index)}
//           >
//             <SLinkIcon>{icon}</SLinkIcon>
//             {sidebarOpen && (
//               <>
//                 <SLinkLabel>{label}</SLinkLabel>

//                 {!!notification && (
//                   <SLinkNotification>{notification}</SLinkNotification>
//                 )}
//               </>
//             )}
//           </SLink>
//         </SLinkContainer>
//       ))}
//       <SDivider />
//       {ProfileLinksArray.map(({ icon, label, notification, to }, index) => (
//         <SLinkContainer key={label} isActive={pathname === to}>
//           <SLink
//             to={to}
//             style={!sidebarOpen ? { width: `fit-content` } : {}}
//             onClick={() => selectStep(index)}
//           >
//             <SLinkIcon>{icon}</SLinkIcon>
//             {sidebarOpen && (
//               <>
//                 <SLinkLabel>{label}</SLinkLabel>

//                 {!!notification && (
//                   <SLinkNotification>{notification}</SLinkNotification>
//                 )}
//               </>
//             )}
//           </SLink>
//         </SLinkContainer>
//       ))}
//       <SDivider />
//       <STheme>
//         {sidebarOpen && <SThemeLabel>Dark Mode</SThemeLabel>}
//         <SThemeToggler
//           isActive={theme === "dark"}
//           onClick={() => setTheme((p) => (p === "light" ? "dark" : "light"))}
//         >
//           <SToggleThumb style={theme === "dark" ? { right: "1px" } : {}} />
//         </SThemeToggler>
//       </STheme>
//     </SSidebar>
//   );
// };

// const linksArray = [
//   {
//     label: "Dashboard",
//     icon: <AiOutlineHome />,

//     notification: 1,
//   },
//   {
//     label: "Employees",
//     icon: <BsPeople />,

//     notification: 0,
//   },
//   {
//     label: "Attendance",
//     icon: <MdOutlineAnalytics />,

//     notification: 0,
//   },
// ];

// const secondaryLinksArray = [
//   {
//     label: "Settings",
//     icon: <AiOutlineSetting />,

//     notification: 3,
//   },
//   {
//     label: "Logout",
//     icon: <MdLogout />,

//     notification: 0,
//   },
// ];

// const ProfileLinksArray = [
//   {
//     label: "Profile",
//     icon: <AiOutlineUser />,

//     notification: 4,
//   },
// ];

// export default Sidebar;
