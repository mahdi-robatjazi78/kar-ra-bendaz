import React, { useState, useContext, useEffect } from "react";

import { Box, IconButton, Typography } from "@mui/material";
import { RxDragHandleDots2 } from "react-icons/rx";
import ThemeContext from "@context/themeContext";
import { HiPlus } from "react-icons/hi";
import { motion } from "framer-motion";

const NotesToolbar = (props) => {
  const {setBoardCount,
    boardCount} = props
  const theme = useContext(ThemeContext);
  const [showDots, setShowDots] = useState(true);

  const dotsStyles = {
    color: theme.text1,
    transform: "rotate(35deg)",
    fontSize: "1.3rem",
    cursor: "pointer",
  };

  const iconBox = {
    borderRadius: "25%",
    backgroundColor: "var(--text1)",
    margin: "1rem",
  };

  const maxBoards = 11

  return (
    <Box position={"absolute"} top={0} left={0}>
      {showDots ? (
        <IconButton 
        onMouseEnter={() => setShowDots(false)}
        onClick={() => setShowDots(false)}
        >
          <RxDragHandleDots2 style={dotsStyles} />
        </IconButton>
      ) : (
        <Box
          onMouseLeave={() => {
            setTimeout(() => {
              setShowDots(true);
            }, 1000);
          }}  
        >
          <motion.div
            initial={{ x: -50, y: -50, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ ease: "easeOut", duration: 0.3 }}
            style={iconBox}
            onClick={() => console.log("true")}
          >
            <IconButton onClick={()=>{
              if(boardCount <= maxBoards){
                setBoardCount(prevState=>prevState+1)
              }
            }}>
              <HiPlus
                fontSize="1.2rem"
                color={theme.isDarkMode ? "black" : "white"}
              />
            </IconButton>
          </motion.div>
        </Box>
      )}
    </Box>
  );
};

export default NotesToolbar;
