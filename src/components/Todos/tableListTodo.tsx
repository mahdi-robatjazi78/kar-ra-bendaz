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
import ThemeContext from "../../context/colorModeContext";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin3Fill } from "react-icons/ri";
import { MdOutlineDownloadDone } from "react-icons/md";
import { SidebarContext } from "../../context/sidebarContext";

const TableListTodo = (props) => {
  const { open } = useContext(SidebarContext);
  const { todo, getAllTodos, setSelectedEditTask } = props;

  const theme = useContext(ThemeContext);

  return (
    <Box>
      <TableContainer>
        <Table
          sx={{ width: open === "hide" ? "100vw" : "84vw" }}
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: theme.text1 }}>Title</TableCell>
              <TableCell sx={{ color: theme.text1 }} align="left">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todo.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  sx={{ color: theme.text1 }}
                  component="th"
                  scope="row"
                >
                  {row.body}
                </TableCell>

                <TableCell
                  sx={{ color: theme.text1 }}
                  component="th"
                  scope="row"
                >
                  <FaEdit />
                  <RiDeleteBin3Fill />
                  <MdOutlineDownloadDone />
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
