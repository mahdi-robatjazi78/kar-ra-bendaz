import React, { useContext, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import ThemeContext from "@context/themeContext";
import { useDispatch } from "react-redux";
import { changeHeaderPosition } from "@/redux/features/settingSlice";
import {
  TbArrowBigDownLines,
  TbArrowBigLeftLines,
  TbArrowBigRightLines,
  TbArrowBigUpLines,
} from "react-icons/tb";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useWindowSize from "@/hooks/useWindowSize";
import { pairColors } from "@/util/funcs";

const HeaderPosition = () => {
  const { hoverSuccess, isDarkMode } = useContext(ThemeContext);
  const { headerPosition } = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();
  const sizeName = useWindowSize().sizeName;

  useEffect(() => {
    if (
      (headerPosition === "left" || headerPosition === "right") &&
      sizeName === "mobile"
    ) {
      dispatch(changeHeaderPosition("top"));
    }
  }, [sizeName]);

  return (
    <Box className="header-position-parent">
      <Box
        style={{ textAlign: "center", transform: "translate(0px, 13px)" }}
        onClick={() => {
          dispatch(changeHeaderPosition("top"));
        }}
      >
        <TbArrowBigUpLines
          className="header-alignment"
          style={{
            color:
              headerPosition === "top"
                ? hoverSuccess
                : pairColors("var(--header)", "var(--text2)", isDarkMode),
            fontSize: "2rem",
          }}
        />
      </Box>
      {sizeName !== "mobile" ? (
        <Box
          display="flex"
          justifyContent="center"
          style={{ gap: "1.5rem" }}
          onClick={() => {
            dispatch(changeHeaderPosition("left"));
          }}
        >
          <Box>
            <TbArrowBigLeftLines
              style={{
                color:
                  headerPosition === "left"
                    ? hoverSuccess
                    : pairColors("var(--header)", "var(--text2)", isDarkMode),
                fontSize: "2rem",
              }}
            />
          </Box>
          <Box
            onClick={() => {
              dispatch(changeHeaderPosition("right"));
            }}
          >
            <TbArrowBigRightLines
              style={{
                color:
                  headerPosition === "right"
                    ? hoverSuccess
                    : pairColors("var(--header)", "var(--text2)", isDarkMode),
                fontSize: "2rem",
              }}
            />
          </Box>
        </Box>
      ) : null}
      {window.location.pathname === "/" ? (
        <Box></Box>
      ) : (
        <Box
          onClick={() => {
            dispatch(changeHeaderPosition("bottom"));
          }}
          style={{ transform: "translate(0px, -13px)", textAlign: "center" }}
        >
          <TbArrowBigDownLines
            className="header-alignment"
            style={{
              color:
                headerPosition === "bottom"
                  ? hoverSuccess
                  : pairColors("var(--header)", "var(--text2)", isDarkMode),
              fontSize: "2rem",
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default HeaderPosition;
