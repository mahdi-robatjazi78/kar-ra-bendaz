import React,{useState,useEffect,useContext} from 'react'
import {Box} from '@mui/material'
import ThemeContext from '@/context/themeContext';
import HeaderSpaceBox from './header';



  const Space = (props) => {
    const {} = props
    const theme =  useContext(ThemeContext)
    const spaceBoxStyles = {
      height: "100%",
      width: "100%",
      backgroundColor: theme.isDarkMode ? "rgba(255, 221, 255, 0.14)" : "#00000026",
      color:theme.text1
    };





  return (
    <Box
    
    
    style={spaceBoxStyles}>
      
      <HeaderSpaceBox />


    </Box>
  )
}

export default Space