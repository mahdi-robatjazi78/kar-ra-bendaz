import React, { useEffect, useContext } from "react";
import ThemeContext from "../../context/themeContext";
import { Box } from "@mui/material";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { TbSunFilled } from "react-icons/tb";

const DarkLight = () => {
  const { theme: OsTheme } = useSelector((state: RootState) => state.settings);
  const { isDarkMode, toggleDark, setDark, setLight } =
    useContext(ThemeContext);
  const handleChangeTheme = () => {
    if (!OsTheme.listen) {
      toggleDark();
    }
  };
  useEffect(() => {
    const handleReadListenFromOsTheme = () => {
      if (OsTheme.listen) {
        if (OsTheme.osTheme === "dark") {
          setDark();
        } else {
          setLight();
        }
      }
    };

    window.addEventListener("storage", () => {
      // When storage changes refetch
      handleReadListenFromOsTheme();
    });
  }, [OsTheme]);

  return (
    <Box style={{ cursor: !OsTheme.listen ? "pointer" : "no-drop" }}>
      <Box
        onClick={handleChangeTheme}
        style={{
          padding: "1rem",
          display: "inline-block",
        }}
      >
        {isDarkMode ? (
          <TbSunFilled
            viewBox="0 0 25 25"
            style={{
              animation: "App-logo-spin infinite 20s linear",
              fontSize: "4.3rem",
              color: "var(--text2)",
            }}
          />
        ) : (
          <BsFillMoonStarsFill
            fontSize={"3.4rem"}
            style={{ color: "var(--text2)" }}
          />
        )}
      </Box>
    </Box>
  );
};

export default DarkLight;
