import React, { useContext } from "react";
import {
  Box,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import themes from "../../theme";
import ThemeContext from "../../context/themeContext";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin3Fill } from "react-icons/ri";
import { MdOutlineDownloadDone } from "react-icons/md";
import { SidebarContext } from "../../context/sidebarContext";

const TableListTodo = (props) => {
  const { open } = useContext(SidebarContext);
  const {
    todos,
    getAllTodos,
    setSelectedEditTask,
    deleteTodo,
    editTodo,
    setTodoDone,
  } = props;

  const theme = useContext(ThemeContext);
  const iconStyle = {
    padding: "0 .7rem",
  };
  return (
    <Box>
      <TableContainer>
        <Table
          sx={{ width: open === "hide" ? "90vw" : "84vw" }}
          aria-label="a dense table"
        >
          <TableHead>
              <TableCell sx={{ color: theme.text1 }}>Title</TableCell>
              <TableCell sx={{ color: theme.text1 }} align="left">Actions</TableCell>
          </TableHead>
          <TableBody>
            {todos.map((row , idx) => (
              <TableRow
                key={idx}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  ...(row.flag === "isDone" && { background: "#E6FFE9"   }),
                }}
                // style={row.flag === "isDone" && {background:"gray"}}
              >
                <TableCell
                  sx={{ color:  row.flag === "isDone" ? "black" : theme.text1, }}
    
                 
                >
                  {row.body}
                </TableCell>

                <TableCell
                  sx={{ color:  row.flag === "isDone" ? "black" : theme.text1, }}
                >
                  <FaEdit style={iconStyle} onClick={() => editTodo(row)} />
                  <RiDeleteBin3Fill
                    style={iconStyle}
                    onClick={() => deleteTodo(row)}
                  />
                  <MdOutlineDownloadDone
                    style={iconStyle}
                    onClick={() => setTodoDone(row)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableListTodo;
