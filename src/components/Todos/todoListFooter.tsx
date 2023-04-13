import React, { useContext, useEffect } from "react";
import ThemeContext from "@context/themeContext";
import { HiPlus } from "react-icons/hi";
import styled from "styled-components";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  // Pagination,
  Stack,
  Tooltip,
} from "@mui/material";
import { FiArrowLeft, FiArrowRight, FiSearch } from "react-icons/fi";
import StyledPaginationItem from "@/styles/styled/styled_pagination";
import StyledSelectWhiteComponent from "@/styles/styled/styled_Selectbox";
import StyledTextFieldWhite from "@/styles/styled/styled_textField";
import { VscChromeClose } from "react-icons/vsc";
import { HiOutlineViewColumns } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import {
  customBlur,
  deactiveBlur,
  handleSettingModalOpen,
  setBlurPage,
} from "@/redux/features/settingSlice";
import { RootState } from "@/redux/store";
import {
  ChangeSearchText,
  EmptySearchText,
} from "@/redux/features/todoPageConfigSlice";
import useDebounce from "@hooks/useDebounce";
import useWindowSize from "@hooks/useWindowSize";
import { PaginationComponent, PerPageComponent } from "./paginate";
import { TfiLayoutSidebar2 } from "react-icons/tfi";
import { GrConfigure } from "react-icons/gr";

const TodoPageFooter = (props) => {
  const {
    setShowModalAddTodo,
    meta,
    handleChangeMeta,
    ActiveCategoryID,
    emptyTodoList,
    UpdateOnlyTodos,
    setCloseSidebar,
    setOpenSidebar,
    searchMode,
    SearchModeActive,
    SearchModeDeActive,
  } = props;
  const dispatch = useDispatch();

  const theme = useContext(ThemeContext);
  const sizeName = useWindowSize().sizeName;

  const { searchText, layout_nav_show } = useSelector(
    (state: RootState) => state.todoPageConfig
  );
  useEffect(() => {
    if (searchMode) {
      emptyTodoList();
      dispatch(customBlur({ head: true, sidebar: true, body: false }));
      setCloseSidebar();
    }
  }, [searchMode]);

  const handleBackFromSearchState = () => {
    dispatch(SearchModeDeActive());
    dispatch(deactiveBlur());
    dispatch(EmptySearchText());
    setOpenSidebar();
    UpdateOnlyTodos();
  };

  // DeBounce Function
  useDebounce(
    () => {
      if (searchText) {
        UpdateOnlyTodos(null, null, searchText);
      }
    },
    [searchText],
    600
  );

  return (
    <Box
      className="todo-list-footer"
      style={{ justifyContent: searchMode ? "center" : "space-between" }}
    >
      {searchMode ? (
        <StyledTextFieldWhite
          type="text"
          variant="outlined"
          label="Search in todos"
          margin="normal"
          size="small"
          className="search-in-todos-box"
          autoFocus
          value={searchText}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.keyCode === 27) {
              handleBackFromSearchState();
            }
          }}
          onChange={(e) => {
            let val = e.target.value;
            if (val) {
              dispatch(ChangeSearchText({ text: val }));
            } else {
              dispatch(ChangeSearchText({ text: val }));

              emptyTodoList();
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Close (Esc)">
                  <IconButton
                    onClick={() => {
                      handleBackFromSearchState();
                    }}
                  >
                    <VscChromeClose />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
      ) : (
        <>
          {ActiveCategoryID ||
          sizeName === "mobile" ||
          sizeName === "tablet" ? (
            <Box></Box>
          ) : (
            <PerPageComponent meta={meta} handleChangeMeta={handleChangeMeta} />
          )}
          {ActiveCategoryID ||
          sizeName === "mobile" ||
          sizeName === "tablet" ? (
            <Box></Box>
          ) : (
            <PaginationComponent
              meta={meta}
              handleChangeMeta={handleChangeMeta}
            />
          )}

          <Box display="flex" mr={2}>
            {sizeName === "mobile" || sizeName === "tablet" ? (
              <Box className="add-new-todo-icon">
                <Tooltip arrow title="Pagination">
                  <Box
                    className="icon-box"
                    onClick={() => {
                      dispatch(setBlurPage());
                      dispatch(
                        handleSettingModalOpen({ setting: "todo-pagination" })
                      );
                    }}
                  >
                    <IconButton>
                      <HiOutlineViewColumns
                        fontSize=".8rem"
                        color={theme.isDarkMode ? "black" : "white"}
                      />
                    </IconButton>
                  </Box>
                </Tooltip>
              </Box>
            ) : null}

            {!layout_nav_show ? (
              <Box className="add-new-todo-icon">
                <Tooltip arrow title="Search">
                  <Box
                    className="icon-box"
                    onClick={() => {
                      dispatch(setBlurPage());
                      dispatch(
                        handleSettingModalOpen({ setting: "todo-layout" })
                      );
                    }}
                  >
                    <IconButton>
                      <GrConfigure
                        fontSize=".8rem"
                        color={theme.isDarkMode ? "black" : "white"}
                      />
                    </IconButton>
                  </Box>
                </Tooltip>
              </Box>
            ) : null}

            <Box className="add-new-todo-icon">
              <Tooltip arrow title="Search">
                <Box
                  className="icon-box"
                  onClick={() => {
                    dispatch(SearchModeActive());
                  }}
                >
                  <IconButton>
                    <FiSearch
                      fontSize=".8rem"
                      color={theme.isDarkMode ? "black" : "white"}
                    />
                  </IconButton>
                </Box>
              </Tooltip>
            </Box>
            <Box className="add-new-todo-icon">
              <Tooltip arrow title="Add New Task">
                <Box
                  className="icon-box"
                  onClick={() => setShowModalAddTodo(true)}
                >
                  <IconButton>
                    <HiPlus
                      fontSize=".8rem"
                      color={theme.isDarkMode ? "black" : "white"}
                    />
                  </IconButton>
                </Box>
              </Tooltip>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default TodoPageFooter;
