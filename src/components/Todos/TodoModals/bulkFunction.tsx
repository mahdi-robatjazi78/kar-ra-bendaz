import React, { useEffect, useState } from "react";

import {
  Autocomplete,
  Box,
  Grid,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import Styled_Modal from "@/styles/styled/styled_modal";
import Text from "@/styles/styled/styled_typography";
import { RiDeleteBin3Fill, RiFolderAddFill } from "react-icons/ri";
import { MdOutlineClose, MdOutlineDownloadDone } from "react-icons/md";
import {
  useTodoSetDoneBulkMutation,
  useTodoDeleteBulkMutation,
  useTodosAssignBulkMutation,
} from "@/redux/api/todos";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import Toast from "@/util/toast";
import StyledButton from "@/styles/styled/styled_button";
import { removeMouseSelectedItemWithId } from "@/redux/features/todoPageConfigSlice";
import StyledTextFieldWhite from "@/styles/styled/styled_textField";
import StyledBadge from "@/styles/styled/styled_badge";

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

  const [todoDeleteRequest, todoDeleteResponse] = useTodoDeleteBulkMutation();
  const [
    todoSetDoneRequest,
    todoSetDoneResponse,
  ] = useTodoSetDoneBulkMutation();

  const [
    todoAssignBulkRequest,
    todosAssignBulkResponse,
  ] = useTodosAssignBulkMutation();
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
      Toast(resp.data.msg);
    });
    UpdateTodoAndCategories();
    onClose();
  };

  const handleSetDoneAllSelectedTodoItems = () => {
    todoSetDoneRequest({
      ids: data.items.map((item) => item.boxTodoId),
      ws: ActiveWorkspaceID,
    }).then((resp) => {
      Toast(resp.data.msg);
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
        Toast(resp.data.msg);
      });
      UpdateTodoAndCategories();
      onClose();
    } else {
      Toast("Something went wrong please try again");
      onClose();
    }
  };

  useEffect(() => {
    if (!data?.count) {
      onClose();
    }
  }, [data?.count]);

  return (
    <Styled_Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
    >
      <Box display="flex" style={{ height: "65%", marginBottom: "2rem" }}>
        <Box
          sx={{ p: 3 }}
          style={{
            borderRadius: "1rem",
            backgroundColor: "var(--header)",
            margin: "1rem",
            padding: "1rem",
            height: "100%",
            flexBasis: "80%",
            overflowY: "auto",
          }}
        >
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
        <Box
          className="d-flex-around-column bulk-function-parent-modal"
          style={{
            borderRadius: "1rem",
            backgroundColor: "var(--header)",
            margin: "1rem",
            padding: "1rem",
          }}
        >
          <Box
            className="drawer-icon-box"
            style={
              stateFunction === "multy-done"
                ? {
                    border: "1px solid var(--borders)",
                  }
                : {}
            }
          >
            <Tooltip arrow title="Done All">
              <IconButton
                onClick={(e) => {
                  setStateFunction("multy-done");
                }}
              >
                <MdOutlineDownloadDone className="drawer-footer-icon" />
              </IconButton>
            </Tooltip>
          </Box>

          <Box
            className="drawer-icon-box"
            style={
              stateFunction === "multy-assign"
                ? {
                    border: "1px solid var(--borders)",
                  }
                : {}
            }
          >
            <Tooltip arrow title="Todos Add To Category">
              <IconButton
                onClick={() => {
                  setStateFunction("multy-assign");
                }}
              >
                <RiFolderAddFill className="drawer-footer-icon" />
              </IconButton>
            </Tooltip>
          </Box>

          <Box
            className="drawer-icon-box"
            style={
              stateFunction === "multy-delete"
                ? {
                    border: "1px solid var(--borders)",
                  }
                : {}
            }
          >
            <Tooltip arrow title="Delete All">
              <IconButton onClick={() => setStateFunction("multy-delete")}>
                <RiDeleteBin3Fill className="drawer-footer-icon" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box
          style={{
            borderRadius: ".4rem",
            backgroundColor: "var(--header)",
            margin: "1rem",
            padding: "1rem",
          }}
        >
          {!stateFunction ? (
            <Text variant="h6" onlyWhite={true}>
              You have selected{" "}
              <StyledBadge
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
                onClick={() => setStateFunction(null)}
                className={"active-button"}
                style={{ textTransform: "capitalize" }}
              >
                No
              </StyledButton>

              <StyledButton
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
                onClick={() => setStateFunction(null)}
                className={"active-button"}
                style={{ textTransform: "capitalize" }}
              >
                No
              </StyledButton>

              <StyledButton
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
                  <StyledTextFieldWhite {...params} label="Select Category" />
                )}
              />
              <StyledButton
                onClick={() => setStateFunction(null)}
                className={"active-button"}
                style={{ textTransform: "capitalize" }}
              >
                Cancel
              </StyledButton>

              <StyledButton
                onClick={handleAssignAllSelectedTodoItems}
                className={"active-button"}
                style={{ textTransform: "capitalize" }}
              >
                Assign
              </StyledButton>
            </Box>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </Styled_Modal>
  );
};

export default BulkFunction;