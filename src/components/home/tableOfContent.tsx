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
} from "@mui/material";
import { MdWorkspacesOutline } from "react-icons/md";
import ThemeContext from "@context/themeContext";
import {AppDataContext} from "@context/appDataContext";
import Axios from "@services/api";

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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const TableOfContent = () => {
  const [value, setValue] = React.useState(0);


  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  const theme = useContext(ThemeContext);
  const [workspacesList, setWorkspaceList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getWorkspaceAndBoardsData = async () => {
      try {
        setLoading(true)
        const resp = await Axios.get("/ws/get-all");
        const list = resp.data.workspaces
        setWorkspaceList(list);
        const selected = list.filter(item => item.active)
        localStorage.setItem("selectedWs" ,JSON.stringify({title : selected[0].title ,id:selected[0].id}))
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    };

    getWorkspaceAndBoardsData();
  }, []);


  const handleActiveWorkspace =async(checked ,id)=>{
    try{
      setLoading(true)
      const resp = await Axios.put("/ws/set-active",{id})
      const list = resp.data.list
      setWorkspaceList(list)
      const selected = list.filter(item => item.active)
      localStorage.setItem("selectedWs" ,JSON.stringify({title : selected[0].title ,id:selected[0].id}))
      setLoading(false)
    }catch(error){
      setLoading(false)
    }

  }

  return (
    <Box
      className="add-space-box"
      style={{ height: "26rem", overflowY: "auto" }}
    >
      <Box className="add-space-icon-box d-flex-between">
        <IconButton>
          <MdWorkspacesOutline className="add-space-icon" />
        </IconButton>
      </Box>
      <Box className="add-space-item-box">
        <Tabs
          centered
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            "& .MuiButtonBase-root": {
              color: theme.text1,
              fontSize: ".8rem",
            },

            "& .Mui-selected": {
              backgroundColor: theme.text3,
              color: "black",
              borderRadius: "10px",
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
              {
                loading ?(
                  <Typography variant="h4" component="h4">loading</Typography>
                ):
                
                  (
                    <>
                    {
                      !workspacesList || !workspacesList.length ?(
                        <Typography variant="h4" component="h4" className="central">no data</Typography>
                      ):
                      (
                        <>
                          {
                            workspacesList.map((item) => (
                              <TableRow>
                              <TableCell
                              style={{ color: theme.text1, fontStyle: "italic" }}
                              >
                                {item.title}
                              </TableCell>
                              <TableCell
                              style={{ color: theme.text1, fontStyle: "italic" }}
                              >
                                {item.categorySum}
                              </TableCell>
                              <TableCell
                              style={{ color: theme.text1, fontStyle: "italic" }}
                              >
                                {item.todoSum}
                              </TableCell>
                              <TableCell
                              style={{ color: theme.text1, fontStyle: "italic" }}
                              >
                      
                              <Switch
                                style={{ padding: "12px" }}
                                checked={item.active}
                                name="active-sys-log"
                                color="primary"
                                onChange={(e) => {
                                  handleActiveWorkspace(e.target.checked , item.id)
                                }}
                              />
                              </TableCell>
                            </TableRow>
                            ))
                          }
                        </>
                      )
                    }
                    </>
                  )

                }
                
               
            </TableBody>
          </Table>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      </Box>
    </Box>
  );
};

export default TableOfContent;
