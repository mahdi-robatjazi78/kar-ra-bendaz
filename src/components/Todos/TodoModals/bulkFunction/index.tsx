import React, { useEffect, useState } from "react";
import { Autocomplete, Box, IconButton, Stack, Tooltip } from "@mui/material";
import Styled_Modal from "@/styles/styled/styled_modal";
import Text from "@/styles/styled/styled_typography";
import { MdOutlineClose, MdDone } from "react-icons/md";
import {
  useTodoSetDoneBulkMutation,
  useTodoDeleteBulkMutation,
  useTodosAssignBulkMutation,
  useUpdatePriorityBulkMutation,
} from "@/redux/api/todos";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import Toast from "@/util/toast";
import StyledButton from "@/styles/styled/styled_button";
import { removeMouseSelectedItemWithId } from "@/redux/features/todoPageConfigSlice";
import StyledTextFieldWhite from "@/styles/styled/styled_textField";
import StyledBadge from "@/styles/styled/styled_badge";
import { BsFlag, BsFolderSymlink } from "react-icons/bs";
import { SlTrash } from "react-icons/sl";
import { soundPlay } from "@/util/funcs";
import "./bulkFunctionStyles.scss";
import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";
const BulkFunction = (props) => {
  const {
    data,
    open,
    onClose,
    UpdateOnlyTodos,
    UpdateTodoAndCategories,
    categoList,
  } = props;
  const [selectedCategoryForAssign, setSelectedCategoryForAssign] = useState<{
    title: string;
    uuid: string;
  }>({ title: "", uuid: "" });
  const { playSound } = useSelector((state: RootState) => state.settings);

  const [todoDeleteRequest, todoDeleteResponse] = useTodoDeleteBulkMutation();
  const [todoSetDoneRequest, todoSetDoneResponse] =
    useTodoSetDoneBulkMutation();
  const [updatePriorityBulkRequest, updatePriorityBulkResponse] =
    useUpdatePriorityBulkMutation();
  const [todoAssignBulkRequest, todosAssignBulkResponse] =
    useTodosAssignBulkMutation();
  const [stateFunction, setStateFunction] = useState(null);
  const {
    active_ws: { id: ActiveWorkspaceID },
  } = useSelector((state: RootState) => state.todoPageConfig);
  const dispatch = useDispatch();
  const handleDeleteAllSelectedTodoItems = () => {
    todoDeleteRequest({
      list: data.items.map((item) => item.boxTodoId),
      ws: ActiveWorkspaceID,
    }).then((resp) => {
      if (playSound) {
        soundPlay("sound1.wav");
      }
      Toast(resp.data.msg, true, true);
    });
    UpdateTodoAndCategories();
    onClose();
  };

  const handleSetDoneAllSelectedTodoItems = () => {
    todoSetDoneRequest({
      ids: data.items.map((item) => item.boxTodoId),
      ws: ActiveWorkspaceID,
    }).then((resp) => {
      if (playSound) {
        soundPlay("sound5.wav");
      }
      Toast(resp.data.msg, true, true);
    });
    UpdateOnlyTodos();
    onClose();
  };

  const handleAssignAllSelectedTodoItems = () => {
    if (selectedCategoryForAssign?.uuid && data?.items?.length) {
      todoAssignBulkRequest({
        todoIdList: data.items.map((item) => item.boxTodoId),
        categoId: selectedCategoryForAssign?.uuid,
      }).then((resp) => {
        Toast(resp.data.msg, true, true);
      });
      UpdateTodoAndCategories();
      onClose();
    } else {
      Toast("Something went wrong please try again", false, true);
      onClose();
    }
  };

  useEffect(() => {
    if (!data?.count) {
      onClose();
    }
  }, [data?.count]);

  const handleSetNewPriority = (n: Number) => {
    updatePriorityBulkRequest({
      list: data.items.map((item) => item.boxTodoId),
      priority: n,
    })
      .then((response) => {
        Toast(response.data.msg, true, true);
        setStateFunction(null);
        if (playSound) {
          soundPlay("sound5.wav");
        }
        UpdateOnlyTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Styled_Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
    >
      <Box className="bulk-function-container">
        <Box className="todo-list-box">
          {data.items.map((item) => (
            <Box className="d-flex-between">
              <Text variant="h6" onlyWhite={true}>
                {item.innerTodoText}
              </Text>
              <IconButton
                onClick={() =>
                  dispatch(
                    removeMouseSelectedItemWithId({ id: item.boxTodoId })
                  )
                }
              >
                <MdOutlineClose color="white" />
              </IconButton>
            </Box>
          ))}
        </Box>
        <Box className="d-flex-around-column bulk-function-parent-modal bulk-function-operation">
          <Box
            className={`drawer-icon-box ${
              stateFunction === "multy-done" ? "bordered" : ""
            }`}
          >
            <Tooltip arrow title="Done All">
              <IconButton
                onClick={(e) => {
                  setStateFunction("multy-done");
                }}
              >
                <MdDone className="drawer-footer-icon" />
              </IconButton>
            </Tooltip>
          </Box>

          <Box
            className={`drawer-icon-box  ${
              stateFunction === "multy-assign" ? "bordered" : ""
            }`}
          >
            <Tooltip arrow title="Todos Add To Category">
              <IconButton
                onClick={() => {
                  setStateFunction("multy-assign");
                }}
              >
                <BsFolderSymlink className="drawer-footer-icon" />
              </IconButton>
            </Tooltip>
          </Box>

          <Box
            className={`drawer-icon-box  ${
              stateFunction === "multy-delete" ? "bordered" : ""
            }`}
          >
            <Tooltip arrow title="Delete All">
              <IconButton onClick={() => setStateFunction("multy-delete")}>
                <SlTrash className="drawer-footer-icon" />
              </IconButton>
            </Tooltip>
          </Box>

          <Box
            className={`drawer-icon-box ${
              stateFunction === "multy-priority" ? "bordered" : ""
            }`}
          >
            <Tooltip arrow title="Set new priority">
              <IconButton
                onClick={(e) => {
                  setStateFunction("multy-priority");
                }}
              >
                <BsFlag className="drawer-footer-icon" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Box className={"footer"}>
          {!stateFunction ? (
            <Text variant="h6" onlyWhite={true}>
              You have selected{" "}
              <StyledBadge
                fontSize={"1.4rem"}
                padding={"1rem .5rem"}
                bordered={true}
                style={{ margin: "1.2rem" }}
                badgeContent={data?.count || "0"}
              ></StyledBadge>{" "}
              {data?.entity} item
            </Text>
          ) : stateFunction === "multy-delete" ? (
            <Box className="d-flex-between-nowrap">
              <Text variant="h6" onlyWhite={true}>
                Do you want remove {data?.count} {data?.entity} item ?
              </Text>

              <StyledButton
                transparent={true}
                onClick={() => setStateFunction(null)}
                className={"active-button"}
                style={{ textTransform: "capitalize" }}
              >
                No
              </StyledButton>

              <StyledButton
                transparent={true}
                onClick={handleDeleteAllSelectedTodoItems}
                className={"active-button"}
                style={{ textTransform: "capitalize" }}
              >
                Yes
              </StyledButton>
            </Box>
          ) : stateFunction === "multy-done" ? (
            <Box className="d-flex-between-nowrap">
              <Text variant="h6" onlyWhite={true}>
                Do you want done all {data?.count} {data?.entity} item ?
              </Text>

              <StyledButton
                transparent={true}
                onClick={() => setStateFunction(null)}
                className={"active-button"}
                style={{ textTransform: "capitalize" }}
              >
                No
              </StyledButton>

              <StyledButton
                transparent={true}
                onClick={handleSetDoneAllSelectedTodoItems}
                className={"active-button"}
                style={{ textTransform: "capitalize" }}
              >
                Yes
              </StyledButton>
            </Box>
          ) : stateFunction === "multy-assign" ? (
            <Box className="d-flex-between-nowrap">
              <Autocomplete
                disablePortal
                id="category-list-combo-box"
                options={[{ title: "All", uuid: "other" }, ...categoList]}
                value={selectedCategoryForAssign}
                onChange={(e, val) => {
                  setSelectedCategoryForAssign({
                    title: val?.title || "",
                    uuid: val?.uuid || "",
                  });
                }}
                getOptionLabel={(option) => option.title}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <StyledTextFieldWhite
                    {...params}
                    lighter={true}
                    label="Select Category"
                  />
                )}
              />
              <StyledButton
                transparent={true}
                onClick={() => setStateFunction(null)}
                className={"active-button"}
                style={{ textTransform: "capitalize" }}
              >
                Cancel
              </StyledButton>

              <StyledButton
                transparent={true}
                onClick={handleAssignAllSelectedTodoItems}
                className={"active-button"}
                style={{ textTransform: "capitalize" }}
              >
                Assign
              </StyledButton>
            </Box>
          ) : stateFunction === "multy-priority" ? (
            <Stack direction="row" justifyContent="space-around">
              <Tooltip title="Set Low Priority">
                <IconButton
                  onClick={() => {
                    handleSetNewPriority(0);
                  }}
                >
                  <FcLowPriority fontSize="3rem" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Set Medium Priority">
                <IconButton
                  onClick={() => {
                    handleSetNewPriority(1);
                  }}
                >
                  <FcMediumPriority fontSize="3rem" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Set High Priority">
                <IconButton
                  onClick={() => {
                    handleSetNewPriority(2);
                  }}
                >
                  <FcHighPriority fontSize="3rem" />
                </IconButton>
              </Tooltip>
            </Stack>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </Styled_Modal>
  );
};

export default BulkFunction;
