import React from "react";
import { Toaster } from "react-hot-toast";
import ThemeContext, { ThemeContextProvider } from "@context/themeContext";
import { SidebarProvider } from "@context/sidebarContext";
import { TodoContextProvider } from "@context/todoContext";
import Main from "@compo/mainApp";
import CustomeRouter from "@services/customeRouter";
import CustomeHistory from "@services/customeHistory";
import { store , AppDispatch , RootState } from './redux/store'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { Provider } from 'react-redux'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

function App() {

  return (
    <Provider store={store}>
    <CustomeRouter history={CustomeHistory}>
      <ThemeContextProvider>
          <SidebarProvider>
            <TodoContextProvider>
              <Toaster position="bottom-center" reverseOrder={true} />
                <Main />
            </TodoContextProvider>
          </SidebarProvider>
      </ThemeContextProvider>
    </CustomeRouter>
    </Provider>
  );
}

export default App;
