import React, { useState, useEffect, useContext } from "react";
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
import { IoCloseSharp, IoReloadOutline } from "react-icons/io5";
import { RiAddLine } from "react-icons/ri";
import { CiEdit, CiTrash } from "react-icons/ci";
import Toast from "@/util/toast";
import SwitchCustomized from "../../styles/styled/CustomeSwitch";
import EmptyListAnimation from "@/util/emptyList/emptyListAnimation";
import {
  useWsListQuery,
  useStoreNewWsMutation,
  useActiveWsMutation,
  useRenameWsMutation,
} from "../../redux/api/workspaces";
import { SetActiveWs, UnActiveWs } from "@/redux/features/todoPageConfigSlice";
import { useDispatch } from "react-redux";
import { StyledTableCell, StyledTableRow } from "@/styles/styled/styled_table";
import StyledTabs from "@/styles/styled/styled_tabs";
import Styled_Standard_Textfield from "@/styles/styled/styled_standard_textfield";
import Text from "@/styles/styled/styled_typography";

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
      style={{ height: "80%" }}
    >
      {value === index && <Box style={{ height: "80%" }}>{children}</Box>}
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
      console.log("enter");
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

  const getLabel = () => {
    if (state === "add" && space === "workspace") {
      return "Add new workspace";
    } else if (state === "add" && space === "board") {
      return "Add new board";
    } else if (state === "search" && space === "workspace") {
      return "Search in workspaces";
    } else if (state === "search" && space === "board") {
      return "Search in boards";
    } else {
      return "";
    }
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
        label={<>{getLabel()}</>}
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
                    <IconButton
                      onClick={(e) => {
                        console.log("click");
                        if (space === "workspace") {
                          AddWorkspace();
                        }
                      }}
                    >
                      <RiAddLine className="add-space-icon" />
                    </IconButton>
                  ) : state === "rename" ? (
                    <IconButton
                      onClick={() => {
                        if (space === "workspace") {
                          editWorkspaceTitle();
                        }
                      }}
                    >
                      <CiEdit className="add-space-icon" />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => {
                        if (space === "workspace") {
                          SearchInWorkspace();
                        }
                      }}
                    >
                      <FiSearch className="add-space-icon" />{" "}
                    </IconButton>
                  )}
                </Tooltip>
              </InputAdornment>

              <InputAdornment position="end">
                <Tooltip title={"Close"}>
                  <IconButton
                    onClick={() => {
                      backToIcons();
                    }}
                  >
                    <IoCloseSharp className="add-space-icon" />
                  </IconButton>
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
  const [inputText, setInputText] = useState("");
  const [resultText, setResultText] = useState("");
  const backToIcons = () => {
    setWsSelectedId("");
    setState("icons");
  };
  const {
    data = [],
    isLoading,
    isSuccess,
    refetch,
  } = useWsListQuery(resultText);
  const [storeNewWs, respStoreNewWs] = useStoreNewWsMutation();
  const [activeWs, respActiveWs] = useActiveWsMutation();
  const [renameWs, respRenameWs] = useRenameWsMutation();
  const dispatch = useDispatch();
  const AddWorkspace = () => {
    if (inputText) {
      storeNewWs({ title: inputText })
        .unwrap()
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
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
      backToIcons();
      setInputText("");
      refetch();
    }
  }, [respStoreNewWs.isSuccess]);

  useEffect(() => {
    // AFTER ACTIVE OR DIACTIVE REQUEST
    if (respActiveWs.isSuccess) {
      Toast(respActiveWs?.data?.msg, true, true);
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
      Toast(respRenameWs?.data?.msg, true, true);
      refetch();
    }
  }, [respRenameWs.isSuccess]);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  const theme = useContext(ThemeContext);

  return (
    <Box
      className="add-space-box"
      style={{ height: "26rem", position: "relative" }}
    >
      <Box className="add-space-icon-box d-flex-between">
        <IconButton>
          <MdWorkspacesOutline className="add-space-icon" />
        </IconButton>
        {state === "icons" ? (
          <Box>
            <Tooltip title={value == 0 ? "Add new workspace" : "Add new board"}>
              <IconButton onClick={() => setState("add")}>
                <RiAddLine className="add-space-icon" />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={value == 0 ? "Search in workspaces" : "Search in boards"}
            >
              <IconButton onClick={() => setState("search")}>
                <FiSearch className="add-space-icon" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Reload">
              <IconButton
                onClick={() => {
                  refetch();
                }}
              >
                <IoReloadOutline className="add-space-icon" />
              </IconButton>
            </Tooltip>
          </Box>
        ) : state === "add" || state === "search" || state === "rename" ? (
          <AddOrSearchUi
            state={state}
            space={value == 0 ? "workspace" : "board"}
            backToIcons={backToIcons}
            refetch={refetch}
            text={inputText}
            setText={setInputText}
            setResultText={setResultText}
            storeNewWs={storeNewWs}
            AddWorkspace={AddWorkspace}
            editWorkspaceTitle={editWorkspaceTitle}
          />
        ) : state === "pagination" ? (
          <></>
        ) : (
          <></>
        )}
      </Box>
      <Box className="add-space-item-box">
        <StyledTabs
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="note board and todo workspace tabs"
          scrollButtons="auto"
        >
          <Tab value={0} label="Todo Workspace" />
          <Tab value={1} label="Note Boards" />
          <Tab value={2} label="Widget Dashboards" />
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
            <TableContainer sx={{ maxHeight: 270, padding: 0 }}>
              <Table>
                <TableHead
                  sx={{
                    borderBottom: theme.isDarkMode ? "1px solid white" : "none",
                  }}
                >
                  <TableRow>
                    <StyledTableCell>Title</StyledTableCell>
                    <StyledTableCell>Categories</StyledTableCell>
                    <StyledTableCell>Todos</StyledTableCell>
                    <StyledTableCell>Active</StyledTableCell>
                  </TableRow>
                </TableHead>
                {!isSuccess || !data?.workspaces?.length ? (
                  <Box
                    style={{
                      width: "100%",
                      height: 120,
                      position: "absolute",
                      bottom: 50,
                    }}
                  >
                    <EmptyListAnimation text="Empty List 📝" fontSize="2rem" />
                  </Box>
                ) : (
                  <TableBody>
                    {data.workspaces.map((item: any) => (
                      <StyledTableRow darkMode={theme.isDarkMode} key={item.id}>
                        <StyledTableCell>{item.title}</StyledTableCell>
                        <StyledTableCell>{item.categorySum}</StyledTableCell>
                        <StyledTableCell>{item.todoSum}</StyledTableCell>
                        <StyledTableCell>
                          <SwitchCustomized
                            isOn={item.active}
                            name="active-sys-log"
                            id={item.id}
                            toggleSwitch={(checked, id) => {
                              console.log("....", checked, id);
                              handleActiveWorkspace(checked, id);
                            }}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <Tooltip title="Edit Workspace Title">
                            <IconButton
                              onClick={() => {
                                setWsSelectedId(item.id);
                                setState("rename");
                              }}
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
                                setWsSelectedId(item.id);
                              }}
                            >
                              <CiTrash
                                style={{
                                  color: theme.text1,
                                  fontSize: "1.2rem",
                                }}
                              />
                            </IconButton>
                          </Tooltip>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
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
      </Box>
    </Box>
  );
};

export default WorkspacesTable;