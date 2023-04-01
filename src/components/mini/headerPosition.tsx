import React, { useContext } from "react";
import {
  FaArrowCircleDown,
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaArrowCircleUp,
} from "react-icons/fa";
import { Box, IconButton } from "@mui/material";
import ThemeContext from "@context/themeContext";
import { AppDataContext } from "@context/appDataContext";
import { useDispatch } from "react-redux";
import { changeHeaderPosition } from "@/redux/features/settingSlice";

const HeaderPosition = () => {
  const { borders } = useContext(ThemeContext);


  const dispatch = useDispatch()
  


  return (
    <Box>
      <Box style={{ textAlign: "center" }}>
        {" "}
        <IconButton 
        onClick={
          ()=>{
            dispatch(changeHeaderPosition("top"))
          }
          } >
          <FaArrowCircleUp style={{ color: borders }} />
        </IconButton>
      </Box>
      <Box display="flex" justifyContent="center" style={{ gap: "4rem" }}>
        <Box>
          {" "}
          <IconButton
            onClick={()=>{
              dispatch(
                changeHeaderPosition("left")
              )
            }}
          
          >
            <FaArrowCircleLeft style={{ color: borders }} />
          </IconButton>
        </Box>
        <Box>
          {" "}
          <IconButton 
          
          onClick={()=>{
            dispatch(
              changeHeaderPosition("right")
            )
          }}
          >
            <FaArrowCircleRight style={{ color: borders }} />
          </IconButton>
        </Box>
      </Box>
      <Box style={{ textAlign: "center" }}>
        {" "}
        <IconButton 
           onClick={()=>{
            dispatch(
              changeHeaderPosition("bottom")
            )
          }}
        
        >
          <FaArrowCircleDown style={{ color: borders }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default HeaderPosition;
