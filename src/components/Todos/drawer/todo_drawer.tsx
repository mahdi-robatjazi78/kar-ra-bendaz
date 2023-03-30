import React ,{useState , useRef , useEffect} from 'react'
import {Box, Button, IconButton, TextareaAutosize, Tooltip} from "@mui/material";
import { useSelector ,useDispatch } from "react-redux";
import {useTodoSetDoneMutation} from '@/redux/api/todos'
import { deactiveBlur, setBlurPage } from "@/redux/features/settingSlice";
import { RootState } from "@/redux/store";
import { MdOutlineDownloadDone } from "react-icons/md";
import { RiDeleteBin3Fill, RiFolderAddFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import ShowModalDelete from "../TodoModals/delete";
import ShowModalAddToCategory from "../TodoModals/addToCategory";






const TodoDrawer = (props) => {
    const [todoBody , setTodoBody] = useState('')
    const {DeleteTodoOperation ,CategoryList ,HandleTodoAssignToCategory ,HandleTodoChangeBody ,UpdateOnlyTodos } = props.props
  const {modalOpen,setModalOpen} = props
    const [todoSetDoneRequest , todoSetDoneResponse] = useTodoSetDoneMutation()
  
    const [todoTextEdited , setTodoTextEdited]  = useState(false)

    const textAreaRef = useRef(null)
    const dispatch = useDispatch()
    const {
      // active_ws : {id: ActiveWorkspaceID} ,
      // active_category : {id :ActiveCategoryID ,title : ActiveCategoryTitle},
      drawer : {open: Open , state: State , item: Item , anchor:Anchor}   
    }
    = useSelector((state :RootState)=>state.todoPageConfig)
  
    
    useEffect(()=>{
      if(!Open){
        setTodoTextEdited(false)
      }else{
        dispatch(setBlurPage())
      }
    },[Open])
   
    const setDoneThisTodo =()=>{
      todoSetDoneRequest({id:Item?._id})
      UpdateOnlyTodos()
    }

    useEffect(()=>{
        if(Open){
          setTodoBody(Item?.body)
        }
      },[Open])
  
    return (
      <Box className="drawer-box">
  


        <Box id="text-area-parent">
            <TextareaAutosize
              id="textAreaTodoDrawer"
              aria-label="minimum height"
              minRows={24}
              maxRows={30}
              ref={textAreaRef}
              placeholder="Edit Note"
              value={todoBody}
              onChange={(e)=>{
                setTodoTextEdited(true)
                setTodoBody(e.target.value)
              }}
              
            />
            <Box id="text-area-footer">
              <Button
                id="button-edit-todo"
                disabled={todoTextEdited ? false :true}
                onClick={()=>{ 

                  HandleTodoChangeBody(Item?._id , todoBody);
                  setTodoTextEdited(false)
                   
                }}
              >
                Edit todo
              </Button>
            </Box>
          </Box>
           
          <Box id="drawer-box-footer">
            {Item?.flag !== "isDone" && (
              <Box className="drawer-icon-box">
                <Tooltip arrow title="Done It">
                  <IconButton
                    onClick={(e)=>{
                      setDoneThisTodo()
                    }}
                  >
                    <MdOutlineDownloadDone
                      className="drawer-footer-icon"
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            {(Item?.categoId === "other" || Item?.categoId == null) && (
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
                >
                  <FaEdit className="drawer-footer-icon" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          {modalOpen.status ? (
            <>
              {modalOpen.modal === "delete" && (
                <ShowModalDelete
                  todo={Item}
                  setModalOpen={setModalOpen}
                  DeleteTodoOperation={DeleteTodoOperation}
                />
              )}
              {modalOpen.modal === "add-to-category" && (
                <ShowModalAddToCategory
                  setModalOpen={setModalOpen}
                  CategoryList={CategoryList}
                  HandleTodoAssignToCategory={HandleTodoAssignToCategory}
                />
              )}
            </>
          ) : null}
</Box>



  
  
    )
}

export default TodoDrawer