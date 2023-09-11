import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import {
  Tab,
  Box,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableBody,
  InputAdornment,
  Tooltip,
  TableContainer,
  Skeleton,
} from "@mui/material";
import { MdWorkspacesOutline } from "react-icons/md";
import ThemeContext from "@context/themeContext";
import { FiSearch } from "react-icons/fi";
import { IoCloseSharp, IoEnterOutline, IoReloadOutline } from "react-icons/io5";
import { RiAddLine } from "react-icons/ri";
import { CiEdit, CiTrash } from "react-icons/ci";
import Toast from "@/util/toast";
import StyledSwitch from "../../styles/styled/styled_switch";
import EmptyListAnimation from "@/util/emptyList/emptyListAnimation";
import {
  useWsListQuery,
  useStoreNewWsMutation,
  useActiveWsMutation,
  useRenameWsMutation,
  useDeleteWsMutation,
} from "../../redux/api/workspaces";
import todoPageConfigSlice, {
  OpenSidebar,
  SetActiveWs,
  UnActiveWs,
} from "@/redux/features/todoPageConfigSlice";
import { useDispatch, useSelector } from "react-redux";
import { StyledTableCell, StyledTableRow } from "@/styles/styled/styled_table";
import StyledTabs from "@/styles/styled/styled_tabs";
import Styled_Standard_Textfield from "@/styles/styled/styled_standard_textfield";
import Text from "@/styles/styled/styled_typography";
import { TodoRtkService } from "@/redux/api/todos";
import { CategoryRtkService } from "@/redux/api/categories";
import StyledButton from "@/styles/styled/styled_button";
import { RootState } from "@/redux/store";
import useWindowSize from "@/hooks/useWindowSize";
import { soundPlay, truncateText } from "@/util/funcs";
import { useNavigate } from "react-router-dom";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  sx?: object;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ height: "87%", overflowY: "auto" }}
    >
      {value === index && (
        <Box style={{ height: "100%", overflowY: "auto" }}>{children}</Box>
      )}
    </div>
  );
}

const AddOrSearchUi = (props) => {
  const {
    state,
    space,
    backToIcons,
    text,
    setText,
    setResultText,
    AddWorkspace,
    editWorkspaceTitle,
  } = props;
  const [val, setVal] = useState("");

  const handlekeydown = (e) => {
    if (e.keyCode == 13) {
      // enter key
      switch (state) {
        case "add":
          AddWorkspace();
          break;
        case "rename":
          editWorkspaceTitle();
          break;
        case "search":
          SearchInWorkspace();
          break;
        default:
          break;
      }
    }
    if (e.keyCode == 27) {
      // escape key
      backToIcons();
    }
  };
  const handleChangeValue = (e) => {
    setText(e.target.value);
  };

  

  const SearchInWorkspace = async () => {
    setResultText(text);
  };

  return (
    <Box>
      <Styled_Standard_Textfield
        autoFocus
        InputLabelProps={{ shrink: true }}
        type="text"
        size="small"
        variant="standard"
        label={state === "add"  ? "Add new workspace" : "searh in workspaces"}
        value={text}
        onChange={handleChangeValue}
        onKeyDown={handlekeydown}
        InputProps={{
          endAdornment: (
            <>
              <InputAdornment position="end">
                <Tooltip
                  title={
                    state === "add"
                      ? "Add"
                      : state === "search"
                      ? "Search"
                      : "Rename"
                  }
                >
                  {state === "add" ? (
                    <RiAddLine
                      onClick={(e) => {
                        console.log("click");
                        if (space === "workspace") {
                          AddWorkspace();
                        }
                      }}
                      className="add-space-icon cp"
                    />
                  ) : state === "rename" ? (
                    <CiEdit
                      onClick={() => {
                        if (space === "workspace") {
                          editWorkspaceTitle();
                        }
                      }}
                      className="add-space-icon cp"
                    />
                  ) : (
                    <FiSearch
                      onClick={() => {
                        if (space === "workspace") {
                          SearchInWorkspace();
                        }
                      }}
                      className="add-space-icon cp"
                    />
                  )}
                </Tooltip>
              </InputAdornment>

              <InputAdornment position="end">
                <Tooltip title={"Close"}>
                  <IoCloseSharp
                    className="add-space-icon cp"
                    onClick={() => {
                      backToIcons();
                    }}
                  />
                </Tooltip>
              </InputAdornment>
            </>
          ),
        }}
      />
    </Box>
  );
};

const WorkspacesTable = () => {
  const [value, setValue] = useState(0);
  const [state, setState] = useState("icons");
  const [wsSelectedId, setWsSelectedId] = useState("");
  const [wsSelectedTitle, setWsSelectedTitle] = useState("");
  const [inputText, setInputText] = useState("");
  const [resultText, setResultText] = useState("");
  const backToIcons = () => {
    setInputText("");
    setResultText("");
    setWsSelectedId("");
    setState("icons");
  };
  const {
    data = [],
    isLoading,
    isSuccess,
    refetch,
  } = useWsListQuery(resultText);
  const sizeName = useWindowSize().sizeName;

  useLayoutEffect(() => {
    //  set active workspace after page loaded

    if (isSuccess) {
      const activeWorkspace = data?.workspaces?.find((item) => item.active);
      if (activeWorkspace?.id) {
        dispatch(
          SetActiveWs({
            id: activeWorkspace?.id,
            title: activeWorkspace?.title,
          })
        );
      }
    }
  }, [isSuccess]);
  const [storeNewWs, respStoreNewWs] = useStoreNewWsMutation();
  const [activeWs, respActiveWs] = useActiveWsMutation();
  const [renameWs, respRenameWs] = useRenameWsMutation();
  const [deleteWsRequest, deleteWorkspaceResponse] = useDeleteWsMutation();
  const {
    active_ws: { id: ActiveWorkspaceId },
  } = useSelector((state: RootState) => state.todoPageConfig);
  const { playSound } = useSelector((state: RootState) => state.settings);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const AddWorkspace = () => {
    if (inputText && inputText.length >= 3  && inputText.length <= 25) {
      storeNewWs({ title: inputText })
        .unwrap()
        .then((res) => {

        })
        .catch((err) => {
          console.log(err);
        });
    }else{
      Toast("Minimum 3 And Maximum 25 characters" , false , true)
    }
  };

  const editWorkspaceTitle = () => {
    if (inputText) {
      renameWs({ title: inputText, id: wsSelectedId })
        .unwrap()
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleActiveWorkspace = (checked, id) => {
    activeWs({ id, active: checked })
      .unwrap()
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // AFTER STORE REQUEST
    if (respStoreNewWs.isSuccess) {
      Toast(respStoreNewWs?.data?.msg, true, true);
      if (playSound) {
        soundPlay("sound5.wav")
      }
      backToIcons();
      setInputText("");
      refetch();
    }
  }, [respStoreNewWs.isSuccess]);

  useEffect(() => {
    // AFTER ACTIVE OR DIACTIVE REQUEST
    if (respActiveWs.isSuccess) {
      Toast(respActiveWs?.data?.msg, true, true);
      dispatch(TodoRtkService.util.resetApiState());
      dispatch(CategoryRtkService.util.resetApiState());

      if (respActiveWs?.data?.activeWorkspace?.id) {
        dispatch(
          SetActiveWs({
            id: respActiveWs?.data?.activeWorkspace?.id,
            title: respActiveWs?.data?.activeWorkspace?.title,
          })
        );
      } else {
        dispatch(UnActiveWs());
      }
      backToIcons();
      setInputText("");
      refetch();
    }
  }, [respActiveWs.isSuccess]);

  useEffect(() => {
    // AFTER RENAME REQUEST
    if (respRenameWs.isSuccess) {
      backToIcons();
      setInputText("");
      refetch();
      if (respRenameWs?.data?.data?.id) {
        dispatch(
          SetActiveWs({
            id: respRenameWs?.data?.data?.id,
            title: respRenameWs?.data?.data?.title,
          })
        );
      }
      if (playSound) {
        soundPlay("sound2.mp3")
      }
      Toast(respRenameWs?.data?.msg, true, true);
    }
  }, [respRenameWs.isSuccess]);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  const theme = useContext(ThemeContext);

  const handleDeleteWorkspace = () => {
    deleteWsRequest({ id: wsSelectedId })
      .unwrap()
      .then((response) => {
        if (
          wsSelectedId &&
          ActiveWorkspaceId &&
          ActiveWorkspaceId === wsSelectedId
        ) {
          dispatch(UnActiveWs());
        }

    

        setWsSelectedId("");
        setWsSelectedTitle("");
        refetch();
        setState("icons");
        if (playSound) {
          soundPlay("sound1.wav");
        }
        Toast(response?.msg, true, true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOpenWorkspace = () => {
    dispatch(OpenSidebar());

    if (playSound) {
      soundPlay("sound8.wav");
    }

    navigate("/todos");
  };

  return (
    <Box className="add-space-box">
      <Box
        className="add-space-icon-box d-flex-between"
      >
        <IconButton style={{ width: 37 }}>
          <MdWorkspacesOutline className="add-space-icon" />
        </IconButton>
        {state === "icons" && value === 0 ? (
          <Box>
            <Tooltip title="Add new workspace">
              <IconButton onClick={() => setState("add")} style={{ width: 37 }}>
                <RiAddLine className="add-space-icon" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Search in workspaces">
              <IconButton
                onClick={() => setState("search")}
                style={{ width: 37 }}
              >
                <FiSearch className="add-space-icon" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Reload">
              <IconButton
                onClick={() => {
                  refetch();
                }}
                style={{ width: 37 }}
              >
                <IoReloadOutline className="add-space-icon" />
              </IconButton>
            </Tooltip>
          </Box>
        ) : state === "add" || state === "search" || state === "rename" ? (
          <AddOrSearchUi
            state={state}
            space={"workspace"}
            backToIcons={backToIcons}
            refetch={refetch}
            text={inputText}
            setText={setInputText}
            setResultText={setResultText}
            storeNewWs={storeNewWs}
            AddWorkspace={AddWorkspace}
            editWorkspaceTitle={editWorkspaceTitle}
          />
        ) : state === "remove" ? (
          <>
            <Box className="d-flex-between" style={{ gap: "1rem", marginRight :"1rem" }}>
              <Text>
                Do you want Delete{" "}
                {wsSelectedTitle ? (
                  <code> {`${truncateText(wsSelectedTitle, 15)} ?`}</code>
                ) : (
                  "it ? "
                )}
              </Text>
              <StyledButton size="small" onClick={() => setState("icons")}>
                Cancel
              </StyledButton>
              <StyledButton size="small" onClick={handleDeleteWorkspace}>
                Delete It
              </StyledButton>
            </Box>
          </>
        ) : state === "pagination" ? (
          <></>
        ) : (
          <></>
        )}
      </Box>
      <Box className="add-space-item-box">
        <StyledTabs
          isDarkMode={theme.isDarkMode}
          backLight={true}
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="note board and todo workspace tabs"
          scrollButtons="auto"
        >
          <Tab value={0} label="Todo Workspace" />
          <Tab value={1} label="Note Boards" />
          <Tab value={2} label="Widget Dashboards" />
          <Tab value={3} label="Music Player" />
          <Tab value={4} label="Leitner Box" />
        </StyledTabs>

        <TabPanel value={value} index={0}>
          {isLoading ? (
            <Box display="flex" justifyContent={"space-around"}>
              {Array(16)
                .fill("t")
                .map((item, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    width={20}
                    height={20}
                  />
                ))}
            </Box>
          ) : (
            <>
              {!isSuccess || !data?.workspaces?.length ? (
                <Box
                  className="position-central"
                  style={{
                    width: "100%",
                    height: 120,
                  }}
                >
                  <EmptyListAnimation text="Empty List 📝" fontSize="2rem" />
                </Box>
              ) : (
                <TableContainer sx={{ p: 0 }}>
                  <Table>
                    <TableHead
                      sx={{
                        borderBottom: theme.isDarkMode
                          ? "1px solid white"
                          : "none",
                      }}
                    >
                      <TableRow>
                        <StyledTableCell>Title</StyledTableCell>
                        {sizeName !== "mobile" && (
                          <>
                            <StyledTableCell>Categories</StyledTableCell>
                            <StyledTableCell>Todos</StyledTableCell>
                          </>
                        )}
                        <StyledTableCell>Active</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.workspaces.map((item: any) => (
                        <StyledTableRow
                          darkMode={theme.isDarkMode}
                          key={item.id}
                        >
                          <StyledTableCell className="workspace-home-box-title">
                            {item.title}
                          </StyledTableCell>
                          {sizeName !== "mobile" && (
                            <>
                              <StyledTableCell className="workspace-home-box-title">
                                {item.categorySum}
                              </StyledTableCell>
                              <StyledTableCell className="workspace-home-box-title">
                                {item.todoSum}
                              </StyledTableCell>
                            </>
                          )}
                          <StyledTableCell>
                            <StyledSwitch
                              isOn={item.active}
                              name="active-sys-log"
                              id={item.id}
                              toggleSwitch={(checked, id) => {
                                console.log("....", checked, id);
                                handleActiveWorkspace(checked, id);
                              }}
                            />
                          </StyledTableCell>
                          <StyledTableCell sx={{ minWidth: 123 }}>
                            <Tooltip title="Edit Workspace Title">
                              <IconButton
                                onClick={() => {
                                  setWsSelectedId(item.id);
                                  setState("rename");
                                }}
                                style={{ width: 37 }}
                              >
                                <CiEdit
                                  style={{
                                    color: theme.text1,
                                    fontSize: "1.2rem",
                                  }}
                                />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Remove Workspace">
                              <IconButton
                                onClick={() => {
                                  setState("remove");
                                  setWsSelectedId(item.id);
                                  setWsSelectedTitle(item.title);
                                }}
                                style={{ width: 37 }}

                              >
                                <CiTrash
                                  style={{
                                    color: theme.text1,
                                    fontSize: "1.2rem",
                                  }}
                                />
                              </IconButton>
                            </Tooltip>
                            {item.active ? (
                              <Tooltip title="Open Workspace">
                                <IconButton
                                  onClick={() => {
                                    if (ActiveWorkspaceId) {
                                      handleOpenWorkspace();
                                    }
                                  }}
                                style={{ width: 37 }}

                                >
                                  <IoEnterOutline
                                    style={{
                                      color: theme.text1,
                                      fontSize: "1.2rem",
                                    }}
                                  />
                                </IconButton>
                              </Tooltip>
                            ) : (
                              <div style={{
                                display:"inline-block",
                                width:37,
                                height:18
                              }}></div>
                            )}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </>
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Text style={{ fontSize: "1.5em" }} className="flex-central">
            Note Boards Coming Soon Available 👻👻👻
          </Text>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Text style={{ fontSize: "1.5em" }} className="flex-central">
            Widget Dashboards Coming Soon Available 👻👻👻
          </Text>
        </TabPanel>

        <TabPanel value={value} index={3}>
          <Text style={{ fontSize: "1.5em" }} className="flex-central">
            Music Player Coming Soon Available 👻👻👻
          </Text>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Text style={{ fontSize: "1.5em" }} className="flex-central">
            Leitner Box Coming Soon Available 👻👻👻
          </Text>
        </TabPanel>
      </Box>
    </Box>
  );
};

export default WorkspacesTable;
