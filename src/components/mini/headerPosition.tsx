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

const HeaderPosition = () => {
  const { hoverSuccess, text2 } = useContext(ThemeContext);
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
    <Box>
      <Box style={{ textAlign: "center" }}>
        {" "}
        <IconButton
          onClick={() => {
            dispatch(changeHeaderPosition("top"));
          }}
        >
          <TbArrowBigUpLines
            style={{
              color: headerPosition === "top" ? hoverSuccess : text2,
              fontSize: "2rem",
              transform: "translate(0px, 13px)",
            }}
          />
        </IconButton>
      </Box>
      {sizeName !== "mobile" ? (
        <Box display="flex" justifyContent="center" style={{ gap: "1.5rem" }}>
          <Box>
            {" "}
            <IconButton
              onClick={() => {
                dispatch(changeHeaderPosition("left"));
              }}
            >
              <TbArrowBigLeftLines
                style={{
                  color: headerPosition === "left" ? hoverSuccess : text2,
                  fontSize: "2rem",
                }}
              />
            </IconButton>
          </Box>
          <Box>
            {" "}
            <IconButton
              onClick={() => {
                dispatch(changeHeaderPosition("right"));
              }}
            >
              <TbArrowBigRightLines
                style={{
                  color: headerPosition === "right" ? hoverSuccess : text2,
                  fontSize: "2rem",
                }}
              />
            </IconButton>
          </Box>
        </Box>
      ) : null}
      <Box style={{ textAlign: "center" }}>
        {" "}
        <IconButton
          onClick={() => {
            dispatch(changeHeaderPosition("bottom"));
          }}
        >
          <TbArrowBigDownLines
            style={{
              color: headerPosition === "bottom" ? hoverSuccess : text2,
              fontSize: "2rem",
              transform: "translate(0px, -13px)",
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default HeaderPosition;
