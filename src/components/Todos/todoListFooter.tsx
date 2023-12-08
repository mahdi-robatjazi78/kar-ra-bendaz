import React, { useContext, useEffect } from "react";
import { HiOutlineFilter, HiPlus } from "react-icons/hi";
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
  SetNewFilter,
  SetNoFilter,
} from "@/redux/features/todoPageConfigSlice";
import useDebounce from "@hooks/useDebounce";
import useWindowSize from "@hooks/useWindowSize";
import { PaginationComponent, PerPageComponent } from "./paginate";
import { GrConfigure, GrMultiple } from "react-icons/gr";
import FooterButton from "../mini/footerButton";
import BoxIconsPopup from "../mini/popop/boxIconsPopup";
import { RiTodoLine } from "react-icons/ri";
import { MdDoneOutline, MdPriorityHigh } from "react-icons/md";
import { BsFolderPlus } from "react-icons/bs";
import { PiSliders } from "react-icons/pi";
import { BiSearch } from "react-icons/bi";
import PriorityFilterPopup from "../mini/popop/priorityFitlerPopup";
import { IoCloseCircleOutline } from "react-icons/io5";

const TodoPageFooter = (props) => {
  const {
    setShowModalAddTodo,
    handleChangeMeta,
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
  const [width, height] = useWindowSize().size;

  const {
    searchText,
    layout_nav_show,
    mouse_selected_items,
    meta: Meta,
    filter_by: { filter_name: FilterName, filter_data: FilterData },
  } = useSelector((state: RootState) => state.todoPageConfig);
  useEffect(() => {
    if (searchMode) {
      emptyTodoList();
      dispatch(customBlur({ head: true, sidebar: true, body: false }));
      setCloseSidebar();
    }
  }, [searchMode]);

  useEffect(() => {
    if (FilterName !== "search" && searchMode) {
      dispatch(SearchModeDeActive());
      setOpenSidebar();
    }
  }, [FilterName]);

  const handleBackFromSearchState = () => {
    dispatch(deactiveBlur());
    dispatch(EmptySearchText());
    setOpenSidebar();
    UpdateOnlyTodos();
    dispatch(SetNoFilter(""));
    dispatch(SearchModeDeActive());
  };

  // DeBounce Function
  useDebounce(
    () => {
      if (searchText) {
        // UpdateOnlyTodos(null, null, searchText);
        dispatch(
          SetNewFilter({
            filter_name: "search",
            filter_data: { text: searchText },
          })
        );
      }
    },
    [searchText],
    600
  );

  //  new todo or new category popup state

  const [anchorElBoxIconsPopop, setAnchorElBoxIconsPopop] =
    React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorElBoxIconsPopop);
  const id = open ? "Box-Icons-Popop" : undefined;

  const handleCloseTodoViewCountPopup = () => {
    dispatch(deactiveBlur());
    setAnchorElBoxIconsPopop(null);
  };

  const handleOpenTodoViewCounPopup = (event: any) => {
    dispatch(setBlurPage());
    setAnchorElBoxIconsPopop(event.currentTarget);
  };

  // filte popup state

  const [anchorElFilterBoxIconsPopup, setAnchorElFilterBoxIconsPopup] =
    React.useState<HTMLButtonElement | null>(null);
  const openFilterBoxIconsPopup = Boolean(anchorElFilterBoxIconsPopup);
  const idFilterBoxIconsPopup = openFilterBoxIconsPopup
    ? "Filter-Box-Icons-Popop"
    : undefined;

  const handleCloseFilterBoxIconsPopup = () => {
    dispatch(deactiveBlur());
    setAnchorElFilterBoxIconsPopup(null);
  };

  const handleOpenFilterBoxIconsPopup = (event: any) => {
    dispatch(setBlurPage());
    setAnchorElFilterBoxIconsPopup(event.currentTarget);
  };

  // anchor el for todo priority filter

  const [priorityAnchorEl, setPriorityAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);
  const openPriorityFilterPopup = Boolean(priorityAnchorEl);
  const idPriorityFilterPopup = open
    ? "todo-view-multi-column-popup-id"
    : undefined;

  const handleClosePriorityFilterPopup = () => {
    setPriorityAnchorEl(null);
    handleCloseFilterBoxIconsPopup();
  };

  const handleOpenPriorityFitlerPopup = (event) => {
    setPriorityAnchorEl(event.currentTarget);
  };

  // some functions

  const AddNewTodoFunction = () => {
    handleCloseTodoViewCountPopup();
    handleCloseFilterBoxIconsPopup();
    setShowModalAddTodo(true);
  };
  const AddNewCategoryFunction = () => {
    handleCloseTodoViewCountPopup();
    handleCloseFilterBoxIconsPopup();
    setShowAddCategoryModal();
  };

  const handleIsDoneFilter = () => {
    dispatch(
      SetNewFilter({
        filter_name: "done",
        filter_data: { filter: "is_done_todos" },
      })
    );
    handleCloseFilterBoxIconsPopup();
  };
  const handleShowPriorityBox = (event) => {
    handleOpenPriorityFitlerPopup(event);
  };
  const handlePagination = () => {
    dispatch(
      SetNewFilter({
        filter_name: "pagination",
        filter_data: Meta,
      })
    );
    if (sizeName === "mobile" || sizeName === "tablet") {
      dispatch(setBlurPage());
      dispatch(handleSettingModalOpen({ setting: "todo-pagination" }));
    }
    handleCloseFilterBoxIconsPopup();
  };
  const handleSearch = () => {
    dispatch(SetNewFilter({ filter_name: "search" }));
    dispatch(SearchModeActive());
    handleCloseFilterBoxIconsPopup();
  };

  return (
    <Box
      className="todo-list-footer"
      style={{ justifyContent: searchMode ? "center" : "space-between" }}
    >
      {searchMode ? (
        <>
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
                // escape key down
                handleBackFromSearchState();
              }
            }}
            onChange={(e) => {
              let val = e.target.value;
              if (val) {
                dispatch(ChangeSearchText({ text: val }));
              } else {
                
                dispatch(ChangeSearchText({ text: "" }));
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

          {+mouse_selected_items.count > 0 && (
            <Box style={{ marginTop: ".4rem" }}>
              <FooterButton
                title={`You have selected ${mouse_selected_items?.count} ${mouse_selected_items?.entity} items`}
                icon={
                  <Badge
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
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
            </Box>
          )}
        </>
      ) : (
        <>
          {sizeName === "mobile" || sizeName === "tablet" ? (
            <Box></Box>
          ) : FilterName === "pagination" ? (
            <PerPageComponent
              meta={FilterData}
              handleChangeMeta={handleChangeMeta}
            />
          ) : (
            <Box></Box>
          )}
          {sizeName === "mobile" || sizeName === "tablet" ? (
            <Box></Box>
          ) : FilterName === "pagination" ? (
            <PaginationComponent
              meta={FilterData}
              handleChangeMeta={handleChangeMeta}
            />
          ) : (
            <Box></Box>
          )}

          <Box display="flex" alignItems="center" mr={2}>
            {+mouse_selected_items.count > 0 && (
              <FooterButton
                title={`You have selected ${mouse_selected_items?.count} ${mouse_selected_items?.entity} items`}
                icon={
                  <Badge
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
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

            {(height < 625 || !layout_nav_show) && (
              <FooterButton
                title="Filter"
                icon={
                  <Badge
                    invisible={!FilterName}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    badgeContent={
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(SetNoFilter(""));
                        }}
                        style={{ transform: "translateY(2px)" }}
                      >
                        <Tooltip title="close">
                          <Box
                            sx={{
                              "& svg": {
                                background: "var(--sidebar)",
                                borderRadius: "1rem",
                                cursor: "pointer",
                                fill: "red",
                              },
                              "& path:nth-child(1)": {
                                fill: "red",
                              },
                            }}
                          >
                            <IoCloseCircleOutline />
                          </Box>
                        </Tooltip>
                      </span>
                    }
                  >
                    <HiOutlineFilter className="filter-icon-styles" />
                  </Badge>
                }
                onClick={handleOpenFilterBoxIconsPopup}
              />
            )}

            {sizeName === "mobile" || sizeName === "tablet" ? (
              <FooterButton
                title="Pagination"
                icon={<HiOutlineViewColumns />}
                onClick={() => {
                  handlePagination();
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
              title="Add New Todo"
              icon={<HiPlus />}
              onClick={(e) => {
                if (layout_nav_show) {
                  setShowModalAddTodo(true);
                } else {
                  handleOpenTodoViewCounPopup(e);
                }
              }}
            />
          </Box>
        </>
      )}
      {/* Popup's  ui handle here */}

      <BoxIconsPopup
        anchorEl={anchorElBoxIconsPopop}
        open={open}
        id={id}
        handleCloseTodoViewCountPopup={handleCloseTodoViewCountPopup}
        iconList={[<BsFolderPlus />, <RiTodoLine />]}
        titleList={["Add New Category", "Add New Todo"]}
        onClickList={[AddNewCategoryFunction, AddNewTodoFunction]}
      />

      <BoxIconsPopup
        anchorEl={anchorElFilterBoxIconsPopup}
        open={openFilterBoxIconsPopup}
        id={idFilterBoxIconsPopup}
        handleCloseTodoViewCountPopup={handleCloseFilterBoxIconsPopup}
        iconList={[
          <MdDoneOutline />,
          <MdPriorityHigh />,
          <PiSliders />,
          <BiSearch />,
        ]}
        titleList={["Is Done", "Priority", "Pagination", "Search"]}
        onClickList={[
          handleIsDoneFilter,
          handleShowPriorityBox,
          handlePagination,
          handleSearch,
        ]}
      />

      <PriorityFilterPopup
        open={openPriorityFilterPopup}
        id={idPriorityFilterPopup}
        anchorEl={priorityAnchorEl}
        handleCloseTodoViewCountPopup={handleClosePriorityFilterPopup}
      />
    </Box>
  );
};

export default TodoPageFooter;
