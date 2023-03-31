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
  Pagination,
  Stack,
  Tooltip,
} from "@mui/material";
import { FiArrowLeft, FiArrowRight, FiSearch } from "react-icons/fi";
import StyledPaginationItem from "@/styles/styled/styled_pagination";
import StyledSelectWhiteComponent from "@/styles/styled/styled_Selectbox";
import StyledTextFieldWhite from "@/styles/styled/styled_textField";
import { VscChromeClose } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { customBlur, deactiveBlur } from "@/redux/features/settingSlice";
import { RootState } from "@/redux/store";
import {
  ChangeSearchText,
  EmptySearchText,
} from "@/redux/features/todoPageConfigSlice";
import { debounce } from "@/util/funcs";

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
  const StyledInputLabelWhite = styled(InputLabel)`
    color: var(--text1) !important;
    filter: brightness(0.7);
  `;
  const theme = useContext(ThemeContext);
  const { searchText } = useSelector(
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

              UpdateOnlyTodos(null, null, val);
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
          {ActiveCategoryID ? (
            <Box></Box>
          ) : (
            <Box width={120} style={{ margin: ".6rem 2.2rem 0rem 2rem" }}>
              <FormControl fullWidth size="small">
                <StyledInputLabelWhite id="per-page-select-label">
                  Per Page
                </StyledInputLabelWhite>
                <StyledSelectWhiteComponent
                  labelId="per-page-select-label"
                  value={meta?.limit || 5}
                  onChange={(e) => handleChangeMeta(1, Number(e.target.value))}
                  label={"Per Page"}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </StyledSelectWhiteComponent>
              </FormControl>
            </Box>
          )}
          {ActiveCategoryID ? (
            <Box></Box>
          ) : (
            <Box sx={{ marginTop: "5px" }}>
              <Stack spacing={2}>
                <Pagination
                  style={{ margin: ".8rem 2.2rem 0.3rem 0.5rem" }}
                  count={meta.total_pages}
                  page={meta?.page || 1}
                  onChange={(e, value) => {
                    handleChangeMeta(+value, Number(meta?.limit));
                  }}
                  renderItem={(item) => (
                    <StyledPaginationItem
                      slots={{ previous: FiArrowLeft, next: FiArrowRight }}
                      {...item}
                    />
                  )}
                />
              </Stack>
            </Box>
          )}

          <Box display="flex" mr={2}>
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
