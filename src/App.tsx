import React, { useState, useContext } from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider, useTheme, createTheme } from "@mui/material/styles";
import Header from "./components/header";
import themes from "./theme";
import {ThemeContextProvider} from "./context/themeContext";
import { UpdatationContextProvider } from "./context/updatationContext";
import { SidebarProvider } from "./context/sidebarContext";
import Main from "./components/mainApp";
import { ISidebar } from "./types/types";
import { TodoContextProvider } from "./context/todoContext";
import CustomeRouter from "./services/customeRouter";
import CustomeHistory from "./services/customeHistory";
import { SelectedCategoryContextProvider } from "./context/selectCategoryContext";

function App() {

  // const darkModeTheme = createTheme(getDesignTokens("dark"));

  return (
    <CustomeRouter history={CustomeHistory}>
      <ThemeContextProvider>
        <SelectedCategoryContextProvider>
          <UpdatationContextProvider>
            <SidebarProvider>
              <TodoContextProvider>
                <Toaster position="bottom-center" reverseOrder={true} />
                <Main />
              </TodoContextProvider>
            </SidebarProvider>
          </UpdatationContextProvider>
        </SelectedCategoryContextProvider>
      </ThemeContextProvider>
    </CustomeRouter>
  );
}

export default App;
