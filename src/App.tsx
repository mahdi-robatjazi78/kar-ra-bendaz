import React, { useState, useContext } from "react";
import "./App.css";

import { ThemeProvider, useTheme, createTheme } from "@mui/material/styles";
import Header from "./components/header";
import themes from "./theme";
import ThemeContext from "./context/colorModeContext";
import SidebarContext from "./context/sidebarContext";
import Main from "./components/mainApp";
import { ISidebar } from "./types/sidebar";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkmode")) || false
  );
  // const darkModeTheme = createTheme(getDesignTokens("dark"));

  const [showSidebar, setShowSidebar] = useState<ISidebar["open"]>("hide");
  const toggleSidebar = () =>
    setShowSidebar(showSidebar === "show" ? "hide" : "show");
  const openSidebar = () => setShowSidebar("show");
  const closeSidebar = () => setShowSidebar("hide");

  return (
    <ThemeContext.Provider value={isDarkMode ? themes.dark : themes.light}>
      <SidebarContext.Provider
        value={{
          open: showSidebar,
          setToggle: toggleSidebar,
          setOpen: openSidebar,
          setClose: closeSidebar,
        }}
      >
        <Main isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </SidebarContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
