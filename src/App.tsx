import React from "react";
import { Toaster } from "react-hot-toast";
import ThemeContext, { ThemeContextProvider } from "@context/themeContext";
import Main from "@compo/mainApp";
import AppRouter from "@services/appRouter";
import history from "@services/appHistory";
import persistorInitial, { store, AppDispatch, RootState } from "./redux/store";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  Provider,
} from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@mui/material";
import OverridedTheme from "./styles/mui/theme";
 

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const { persistor } = persistorInitial();

console.log("1111--->",process.env.REACT_APP_ENVIRONMENT)




function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRouter history={history}>
          <ThemeContextProvider>
            <Toaster position="bottom-center" reverseOrder={true} />
            <ThemeProvider theme={OverridedTheme}>
              <Main />
            </ThemeProvider>
          </ThemeContextProvider>
        </AppRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
