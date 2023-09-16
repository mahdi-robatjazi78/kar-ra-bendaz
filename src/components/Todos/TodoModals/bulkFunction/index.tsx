import React, { useEffect, useState, useContext } from "react";
import {
  Autocomplete,
  Box,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
} from "@mui/material";
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
import { pairColors, soundPlay, truncateText } from "@/util/funcs";
import "./bulkFunctionStyles.scss";
import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";
import ThemeContext from "@/context/themeContext";
import useWindowSize from "@/hooks/useWindowSize";


const CustomPaper = (props) => {
  return (
    <Paper
      elevation={8}
      {...props}
      style={{
        background: "var(--background)",
        border: "2px dashed var(--text2)",
        margin: "3px 0",
      }}
    />
  );
};



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
  const theme = useContext(ThemeContext);
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
    }).unwrap().then((resp) => {
      if (playSound) {
        soundPlay("sound1.wav");
      }
      Toast(resp.msg, true, true , "🗑️");
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

  const [w, h] = useWindowSize().size;

  return (
    <Styled_Modal
      aria-labelledby="bulk-function-modal"
      aria-describedby="bulk-function-modal-for-todos functionallity"
      open={open}
      onClose={onClose}
    >
      <Box className="bulk-function-container">
        <Box
          sx={{
            backgroundColor: pairColors(
              "var(--foreground)",
              "var(--header)",
              theme.isDarkMode
            ),
          }}
          className="todo-list-box"
        >
          {data.items.map((item) => (
            <>
              <Box className="d-flex-between">
                <Text variant="h6">
                  {truncateText(item.innerTodoText, 120)}
                </Text>
                <span
                  onClick={() =>
                    dispatch(
                      removeMouseSelectedItemWithId({ id: item.boxTodoId })
                    )
                  }
                >
                  <Text>
                    <MdOutlineClose />
                  </Text>
                </span>
              </Box>
              <Text>
                <Divider />
              </Text>
            </>
          ))}
        </Box>
        <Box
          sx={{
            backgroundColor: pairColors(
              "var(--foreground)",
              "var(--header)",
              theme.isDarkMode
            ),
          }}
          className="bulk-function-parent-modal bulk-function-operation"
        >
          <Box
            className={`drawer-icon-box ${
              stateFunction === "multy-done" ? "bordered" : ""
            }`}
          >
            <Tooltip arrow title="Done All">
              <span
                onClick={(e) => {
                  setStateFunction("multy-done");
                }}
              >
                <MdDone className="drawer-footer-icon" />
              </span>
            </Tooltip>
          </Box>

          <Box
            className={`drawer-icon-box  ${
              stateFunction === "multy-assign" ? "bordered" : ""
            }`}
          >
            <Tooltip arrow title="Todos Add To Category">
              <span
                onClick={() => {
                  setStateFunction("multy-assign");
                }}
              >
                <BsFolderSymlink className="drawer-footer-icon" />
              </span>
            </Tooltip>
          </Box>

          <Box
            className={`drawer-icon-box  ${
              stateFunction === "multy-delete" ? "bordered" : ""
            }`}
          >
            <Tooltip arrow title="Delete All">
              <span onClick={() => setStateFunction("multy-delete")}>
                <SlTrash className="drawer-footer-icon" />
              </span>
            </Tooltip>
          </Box>
          <Box
            className={`drawer-icon-box ${
              stateFunction === "multy-priority" ? "bordered" : ""
            }`}
          >
            <Tooltip arrow title="Set new priority">
              <span
                onClick={(e) => {
                  setStateFunction("multy-priority");
                }}
              >
                <BsFlag className="drawer-footer-icon" />
              </span>
            </Tooltip>
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: pairColors(
              "var(--foreground)",
              "var(--header)",
              theme.isDarkMode
            ),
          }}
          className="footer"
        >
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
              <Box className="button-box">
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
            </Box>
          ) : stateFunction === "multy-done" ? (
            <Box className="d-flex-between-nowrap">
              <Text variant="h6" onlyWhite={true}>
                Do you want done all {data?.count} {data?.entity} item ?
              </Text>
              <Box className="button-box">
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
            </Box>
          ) : stateFunction === "multy-assign" ? (
            <Box className="d-flex-between-nowrap">
              <Autocomplete
                size={w > 600 ? "medium" : "small"}
                freeSolo
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
                PaperComponent={CustomPaper}
                renderInput={(params) => (
                  <StyledTextFieldWhite
                    {...params}
                    lighter={true}
                    label="Select Category"
                  />
                )}
              />
              <Box className="button-box">
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
                  disabled={!selectedCategoryForAssign.uuid}
                >
                  Assign
                </StyledButton>
              </Box>
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
