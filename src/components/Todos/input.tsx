import React, { useContext, useState, useEffect , useRef } from "react";
import ThemeContext from "../../context/colorModeContext";
import { Box, IconButton,TextField, InputAdornment, Button } from "@mui/material";
import {IoMdClose } from "react-icons/io";
import { SidebarContext } from "../../context/sidebarContext";
import useWindowSize from "../../hooks/useWindowSize";

const  InputNewTask = (props) => {
  const {newTask , setNewTask ,AddNewTask  ,selectedEditTask,status,setStatus} = props

  const { open } = useContext(SidebarContext);
  const InputRef = useRef(null)
  const theme = useContext(ThemeContext);
  const [width, setWidth] = useState<any>(0);
  const [windowWidth , windowHeight] = useWindowSize()

 
  
  useEffect(() => {
     
      const board = document.getElementsByClassName("board");
      setWidth(board[0].clientWidth);
      
     
    }, [open,windowWidth]);


  useEffect(()=>{
    if(selectedEditTask._id){
      setStatus('edit')
    }else{
      setStatus('add')
      setNewTask('')
      
    }
  },[selectedEditTask])


  const handleChangeInput =(e)=>{
   setNewTask(e.target.value)
    
    
  }

  return (
    <Box>
      <Box
        sx={{
          "& > :not(style)": { m: 1, color: "white" },
        }}
      >
 
        <TextField
          InputProps={
            
           { 
            style: {
              color: theme.text1,
              letterSpacing: "1px",
              width: width - 25 + "px",
              marginBottom:10 
              // width:'100%'
            },

            endAdornment:(
              <>
            {
              newTask && 

                  ( 
                   <InputAdornment position="end">
                   <IconButton
                   
                   >
                   <IoMdClose style={{color:theme.text1}} onClick={()=>{setNewTask("") ;setStatus("add")} }/>
                   </IconButton>
                   
                     <Button style={{color:theme.text1}} onClick={()=>AddNewTask()}>Enter</Button>
                   </InputAdornment>
                 )
                 
                 
                  
                }
                </>
                )
            }
          }
          
          focused
          label={status === 'add' ? "New Task" : "Edit Task" }
          variant="outlined"
          placeholder={status === 'add' ? "type your task and press Enter" :"Edit your task and press Eneter"}
          size="small"
          ref={InputRef}
          value={newTask}
          onChange={(e : any)=> handleChangeInput(e)}
          // onChange={(e : any)=> console.log(e.target.value)}
          onKeyPress={(e)=>{if(e.key==="Enter"){e.preventDefault(); AddNewTask()}}}
        />

      </Box>
    </Box>
  );
};

export default InputNewTask;
