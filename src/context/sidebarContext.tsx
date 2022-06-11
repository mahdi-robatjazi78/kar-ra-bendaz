import React, { useState } from "react";
import { ISidebar } from "../types/types";

// const sidebarDefaults = {
//   open:"hide",
//   setToggleSidebar: () => {},
//   setOpenSidebar: () => {},
//   setCloseSidebar: () => {},
// };

export const SidebarContext = React.createContext<ISidebar|null>(null);

export const SidebarProvider = ({ children }) => {
  const [open, setOpen] = useState<ISidebar["open"]>("show");
  const setToggleSidebar = () => {
    setOpen(open === "hide" ? "show" : "hide");
  };
  const setOpenSidebar = () => {
    setOpen("show");
  };
  const setCloseSidebar = () => {
    setOpen("hide");
  };

  return (
    <SidebarContext.Provider
      value={{ open, setToggleSidebar, setOpenSidebar, setCloseSidebar }} // key="sidebar-context-id"
    >
      {children}
    </SidebarContext.Provider>
  );
};
