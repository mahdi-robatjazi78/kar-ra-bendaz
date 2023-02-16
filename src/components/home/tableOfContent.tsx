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
import { FiSearch } from "react-icons/fi";
import { CgArrowsShrinkH } from "react-icons/cg";
import { IoCloseSharp, IoReloadOutline } from "react-icons/io5";
import { RiAddLine } from "react-icons/ri";
import Toast from "@/util/toast";
import { styled } from '@mui/material/styles';
import{ tableCellClasses } from '@mui/material/TableCell';






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
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

const AddOrSearchUi = (props) => {
  const { state, space, backToIcons , getWorkspaceAndBoardsData } = props;

  const [value, setValue] = useState("");
  const handlekeydown = (e)=>{
    if (e.keyCode == 13) {
      if(state === "add"){
        AddWorkspace()
      }
      else{
        SearchInWorkspace()
      }
    }
  }
  const handleChangeValue = (e) => {
    setValue(e.target.value);
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


  const AddWorkspace = async()=>{
    try{
      if(value){

        const response = await Axios.post("/ws/new" , {title : value})
        getWorkspaceAndBoardsData()
        Toast(response.data.msg)
        backToIcons()
      }
     }
     catch(error){
      console.log(error.response)
     } 
  }



  const SearchInWorkspace = async()=>{
    if(value){
      getWorkspaceAndBoardsData(true , value)
    }
  }






















  return (
    <Box>
      <TextField
        type="text"
        variant="standard"
        label={<>{getLabel()}</>}
        value={value}
        onChange={handleChangeValue}
        onKeyDown={handlekeydown}
        InputProps={{
          endAdornment: (
            <>
              <InputAdornment position="end">
                <Tooltip title={state === "add" ? "Add" : "Search"}>
                  
                    {state === "add" ? 
                    <IconButton
                    onClick={()=>{
                      if(space === "workspace"){
                        AddWorkspace()
                      }
                    }}
                    ><RiAddLine className="add-space-icon" /></IconButton> :
                     <IconButton
                      onClick={()=>{
                        if(space === "workspace"){
                          SearchInWorkspace()
                        }
                      }}
                     ><FiSearch className="add-space-icon" /> </IconButton>}
                  
                </Tooltip>
              </InputAdornment>

              <InputAdornment position="end">
                <Tooltip title={"Close"}>
                  <IconButton onClick={()=>{
                    if(state === "add"){
                      backToIcons()
                    }
                    else if(state === 'search'){
                      getWorkspaceAndBoardsData()
                      backToIcons()
                    }
                  }}>
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
  const [value, setValue] = React.useState(0);
  const [state, setState] = React.useState("icons");
  const backToIcons = () => setState("icons");

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  const theme = useContext(ThemeContext);
  const [workspacesList, setWorkspaceList] = useState([]);
  const [loading, setLoading] = useState(false);


  const getWorkspaceAndBoardsData = async (searchMode = false , searchText="") => {
    try {

      if(searchMode === false){
      setLoading(true);
      const resp = await Axios.get("/ws/get-all?searchText=");
      const list = resp.data.workspaces;
      setWorkspaceList(list);
      const selected = list.filter((item) => item.active);
      localStorage.setItem(
        "selectedWs",
        JSON.stringify({ title: selected[0].title, id: selected[0].id })
      );
      setLoading(false);
      }else{
        setLoading(true);

        const resp = await Axios.get(`/ws/get-all?searchText=${searchText}`);
        const list = resp.data.workspaces;
        setWorkspaceList(list);
        setLoading(false)
      }
    } catch (error) {
      setLoading(false);
    }
  };


  useEffect(() => {
    getWorkspaceAndBoardsData();
  }, []);

  const handleActiveWorkspace = async (checked, id) => {
    try {
      setLoading(true);
      const resp = await Axios.put("/ws/set-active", { id });
      const list = resp.data.list;
      setWorkspaceList(list);
      const selected = list.filter((item) => item.active);
      localStorage.setItem(
        "selectedWs",
        JSON.stringify({ title: selected[0].title, id: selected[0].id })
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };




console.log("theme >>> " ,theme.background)





    
const StyledTableCell = styled(TableCell)({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor:"red",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding:".4rem",
    color: theme.text1,
  },
});

const StyledTableRow = styled(TableRow)({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.isDarkMode ?`#011a69`:"rgb(215,215,215)",
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }
);


  return (
    <Box
      className="add-space-box"
      style={{ height: "26rem" }}
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
              <IconButton onClick={()=>getWorkspaceAndBoardsData()}>
              <IoReloadOutline className="add-space-icon" />
              </IconButton>
            </Tooltip>
          </Box>
        ) : state === "add" || state === "search" ? (
          <AddOrSearchUi
            state={state}
            space={value == 0 ? "workspace" : "board"}
            backToIcons={backToIcons}
            getWorkspaceAndBoardsData={getWorkspaceAndBoardsData}

          />
        ) : state === "pagination" ? (
          <></>
        ) : (
          <></>
        )}
      </Box>
      <Box className="add-space-item-box">
        <Tabs
          centered
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            "& .MuiButtonBase-root": {
              color: theme.text1,
              fontSize: ".8rem",
              marginTop:".5rem",
              marginBottom:".5rem",
            },

            "& .MuiButtonBase-root:hover": {
              color: theme.hoverSuccess,
              fontSize: ".8rem",
            },




            "& .Mui-selected": {
              color: theme.borders,
              borderRadius: "10px",
              border:`1px solid ${theme.borders}`,
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

        <TabPanel value={value} index={0} >



         
        {loading ? (
                <Box display="flex" justifyContent={"space-around"} >
                  {
                Array(16)
                  .fill("t")
                  .map((item) => (
                    <Skeleton variant="rectangular" width={20} height={20} />

                  ))
                      }

                    </Box>



              ) :(

              

          <TableContainer sx={{ maxHeight: 270 , padding:0 }}>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: theme.text2, fontWeight: "bold" }}>
                  Title
                </TableCell>
                <TableCell style={{ color: theme.text2, fontWeight: "bold" }}>
                  Categories
                </TableCell>
                <TableCell style={{ color: theme.text2, fontWeight: "bold" }}>
                  Todos
                </TableCell>
                <TableCell style={{ color: theme.text2, fontWeight: "bold" }}>
                  Active
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
          
                  {!workspacesList || !workspacesList.length ? (
                    <Typography variant="h4" component="h4" className="central">
                      no data
                    </Typography>
                  ) : (
                    <>
                      {workspacesList.map((item) => (
                        <StyledTableRow>
                          <StyledTableCell
                            // style={{ color: theme.text1, fontStyle: "italic" }}
                          >
                            {item.title}
                          </StyledTableCell>
                          <StyledTableCell
                            // style={{ color: theme.text1, fontStyle: "italic" }}
                          >
                            {item.categorySum}
                          </StyledTableCell>
                          <StyledTableCell
                            // style={{ color: theme.text1, fontStyle: "italic" }}
                          >
                            {item.todoSum}
                          </StyledTableCell>
                          <StyledTableCell
                            // style={{ color: theme.text1, fontStyle: "italic" }}
                          >
                            <Switch
                              style={{ padding: "12px" }}
                              checked={item.active}
                              name="active-sys-log"
                              color="primary"
                              onChange={(e) => {
                                handleActiveWorkspace(
                                  e.target.checked,
                                  item.id
                                );
                              }}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </>
                  )}
              
            </TableBody>
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
