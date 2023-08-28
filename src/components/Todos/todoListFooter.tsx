import React, { useContext, useEffect } from "react";
import { HiPlus } from "react-icons/hi";
import { Badge, Box, IconButton, InputAdornment, Tooltip } from "@mui/material";
import { FiSearch } from "react-icons/fi";
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
import { GrConfigure, GrMultiple } from "react-icons/gr";
import FooterButton from "../mini/footerButton";
import BoxIconsPopop from "../mini/boxIconsPopop";
import { RiTodoLine } from "react-icons/ri";
import { MdOutlineCategory } from "react-icons/md";

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
    setShowAddCategoryModal,
    setOpenBulkFunctionModal,
  } = props;
  const dispatch = useDispatch();

  const sizeName = useWindowSize().sizeName;

  const { searchText, layout_nav_show, mouse_selected_items } = useSelector(
    (state: RootState) => state.todoPageConfig
  );
  useEffect(() => {
    if (searchMode) {
      emptyTodoList();
      dispatch(customBlur({ head: true, sidebar: true, body: false  }));
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

  const [anchorElBoxIconsPopop, setAnchorElBoxIconsPopop] =
    React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorElBoxIconsPopop);
  const id = open ? "Box-Icons-Popop" : undefined;

  const handleCloseTodoViewCountTooltip = () => {
    dispatch(deactiveBlur());
    setAnchorElBoxIconsPopop(null);
  };

  const handleOpenTodoViewCountTooltip = (event: any) => {
    setAnchorElBoxIconsPopop(event.currentTarget);
  };

  const AddNewTodoFunction = () => {
    handleCloseTodoViewCountTooltip();
    setShowModalAddTodo(true);
  };
  const AddNewCategoryFunction = () => {
    handleCloseTodoViewCountTooltip();
    setShowAddCategoryModal();
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
          lighter={false}
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
                    <VscChromeClose color="var(--borders)" />
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

          <Box display="flex" alignItems="center" mr={2}>
            {+mouse_selected_items.count > 0 && (
              <FooterButton
                title={`You have selected ${mouse_selected_items?.count} ${mouse_selected_items?.entity} items`}
                icon={
                  <Badge
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    badgeContent={+mouse_selected_items.count}
                    color="success"
                  >
                    <GrMultiple />
                  </Badge>
                }
                onClick={() => {
                  setOpenBulkFunctionModal(true);
                }}
              />
            )}

            {sizeName === "mobile" || sizeName === "tablet" ? (
              <FooterButton
                title="Pagination"
                icon={<HiOutlineViewColumns />}
                onClick={() => {
                  dispatch(setBlurPage());
                  dispatch(
                    handleSettingModalOpen({ setting: "todo-pagination" })
                  );
                }}
              />
            ) : null}
            {!layout_nav_show ? (
              <FooterButton
                title="Config Layout"
                icon={<GrConfigure />}
                onClick={() => {
                  dispatch(setBlurPage());
                  dispatch(handleSettingModalOpen({ setting: "todo-layout" }));
                }}
              />
            ) : null}
            <FooterButton
              title="Search"
              icon={<FiSearch />}
              onClick={() => {
                dispatch(SearchModeActive());
              }}
            />
            <FooterButton
              title="Add New Todo"
              icon={<HiPlus />}
              onClick={(e) => {
                if (layout_nav_show) {
                  setShowModalAddTodo(true);
                } else {
                  dispatch(setBlurPage());
                  handleOpenTodoViewCountTooltip(e);
                }
              }}
            />
            <BoxIconsPopop
              anchorEl={anchorElBoxIconsPopop}
              open={open}
              id={id}
              handleCloseTodoViewCountTooltip={handleCloseTodoViewCountTooltip}
              iconList={[<MdOutlineCategory />, <RiTodoLine />]}
              titleList={["Add New Category", "Add New Todo"]}
              onClickList={[AddNewCategoryFunction, AddNewTodoFunction]}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default TodoPageFooter;
