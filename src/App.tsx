import React from "react";
import { Toaster } from "react-hot-toast";
import ThemeContext, { ThemeContextProvider } from "@context/themeContext";
import { TodoContextProvider } from "@context/todoContext";
import Main from "@compo/mainApp";
import CustomeRouter from "@services/customeRouter";
import CustomeHistory from "@services/customeHistory";
import persistorInitial, { store, AppDispatch, RootState } from "./redux/store";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  Provider,
} from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const { persistor } = persistorInitial();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CustomeRouter history={CustomeHistory}>
          <ThemeContextProvider>
            <TodoContextProvider>
              <Toaster position="bottom-center" reverseOrder={true} />
              <Main />
            </TodoContextProvider>
          </ThemeContextProvider>
        </CustomeRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
