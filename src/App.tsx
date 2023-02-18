import React from "react";
import { Toaster } from "react-hot-toast";
import { ThemeContextProvider } from "@context/themeContext";
import { SidebarProvider } from "@context/sidebarContext";
import { TodoContextProvider } from "@context/todoContext";
import { AppDataContextProvider } from "@context/appDataContext";
import Main from "@compo/mainApp";
import CustomeRouter from "@services/customeRouter";
import CustomeHistory from "@services/customeHistory";
import { ThemeProvider } from "@mui/material/styles";
import CombineCustomizedStyles from './styles/mui'

import { store } from './redux/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
    <CustomeRouter history={CustomeHistory}>
      <ThemeContextProvider>
        <AppDataContextProvider>
          <SidebarProvider>
            <TodoContextProvider>
              <Toaster position="bottom-center" reverseOrder={true} />
                <ThemeProvider theme={CombineCustomizedStyles}>
                <Main />
              </ThemeProvider>
            </TodoContextProvider>
          </SidebarProvider>
        </AppDataContextProvider>
      </ThemeContextProvider>
    </CustomeRouter>
    </Provider>
  );
}

export default App;
