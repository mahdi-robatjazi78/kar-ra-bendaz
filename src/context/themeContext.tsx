import React, { useState, useEffect } from "react";
import themes from "../theme";
import { getLocalStorageValue, setCommonLocalSettings } from "@/util/funcs";
import { handleAppThemeChange } from "@/redux/features/settingSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface ITheme {
  foreground: string;
  background: string;
  borders: string;
  errorBorder: string;
  sidebar: string;
  secondSidebar: string;
  text1: string;
  text2: string;
  header: string;
  text3: string;
  hoverSuccess: string;
  isDarkMode: boolean;
  toggleDark(): void;
  setDark(): void;
  setLight(): void;
}

const ThemeContext = React.createContext<ITheme>({
  foreground: "",
  background: "",
  borders: "",
  errorBorder: "",
  sidebar: "",
  header: "",
  secondSidebar: "",
  text1: "",
  text2: "",
  text3: "",
  hoverSuccess: "",
  isDarkMode: false,
  toggleDark: Function,
  setDark: Function,
  setLight: Function,
});
export const ThemeContextProvider = ({ children }: any) => {
  const mode = useSelector((state: RootState) => state.settings.theme.mode);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(mode === "dark");
  const dispatch = useDispatch();
  const [selectedTheme, setSelectedTheme] = useState({
    foreground: "",
    background: "",
    borders: "",
    errorBorder: "",
    sidebar: "",
    header: "",
    secondSidebar: "",
    text1: "",
    text2: "",
    text3: "",
    hoverSuccess: "",
    disabled: "",
  });

  useEffect(() => {
    setIsDarkMode(mode === "dark");
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      setSelectedTheme(themes.dark);
      document.documentElement.style.setProperty(
        "--foreground",
        themes.dark.foreground
      );
      document.documentElement.style.setProperty(
        "--background",
        themes.dark.background
      );
      document.documentElement.style.setProperty(
        "--borders",
        themes.dark.borders
      );
      document.documentElement.style.setProperty(
        "--errorBorder",
        themes.dark.errorBorder
      );
      document.documentElement.style.setProperty(
        "--sidebar",
        themes.dark.sidebar
      );
      document.documentElement.style.setProperty(
        "--secondSidebar",
        themes.dark.secondSidebar
      );
      document.documentElement.style.setProperty("--text1", themes.dark.text1);
      document.documentElement.style.setProperty("--text2", themes.dark.text2);
      document.documentElement.style.setProperty("--text3", themes.dark.text3);
      document.documentElement.style.setProperty(
        "--header",
        themes.dark.header
      );
      document.documentElement.style.setProperty(
        "--hoverSuccess",
        themes.dark.hoverSuccess
      );
      document.documentElement.style.setProperty(
        "--disabled",
        themes.dark.disabled
      );
    }
    if (!isDarkMode) {
      document.documentElement.style.setProperty(
        "--foreground",
        themes.light.foreground
      );
      document.documentElement.style.setProperty(
        "--background",
        themes.light.background
      );
      document.documentElement.style.setProperty(
        "--errorBorder",
        themes.light.errorBorder
      );
      document.documentElement.style.setProperty(
        "--borders",
        themes.light.borders
      );
      document.documentElement.style.setProperty(
        "--sidebar",
        themes.light.sidebar
      );
      document.documentElement.style.setProperty(
        "--secondSidebar",
        themes.light.secondSidebar
      );
      document.documentElement.style.setProperty("--text1", themes.light.text1);
      document.documentElement.style.setProperty("--text2", themes.light.text2);
      document.documentElement.style.setProperty("--text3", themes.light.text3);
      document.documentElement.style.setProperty(
        "--header",
        themes.light.header
      );
      document.documentElement.style.setProperty(
        "--hoverSuccess",
        themes.light.hoverSuccess
      );
      document.documentElement.style.setProperty(
        "--disabled",
        themes.light.disabled
      );

      setSelectedTheme(themes.light);
    }
  }, [isDarkMode]);

  const toggleDark = () => {
    if (mode === "dark") {
      setLight();
    } else {
      setDark();
    }
  };

  const setDark = () => {
    dispatch(handleAppThemeChange("dark"));
    setIsDarkMode(true);
  };

  const setLight = () => {
    dispatch(handleAppThemeChange("light"));
    setIsDarkMode(false);
  };

  return (
    <ThemeContext.Provider
      value={{ ...selectedTheme, toggleDark, isDarkMode, setDark, setLight }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
