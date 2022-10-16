import React from "react";
import { Toaster } from "react-hot-toast";
import { ThemeContextProvider } from "@context/themeContext";
import { SidebarProvider } from "@context/sidebarContext";
import { TodoContextProvider } from "@context/todoContext";
import { AppDataContextProvider } from "@context/appDataContext";
import Main from "@compo/mainApp";
 
import CustomeRouter from "@services/customeRouter";
import CustomeHistory from "@services/customeHistory";

function App() {
  // const darkModeTheme = createTheme(getDesignTokens("dark"));

  return (
    <CustomeRouter history={CustomeHistory}>
      <ThemeContextProvider>
        <AppDataContextProvider>
              <SidebarProvider>
                <TodoContextProvider>
                  <Toaster position="bottom-center" reverseOrder={true} />
                  <Main />
                </TodoContextProvider>
              </SidebarProvider>
        </AppDataContextProvider>
      </ThemeContextProvider>
    </CustomeRouter>
  );
}

export default App;
