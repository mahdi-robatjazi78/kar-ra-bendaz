import React, { useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin3Fill, RiFolderAddFill } from "react-icons/ri";
import { MdOutlineDownloadDone } from "react-icons/md";
import ThemeContext from "../../context/themeContext";
import { Box, Tooltip, IconButton } from "@mui/material";
import Swal from "sweetalert2";
import Axios from "../../services/api";
import { UpdateCategory } from "../../context/updatationContext";




const CardIcons = ({
  todo,
  getAllTodos,
  setSelectedEditTask,
  deleteTodo,
  editTodo,
  setTodoDone,
}) => {
  const { updateCategoryOn } = useContext(UpdateCategory);
  const theme = useContext(ThemeContext);

  const iconsStyle = {
    fontSize: "1.7rem",
    color: todo.flag !== "isDone" ? theme.text3 : "black",
    padding: "0 .2rem",
  };

  const addToCategory = async (todo) => {
    try {
      console.log("todo>>>", todo);

      const resp = await Axios.get("/category/getAll");
      console.log("resp >>", resp);
      const allCategories = resp.data.list;

      console.log("allCategories", allCategories);

      const selectedCategoryIndex = await Swal.fire({
        title: "Select a category",
        input: "select",
        inputOptions: allCategories.map((item) => item.title),
        inputPlaceholder: "Category List",
        showCancelButton: true,
        customClass:{
          popup : theme.isDarkMode ? "Modal_DrakMode" :"Modal_LightMode",
          title:theme.isDarkMode ? "Modal_TitleBar_Dark":"Modal_TitleBar_Light",
          confirmButton:theme.isDarkMode ? "Modal_Confirm_Button_Dark" : "Modal_Confirm_Button_Light",
          cancelButton:"Modal_Cancel_Button",
          footer:"Modal_Footer",
          input:theme.isDarkMode ? "Modal_Input_Dark":"Modal_Input_Light"
        },
      });

      const response = await Axios.put("/todos/add-to-category", {
        todoId: todo._id,
        categoId: allCategories[selectedCategoryIndex.value].uuid,
      });

      updateCategoryOn();
      getAllTodos();

      console.log(response.data.msg);
    } catch (error) {
      console.log(error.response);
    }
  };


  const showModalDelete =async(todo)=>{
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Are you Sure ?',
      text: 'Do you Want Remove This Todo 😯',
      confirmButtonText:"Yes Delete It...",
      confirmButtonColor:"red",
      showCancelButton:true,
      customClass:{
        popup : theme.isDarkMode ? "Modal_DrakMode" :"Modal_LightMode",
        title:theme.isDarkMode ? "Modal_TitleBar_Dark":"Modal_TitleBar_Light",
        confirmButton:theme.isDarkMode ? "Modal_Confirm_Button_Dark" : "Modal_Confirm_Button_Light",
        cancelButton:"Modal_Cancel_Button",
        footer:"Modal_Footer",
        input:theme.isDarkMode ? "Modal_Input_Dark":"Modal_Input_Light"
      },
    })
    if(result.isConfirmed){
      deleteTodo(todo)
    }
  }

  return (
    <Box style={{width:"100%" , height:"6rem"  , position:"absolute" ,top:0 ,left:0}}>
      <Box position="relative" style={{width:"100%" , height:"6rem"}}>
    <Box
      position="absolute"
      top="50%"
      left="50%"
      style={{ transform: "translate(-50%,-50%)" }}
    >
      <Tooltip arrow title="Edit Todo">
        <IconButton onClick={() => editTodo(todo)}>
          <FaEdit style={iconsStyle} />
        </IconButton>
      </Tooltip>

      <Tooltip arrow title="Delete Todo">
        <IconButton onClick={() => {
          
          showModalDelete(todo)          
          
          }}>
          <RiDeleteBin3Fill style={iconsStyle} />
        </IconButton>
      </Tooltip>
      {todo.flag !== "isDone" && (
        <Tooltip arrow title="Set Done">
          <IconButton onClick={() => setTodoDone(todo)}>
            <MdOutlineDownloadDone style={iconsStyle} />
          </IconButton>
        </Tooltip>
      )}
      {!todo.categoId && (
        <Tooltip arrow title="Add To Category">
          <IconButton onClick={() => addToCategory(todo)}>
            <RiFolderAddFill style={iconsStyle} />
          </IconButton>
        </Tooltip>
      )}
    </Box>
    </Box>
    </Box>
  );
};

export default CardIcons;
