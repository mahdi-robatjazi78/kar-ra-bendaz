import React, { useState } from "react";
import { ISidebar } from "../types/types";

export const SidebarContext = React.createContext<ISidebar | null>(null);

export const SidebarProvider = ({ children }) => {
  const sidebarStatus = JSON.parse(localStorage.getItem("sidebarShow"))
  
  const [open, setOpen] = useState<ISidebar["open"]>(
    sidebarStatus ?
    "show":
    "hide"
    );
  const [lastSelectedCategory, setSelectedCategory] = useState<ISidebar["lastSelectedCategory"]>("all");

  const setToggleSidebar = () => {
    setOpen(open === "hide" ? "show" : "hide");
    localStorage.setItem("sidebarShow" , JSON.stringify(open === "hide" ? true : false))
  };
  const setOpenSidebar = () => {
    setOpen("show");
    localStorage.setItem("sidebarShow" , JSON.stringify(true))
  };
  const setCloseSidebar = () => {
    setOpen("hide");
    localStorage.setItem("sidebarShow" , JSON.stringify(false))

    
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
