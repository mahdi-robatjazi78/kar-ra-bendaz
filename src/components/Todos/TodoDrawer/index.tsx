import React, { useState,useEffect, useContext ,useRef } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { AppDataContext } from "@context/appDataContext";
import { Button, IconButton, TextareaAutosize, Tooltip } from "@mui/material";
import { MdOutlineDownloadDone } from "react-icons/md";
import { RiDeleteBin3Fill, RiFolderAddFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import ShowModalDelete from "../TodoModals/delete";
import ShowModalAddToCategory from "../TodoModals/addToCategory";
import SetDoneAction from '../TodoModals/setDone'
import useWindowSize from "@hooks/useWindowSize"

const TodoDrawer = (props) => {
  const anchor = "right";
  const { blurFalse, drawerState, setDrawerState , editTodoBody } = useContext(AppDataContext);
  const [doneAction , setDoneActionState]  = useState(false)
  const [todoTextEdited , setTodoTextEdited]  = useState(false)
  const [modalOpen, setModalOpen] = useState({
    status: false,
    modal: "",
  });
  let open = drawerState.open;
  const [width , height] = useWindowSize()
  const textAreaRef = useRef(null)
  useEffect(()=>{

    if(drawerState.open === true && textAreaRef.current){
    
    if(textAreaRef.current){
      alert("here")
    }
  }


    if(drawerState.open === false){
        setTodoTextEdited(false)
    } 
  },[drawerState.open])
 

  return (
    <Box id="drawer-parent" sx={modalOpen.status ? { zIndex: 3 }:{}}>
      <Drawer
        anchor={anchor}
        elevation={16}
        transitionDuration={200}
        sx={{
          "& .css-1160xiw-MuiPaper-root-MuiDrawer-paper": {
            width: width < 800 ? "85%" : "50%",
          },
        }}
        className={modalOpen.status ? "blur-drawer" : ""}
        open={open}
        onClose={() => {
          setDrawerState({
            ...drawerState,
            open: false,
            item: {},
          });

          blurFalse();
        }}
      >
        <Box id="drawer-box">
          <Box id="text-area-parent">
            <TextareaAutosize
              id="textAreaTodoDrawer"
              aria-label="minimum height"
              minRows={24}
              maxRows={30}
              ref={textAreaRef}
              placeholder="Edit Note"
              value={drawerState?.item?.body}
              onChange={(e)=>{
                setTodoTextEdited(true)
                setDrawerState({
                  ...drawerState,
                  item:{
                    ...drawerState.item , 
                    body:e.target.value
                  }
                })
              }}
            />
            <Box id="text-area-footer">
              <Button
                id="button-edit-todo"
                disabled={todoTextEdited ? false :true}
                onClick={()=>{
                  editTodoBody(drawerState?.item?._id , drawerState?.item?.body);
                  setTimeout(()=>{
                    setTodoTextEdited(false)
                  },500)
                }}
              >
                Edit todo
              </Button>
            </Box>
          </Box>
           
          <Box id="drawer-box-footer">
            {drawerState?.item?.flag !== "isDone" && (
              <Box className="drawer-icon-box">
                <Tooltip arrow title="Set Done">
                  <IconButton
                    onClick={(e)=>{
                      setDoneActionState(true)
                    }}
                  >
                    <MdOutlineDownloadDone
                      className="drawer-footer-icon"
                      // style={iconsStyle}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            {(drawerState?.item?.categoId === "other" || drawerState?.item?.categoId == null) && (
              <Box className="drawer-icon-box">
                <Tooltip arrow title="Add To Category">
                  <IconButton
                    onClick={() => {
                      setModalOpen({ status: true, modal: "add-to-category" });
                      
                    }}
                  >
                    <RiFolderAddFill className="drawer-footer-icon" />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            <Box className="drawer-icon-box">
              <Tooltip arrow title="Delete Todo">
                <IconButton
                  onClick={() => {
                    setModalOpen({ status: true, modal: "delete" });
                  }}
                >
                  <RiDeleteBin3Fill className="drawer-footer-icon" />
                </IconButton>
              </Tooltip>
            </Box>
            <Box className="drawer-icon-box">
              <Tooltip arrow title="Edit Todo">
                <IconButton
                // onClick={() => editTodoBody(todo)}
                >
                  <FaEdit className="drawer-footer-icon" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Drawer>

      {modalOpen.status ? (
        <>
          {modalOpen.modal === "delete" && (
            <ShowModalDelete
              todo={drawerState.item}
              setModalOpen={setModalOpen}
            />
          )}
          {modalOpen.modal === "add-to-category" && (
            <ShowModalAddToCategory
              todo={drawerState.item}
              setModalOpen={setModalOpen}
            />
          )}
        </>
      ) : null}
      {doneAction && (
       <SetDoneAction
         id={drawerState.item._id}
         setDoneActionState={setDoneActionState}
       />
     )}
    </Box>
  );
};

export default TodoDrawer;
