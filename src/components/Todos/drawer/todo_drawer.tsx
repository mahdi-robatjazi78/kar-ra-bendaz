import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  IconButton,
  TextareaAutosize,
  Tooltip,
  Stack,
  Chip,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  useTodoSetDoneMutation,
  useUpdatePriorityMutation,
} from "@/redux/api/todos";
import { setBlurPage } from "@/redux/features/settingSlice";
import { RootState } from "@/redux/store";
import { MdOutlineDownloadDone } from "react-icons/md";
import { RiDeleteBin3Fill, RiFolderAddFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import ShowModalDelete from "../TodoModals/delete";
import ShowModalAddToCategory from "../TodoModals/addToCategory";
import StyledButton from "@/styles/styled/styled_button";
import { handleCheckPersianAndRemoveHtmlTags, soundPlay } from "@/util/funcs";
import Text from "@/styles/styled/styled_typography";
import {
  FcLowPriority,
  FcMediumPriority,
  FcHighPriority,
} from "react-icons/fc";
import Toast from "@/util/toast";
import { ChangePriorityDrawer } from "@/redux/features/todoPageConfigSlice";
import { AiTwotoneEdit } from "react-icons/ai";

const TodoDrawer = (props) => {
  const [todoBody, setTodoBody] = useState("");
  const {
    DeleteTodoOperation,
    CategoryList,
    HandleTodoAssignToCategory,
    HandleTodoChangeBody,
    UpdateOnlyTodos,
  } = props.props;
  const { modalOpen, setModalOpen } = props;
  const [todoSetDoneRequest, todoSetDoneResponse] = useTodoSetDoneMutation();
  const [updatePriorityRequest, updatePriorityResponse] =
    useUpdatePriorityMutation();
  const [todoTextEdited, setTodoTextEdited] = useState(false);
  const [changePriorityBox, setChangePriorityBox] = useState(false);
  const textAreaRef = useRef(null);
  const dispatch = useDispatch();
  const {
    drawer: { open: Open, state: State, item: Item, anchor: Anchor },
  } = useSelector((state: RootState) => state.todoPageConfig);
  const { playSound } = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    if (!Open) {
      setTodoTextEdited(false);
    } else {
      dispatch(setBlurPage());
    }
  }, [Open]);

  const setDoneThisTodo = () => {
    todoSetDoneRequest({ id: Item?._id });
    if (playSound) {
      soundPlay("sound5.wav");
    }
    UpdateOnlyTodos();
  };

  const handleSetNewPriority = (n: Number) => {
    updatePriorityRequest({ todoId: Item?._id, priority: n }).unwrap()
      .then((response) => {
        Toast(response.msg, true, true);
        dispatch(ChangePriorityDrawer(n));
        setChangePriorityBox(false);
        if (playSound) {
          soundPlay("sound5.wav");
        }
        UpdateOnlyTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (Open) {
      setTodoBody(Item?.body);
    }
  }, [Open]);

   
  const [isPersian, setIsPersian] = useState(handleCheckPersianAndRemoveHtmlTags(todoBody))
  useEffect(()=>{
    setIsPersian(handleCheckPersianAndRemoveHtmlTags(todoBody))
  } , [todoBody])

  return (
    <Box className="drawer-box">
      <Box id="text-area-parent">
        <TextareaAutosize
          style={isPersian ? {textAlign:'right'} : {textAlign:"left"}}
          id="textAreaTodoDrawer"
          aria-label="minimum height"
          minRows={24}
          maxRows={30}
          ref={textAreaRef}
          placeholder="Edit Note"
          value={todoBody}
          onChange={(e) => {
            setTodoTextEdited(true);
            setTodoBody(e.target.value);
          }}
        />



        <Box id="text-area-footer">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            {changePriorityBox ? (
              <Stack direction="row" spacing={3}>
                <Tooltip title="Set Low Priority">
                  <IconButton
                    onClick={() => {
                      if (Item.priority !== 0) {
                        handleSetNewPriority(0);
                      } else {
                        setChangePriorityBox(false);
                      }
                    }}
                    style={
                      Item.priority === 0 ? { border: "1px solid green" } : {}
                    }
                  >
                    <FcLowPriority fontSize="2rem" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Set Medium Priority">
                  <IconButton
                    onClick={() => {
                      if (Item.priority !== 1) {
                        handleSetNewPriority(1);
                      } else {
                        setChangePriorityBox(false);
                      }
                    }}
                    style={
                      Item.priority === 1 ? { border: "1px solid orange" } : {}
                    }
                  >
                    <FcMediumPriority fontSize="2rem" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Set High Priority">
                  <IconButton
                    onClick={() => {
                      if (Item.priority !== 2) {
                        handleSetNewPriority(2);
                      } else {
                        setChangePriorityBox(false);
                      }
                    }}
                    style={
                      Item.priority === 2 ? { border: "1px solid red" } : {}
                    }
                  >
                    <FcHighPriority fontSize="2rem" />
                  </IconButton>
                </Tooltip>
              </Stack>
            ) : (
              <Chip
                label={
                  Item?.priority === 2 ? (
                    <Text>High</Text>
                  ) : Item?.priority === 1 ? (
                    <Text>Medium</Text>
                  ) : (
                    <Text>Low</Text>
                  )
                }
                variant="outlined"
                icon={<AiTwotoneEdit fontSize="1.4rem" />}
                sx={{
                  "& .MuiChip-deleteIcon": {
                    color: "var(--text1)",
                  },
                }}
                onClick={() => setChangePriorityBox(true)}
              />
            )}

            <StyledButton
              disabled={todoTextEdited ? false : true}
              onClick={() => {
                HandleTodoChangeBody(Item?._id, todoBody);
                setTodoTextEdited(false);
              }}
            >
              Edit todo
            </StyledButton>
          </Stack>
        </Box>
      </Box>

      <Box id="drawer-box-footer">
        {Item?.flag !== "isDone" && (
          <Box className="drawer-icon-box">
            <Tooltip arrow title="Done It">
              <IconButton
                onClick={(e) => {
                  setDoneThisTodo();
                }}
              >
                <MdOutlineDownloadDone className="drawer-footer-icon" />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        {/* {(Item?.categoId === "other" || Item?.categoId == null) && ( */}
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
        {/* // )} */}
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
  );
};

export default TodoDrawer;
