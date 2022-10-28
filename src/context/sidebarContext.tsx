import React, { useState } from "react";
import { ISidebar } from "../types/types";

export const SidebarContext = React.createContext<ISidebar | null>(null);

export const SidebarProvider = ({ children }) => {
  const [open, setOpen] = useState<ISidebar["open"]>("show");
  const [lastSelectedCategory, setSelectedCategory] = useState<
  ISidebar["lastSelectedCategory"]
  >("all");

  const setToggleSidebar = () => {
    setOpen(open === "hide" ? "show" : "hide");
  };
  const setOpenSidebar = () => {
    setOpen("show");
  };
  const setCloseSidebar = () => {
    setOpen("hide");
  };
  const setLastSelectedCategory=(val)=>{
    setSelectedCategory(val)
  }

  return (
    <SidebarContext.Provider
      value={{
        open,
        setToggleSidebar,
        setOpenSidebar,
        setCloseSidebar,
        lastSelectedCategory,
        setLastSelectedCategory,
      }} // key="sidebar-context-id"
    >
      {children}
    </SidebarContext.Provider>
  );
};
