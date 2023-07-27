import React, { useState } from "react";
import {
  Box,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { DrawerOpen } from "@/redux/features/todoPageConfigSlice";
import moment from "moment";

const TableListTodo = (props) => {
  const { sidebar_open: open } = useSelector(
    (state: RootState) => state.todoPageConfig
  );
  const {
    todos,
    getAllTodos,
    setSelectedEditTask,
    deleteTodo,
    editTodo,
    setTodoDone,
  } = props;

  const dispatch = useDispatch();

  const [isDateFormat, setIsDateFormat] = useState(true);
  const toggleDateFormat = () => setIsDateFormat((prevState) => !prevState);

  return (
    <Box>
      <TableContainer>
        <Table
          sx={{ width: !open ? "90vw" : "84vw" }}
          aria-label="a dense table"
        >
          <TableHead>
            {" "}
            <TableCell
              sx={{
                color: "var(--text1)",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              Title
            </TableCell>
            <TableCell
              onClick={toggleDateFormat}
              sx={{
                color: "var(--text1)",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              Created At
            </TableCell>
            <TableCell
              sx={{
                color: "var(--text1)",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              Status
            </TableCell>
            <TableCell
              sx={{
                color: "var(--text1)",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              Priority
            </TableCell>
            <TableCell
              sx={{
                color: "var(--text1)",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
              align="left"
            >
              Action
            </TableCell>
          </TableHead>
          <TableBody>
            {todos.map((row, idx) => (
              <TableRow
                key={idx}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell sx={{ color: "var(--text1)", maxWidth: 300 }}>
                  {row.body}
                </TableCell>
                <TableCell
                  sx={{ color: "var(--text1)", cursor: "pointer" }}
                  onClick={toggleDateFormat}
                >
                  {moment(row.date).format(
                    isDateFormat ? "YYYY-MM-DD" : "HH:MM:DD"
                  )}
                </TableCell>
                <TableCell sx={{ color: "var(--text1)" }}>
                  {row.flag === "isDone" ? "Is Done" : "Created"}
                </TableCell>
                <TableCell sx={{ color: "var(--text1)" }}>
                  {row?.priority === 0
                    ? "Low"
                    : row?.priority === 1
                    ? "Medium"
                    : "High"}
                </TableCell>

                <TableCell>
                  <Box className="d-flex">
                    <IconButton
                      onClick={() => {
                        dispatch(DrawerOpen({ state: "todo", item: row }));
                      }}
                    >
                      <FaEdit color="var(--text1)" />
                    </IconButton>
                  </Box>
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
