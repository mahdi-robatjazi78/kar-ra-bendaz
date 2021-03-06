import React, { useState, useContext } from "react";
import "./App.css";

import { ThemeProvider, useTheme, createTheme } from "@mui/material/styles";
import Header from "./components/header";
import themes from "./theme";
import ThemeContext from "./context/colorModeContext";
import {SidebarProvider} from "./context/sidebarContext";
import Main from "./components/mainApp";
import { ISidebar } from "./types/types";
import { TodoContextProvider } from "./context/todoContext";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkmode")) || false
  );
  // const darkModeTheme = createTheme(getDesignTokens("dark"));

  return (
    <ThemeContext.Provider value={isDarkMode ? themes.dark : themes.light}>
      <SidebarProvider>
        <TodoContextProvider>
          <Main isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        </TodoContextProvider>
      </SidebarProvider>
    </ThemeContext.Provider>
  );
}

export default App;
