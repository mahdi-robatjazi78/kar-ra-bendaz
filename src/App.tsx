import React from "react";
import { Toaster } from "react-hot-toast";
import { ThemeContextProvider } from "@context/themeContext";
import { SidebarProvider } from "@context/sidebarContext";
import { TodoContextProvider } from "@context/todoContext";
import { AppDataContextProvider } from "@context/appDataContext";
import Main from "@compo/mainApp";
import CustomeRouter from "@services/customeRouter";
import CustomeHistory from "@services/customeHistory";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  // const darkModeTheme = createTheme(getDesignTokens("dark"));

  return (
    <CustomeRouter history={CustomeHistory}>
      <ThemeContextProvider>
        <AppDataContextProvider>
              <SidebarProvider>
                <TodoContextProvider>
                  <Toaster position="bottom-center" reverseOrder={true} />

                  <DndProvider backend={HTML5Backend}>
                  <Main />

                  </DndProvider>
                </TodoContextProvider>
              </SidebarProvider>
        </AppDataContextProvider>
      </ThemeContextProvider>
    </CustomeRouter>
  );
}

export default App;
