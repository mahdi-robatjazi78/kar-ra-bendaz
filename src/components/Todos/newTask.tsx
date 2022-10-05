import React, { useContext, useState, useEffect, useRef } from "react";
import ThemeContext from "../../context/themeContext";
import { Box, IconButton, Tooltip } from "@mui/material";
import Axios from "../../services/api";
import { HiPlus } from "react-icons/hi";
import { SidebarContext } from "../../context/sidebarContext";
import { SelectedCategoryContext } from "../../context/selectCategoryContext";
import useWindowSize from "../../hooks/useWindowSize";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

import { RiCloseCircleFill } from "react-icons/ri";
const MySwal = withReactContent(Swal);

const InputNewTask = (props) => {
  const {
    getAllTodos,
    userSelectedCategory,
    Submit,
    selectedEditTask,
    status,
    setStatus,
    // showAddTaskModalKeyboard,
  } = props;

  const { open } = useContext(SidebarContext);
  const theme = useContext(ThemeContext);
  const { newCategorySelected ,selected} = useContext(SelectedCategoryContext);
  const InputRef = useRef(null);
  const [width, setWidth] = useState<any>(0);
  const [windowWidth, windowHeight] = useWindowSize();

  useEffect(() => {
    const board = document.getElementsByClassName("board");
    setWidth(board[0].clientWidth - 52);
  }, [open, windowWidth]);

  useEffect(() => {
    if (selectedEditTask._id) {
      ShowAddTaskModal("update", selectedEditTask.body);
      listenToInputModal();
    }
  }, [selectedEditTask]);

  const listenToInputModal = () => {
    const textAreaElement =
      document.getElementsByClassName("swal2-textarea")[0];
      if(textAreaElement){
    textAreaElement.addEventListener(
      "keyup",
      function (event: KeyboardEvent): void {
        if (event.ctrlKey && event.key === "Enter") {
          MySwal.clickConfirm();
        }
      }
    );}
  };



  const getInformationOfCategory = async (selectedCategoryId)=>{
    try{
      const result = await Axios.get(`/category/getInfo?uuid=${selectedCategoryId}`)
      console.log(result.data.category.title)
      return result.data.category.title
    }catch(error){
      console.log(error);
    }
  }


  const ShowAddTaskModal = async (modalStatus, textUpdateTask = "") => {
    try {
      let categoryTitle = ""
      if(selected !== "all-task" && modalStatus === "add"){
        categoryTitle = await getInformationOfCategory(selected)
      }
      const { value: text } = await MySwal.fire({
        customClass: {
          popup: theme.isDarkMode ? "Modal_DrakMode" : "Modal_LightMode",
          title: theme.isDarkMode
            ? "Modal_TitleBar_Dark"
            : "Modal_TitleBar_Light",
          confirmButton: theme.isDarkMode
            ? "Modal_Confirm_Button_Dark"
            : "Modal_Confirm_Button_Light",
          cancelButton: "Modal_Cancel_Button",
          footer: "Modal_Footer",
          input: theme.isDarkMode ? "Modal_Input_Dark" : "Modal_Input_Light",
        },
        input:"textarea",
        title: modalStatus === "add" ? "New Todo" : "Update Todo",
        inputPlaceholder:
        modalStatus === "add"
        ? "Type your new todo and press Ctrl + Enter"
        : "Update you'r todo and press Ctrl + Enter",
        inputAttributes: {
          "aria-label": "Type your message here",
        },
        html:
         selected === "all-task" || modalStatus === "update" ? "<span></span>": 
        `<div><input type="checkbox" checked=true  id="Selected-Category-Id" /> <label>${categoryTitle}</label> </div>`,
        inputValue: textUpdateTask,
        showCancelButton: true,
      });


      const selectedCategoryElement : HTMLInputElement = document.querySelector("#Selected-Category-Id") 
      if(!selectedCategoryElement || selectedCategoryElement.checked == false){
        Submit(text, modalStatus , false );
      }else if(selectedCategoryElement && selectedCategoryElement.checked == true){
        Submit(text, modalStatus , true );
        
      }



    } catch (error) {
      console.log(error);
      setStatus("");
    }
  };
 
  return (
    <Box>
        {(userSelectedCategory.category
        &&
        
        userSelectedCategory.category.title) ? (
        <Box>
          <h3
            style={{
              color: theme.text1,
              position: "absolute",
              top: "0",
              left: "2rem",
              background: theme.secondSidebar,
              padding: "6px 6px 6px 12px",
              borderRadius: "10px",
              fontSize: ".8rem",
            }}
          >
            {userSelectedCategory.category.title}
            <IconButton style={{ margin: "-4px 0 -4px 0.7rem" }}>
              <RiCloseCircleFill
                onClick={() => newCategorySelected()}
                style={{ 
                  fontSize:"1rem",
                  color: theme.text1,
              
                }}
              />
            </IconButton>
          </h3>
        </Box>
      ) : (
        <span></span>
      )}
      <Box position="absolute" right="2rem" top=".8rem">
        <Tooltip title="Add New Task < n >">
          <Box borderRadius="25%" style={{ backgroundColor: theme.text1 }}>
            <IconButton
              onClick={() => {
                ShowAddTaskModal("add");
                listenToInputModal();
              }}
            >
              <HiPlus
                fontSize="1.5rem"
                color={theme.isDarkMode ? "black" : "white"}
              />
            </IconButton>
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default InputNewTask;
