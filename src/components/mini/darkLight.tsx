import React, { useEffect, useContext } from "react";
import ThemeContext from "../../context/themeContext";
import { Box, Tooltip } from "@mui/material";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { TbSunFilled } from "react-icons/tb";
import { pairColors } from "@/util/funcs";

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
    <Box>
      <Box onClick={handleChangeTheme}>
        {isDarkMode ? (
          <Tooltip arrow title="Set theme light">
            <span  >
              <TbSunFilled
                viewBox="0 0 25 25"
                className="d-flex-center"
                style={{
                  cursor: !OsTheme.listen ? "pointer" : "no-drop",
                  animation: "App-logo-spin infinite 20s linear",
                  fontSize: "4.3rem",
                  color: pairColors(
                    "var(--header)",
                    "var(--text2)",
                    isDarkMode
                  ),
                }}
              />
            </span>
          </Tooltip>
        ) : (
          <Tooltip arrow title="Set theme dark">
            <span>
              <BsFillMoonStarsFill
                style={{
                  cursor: !OsTheme.listen ? "pointer" : "no-drop",
                  color: pairColors(
                    "var(--header)",
                    "var(--text2)",
                    isDarkMode
                  ),
                  fontSize: "3rem",
                }}
              />
            </span>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

export default DarkLight;
