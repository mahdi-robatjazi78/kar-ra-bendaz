import React, { useContext , useState,useEffect} from "react";
import ThemeContext from "../../context/colorModeContext";
import {Box , TextField} from '@mui/material'
import styled from 'styled-components'
import {SidebarContext} from "../../context/sidebarContext";


const Input = () => {


  const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },

  });

  const { open } = useContext(SidebarContext);

  console.log(open);

  const theme = useContext(ThemeContext);
const [width, setWidth] = useState(0)
  useEffect(()=>{
    const board = document.getElementsByClassName('board')
    setWidth(board[0].clientWidth)
  },[open])
  return (
    <Box position="fixed" bottom={0}>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 , color:"white"},
        }}
        noValidate
        autoComplete="off"
        
      >
      <CssTextField  inputProps={
        {style:{color:theme.text1,letterSpacing:"1px" , width:width-55 +"px"}}


      } label="Outlined secondary" focused />

      </Box>

    </Box>
  );
};

export default Input;
