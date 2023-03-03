import React, { useState, useEffect, useContext } from "react";
import {
  Tab,
  Tabs,
  Box,
  Typography,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Switch,
  TextField,
  InputAdornment,
  Tooltip,
  TableContainer,
  Skeleton,
} from "@mui/material";
import { MdWorkspacesOutline } from "react-icons/md";
import ThemeContext from "@context/themeContext";
import { AppDataContext } from "@context/appDataContext";
import Axios from "@services/api";
import { IoIosAdd } from "react-icons/io";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import { CgArrowsShrinkH } from "react-icons/cg";
import { IoCloseSharp, IoReloadOutline } from "react-icons/io5";
import { RiAddLine } from "react-icons/ri";
import { CiEdit, CiTrash } from "react-icons/ci";
import Toast from "@/util/toast";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import StyledSwitchComponent from "../../styles/styled/CustomeSwitch";
import EmptyListAnimation from "@/util/emptyList/emptyListAnimation";

import {
  useWsListQuery,
  useStoreNewWsMutation,
  useActiveWsMutation,
  useRenameWsMutation,
} from "../../redux/api/workspaces";
import { SetActiveWs, UnActiveWs } from "@/redux/features/todoPageConfigSlice";
import { useDispatch } from "react-redux";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
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
    >
      {value === index && <Box>{children}</Box>}
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
      console.log("enter")
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
      <TextField
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

const TableOfContent = () => {
  const [value, setValue] = useState(0);
  const [state, setState] = useState("icons");
  const [wsSelectedId, setWsSelectedId] = useState("");
  const [inputText, setInputText] = useState("");
  const [resultText, setResultText] = useState("");
  const backToIcons = () => {
    setWsSelectedId("");
    setState("icons");
  };
  const { data = [], isLoading, isSuccess, refetch } = useWsListQuery(
    resultText
  );
  const [storeNewWs, respStoreNewWs] = useStoreNewWsMutation();
  const [activeWs, respActiveWs] = useActiveWsMutation();
  const [renameWs, respRenameWs] = useRenameWsMutation();
    const dispatch = useDispatch()
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
    activeWs({ id, active: checked }).unwrap()
    .then((res) => {})
    .catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    // AFTER STORE REQUEST
    if (respStoreNewWs.isSuccess) {
      Toast(respStoreNewWs?.data?.msg);
      backToIcons();
      setInputText("");
      refetch();
    }
  }, [respStoreNewWs.isSuccess]);

  useEffect(() => {
    // AFTER ACTIVE OR DIACTIVE REQUEST
    if (respActiveWs.isSuccess) {
      Toast(respActiveWs?.data?.msg);
      if(respActiveWs?.data?.activeWorkspace?.id){
        dispatch(SetActiveWs({
          id:respActiveWs?.data?.activeWorkspace?.id,
          title:respActiveWs?.data?.activeWorkspace?.title
        }))
        
      }else{
        dispatch(UnActiveWs())
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
      Toast(respRenameWs?.data?.msg);
      refetch();
    }
  }, [respRenameWs.isSuccess]);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  const theme = useContext(ThemeContext);

  const StyledTableCell = styled(TableCell)({
    [`&.${tableCellClasses.head}`]: {
      padding: ".4rem",
      color: theme.text2,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      padding: ".4rem .4rem .4rem .7rem",
      color: theme.text1,
    },
  });

  const StyledTableRow = styled(TableRow)({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.isDarkMode ? `#011a69` : "rgb(215,215,215)",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  });

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
            <Tooltip title="Paginate">
              <IconButton>
                <CgArrowsShrinkH className="add-space-icon" />
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
        <Tabs
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            "& .MuiButtonBase-root": {
              color: theme.text1,
              fontSize: ".8rem",
              marginTop: ".5rem",
              marginBottom: ".5rem",
            },

            "& .MuiButtonBase-root:hover": {
              color: theme.hoverSuccess,
              fontSize: ".8rem",
            },

            "& .Mui-selected": {
              color: theme.borders,
              borderRadius: "10px",
              border: `1px solid ${theme.borders}`,
              fontSize: ".8rem",
            },

            "& .MuiTabs-indicator": {
              display: "none",
            },
          }}
        >
          <Tab value={0} label="Todo Workspace" />
          <Tab value={1} label="Note Boadrds" />
        </Tabs>

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
                <TableHead>
                  <TableRow>
                    <StyledTableCell
                      style={{ color: theme.text2, fontWeight: "bold" }}
                    >
                      Title
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ color: theme.text2, fontWeight: "bold" }}
                    >
                      Categories
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ color: theme.text2, fontWeight: "bold" }}
                    >
                      Todos
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ color: theme.text2, fontWeight: "bold" }}
                    >
                      Active
                    </StyledTableCell>
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
                    {data.workspaces.map((item) => (
                      <StyledTableRow key={item.id}>
                        <StyledTableCell>{item.title}</StyledTableCell>
                        <StyledTableCell>{item.categorySum}</StyledTableCell>
                        <StyledTableCell>{item.todoSum}</StyledTableCell>
                        <StyledTableCell>
                          <StyledSwitchComponent
                            checked={item.active}
                            name="active-sys-log"
                            color="primary"
                            onChange={(e) => {
                              handleActiveWorkspace(e.target.checked, item.id);
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
          Item Two
        </TabPanel>
      </Box>
    </Box>
  );
};

export default TableOfContent;
