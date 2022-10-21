import React, { useContext, useState, useEffect, useRef } from "react";
import ThemeContext from "@context/themeContext";
import { SidebarContext } from "@context/sidebarContext";
import { AppDataContext } from "@context/appDataContext";
import { HiPlus } from "react-icons/hi";
import { Box, IconButton, Tooltip } from "@mui/material";
import ShowModalNewTodo from "./TodoModals/newTodo"
import { RiCloseCircleFill } from "react-icons/ri";


 
const TodoPageFooter = (props) => {
  const {
    userSelectedCategory,
  
  } = props;
  
  // const { open } = useContext(SidebarContext);
  const { blurTrue,blurFalse ,newCategorySelected ,selected } = useContext(AppDataContext);
  // const InputRef = useRef(null);
  const theme = useContext(ThemeContext);
  const [showModalAddTodo , setShowModalAddTodo] = useState(false)

 

  // const listenToInputModal = () => {
  //   const textAreaElement =
  //     document.getElementsByClassName("swal2-textarea")[0];
  //     if(textAreaElement){
  //   textAreaElement.addEventListener(
  //     "keyup",
  //     function (event: KeyboardEvent): void {
  //       if (event.ctrlKey && event.key === "Enter") {
  //         MySwal.clickConfirm();
  //       }
  //     }
  //   );}
  // };







 
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
        <Tooltip title="Add New Task">
          <Box borderRadius="25%" style={{ backgroundColor: theme.text1 }}>
            <IconButton
              onClick={()=>setShowModalAddTodo(true)}
            >
              <HiPlus
                fontSize="1.5rem"
                color={theme.isDarkMode ? "black" : "white"}
              />
            </IconButton>
          </Box>
        </Tooltip>
      </Box>

        {
          showModalAddTodo  ? (
            <ShowModalNewTodo
              setShowModalAddTodo={setShowModalAddTodo}
            />
          ):null
        }

    </Box>
  );
};

export default TodoPageFooter;
