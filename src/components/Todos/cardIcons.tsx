import React,{useContext} from 'react'
import {FaEdit} from "react-icons/fa"
import {RiDeleteBin3Fill} from "react-icons/ri"
import {MdOutlineDownloadDone} from "react-icons/md"
import ThemeContext from '../../context/colorModeContext'
import {Box,Tooltip,IconButton} from "@mui/material"
import axios from 'axios'

const CardIcons = ({todo,getAllTodos,setSelectedEditTask}) => {

  const theme = useContext(ThemeContext)
  

  const iconsStyle={
      fontSize:"1.7rem",
      color:todo.flag !== "isDone" ? theme.text3 :"black",
      padding:"0 .2rem"
  }


  const setTodoDone =async()=>{
    try {

      const response = await axios.put("http://localhost:5000/todos/done" ,{id:todo._id})

      console.log(response)
      if(response.status===200){
        getAllTodos()
      }


    }catch(error){
      console.log(error)
    }
  }

  const deleteTodo =async()=>{
    try {

      const response = await axios.delete(`http://localhost:5000/todos/delete/${todo._id}`)

      console.log(response) 
      if(response.status===200){
        getAllTodos()
      }


    }catch(error){
      console.log(error)
    }
  }


  const editTodo =()=>{
   

      setSelectedEditTask(todo)


  }


  return (
    <Box position="absolute" top="50%" left="50%" style={{transform:"translate(-50%,-25%)"}}>
    <Tooltip arrow title="Edit Todo"><IconButton onClick={editTodo}><FaEdit style={iconsStyle} /></IconButton></Tooltip>

    <Tooltip arrow title="Delete Todo"><IconButton onClick={deleteTodo}><RiDeleteBin3Fill style={iconsStyle} /></IconButton></Tooltip>
    {todo.flag !== "isDone"  && (
      <Tooltip arrow title="Set Done"><IconButton onClick={setTodoDone}><MdOutlineDownloadDone style={iconsStyle} /></IconButton></Tooltip>
    )}
    </Box>
  )
}

export default CardIcons