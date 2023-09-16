import React, { useState  , useEffect} from "react";
import {
  Box,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import {
  AddMouseSelectedItems,
  AddNewMouseSelectedItems,
  DrawerOpen,
  clearMouseSelectedItems,
} from "@/redux/features/todoPageConfigSlice";
import moment from "moment";
import { removeMouseSelectedItemWithId } from "@/redux/features/todoPageConfigSlice";
import { handleCheckPersianAndRemoveHtmlTags, removeHTMLTags, truncateText } from "@/util/funcs";
import Styled_Checkbox from "@/styles/styled/styled_checkbox";
import { StyledTableCell, StyledTableRow } from "@/styles/styled/styled_table";

const TableListTodo = (props) => {
  const todoPageLayout = useSelector(
    (state: RootState) => state.todoLayout.todoPageLayout
  );
  const {
    todos,
  } = props;

  const dispatch = useDispatch();
  const { mouse_selected_items: EntitySelection , layout: Layout } = useSelector(
    (state: RootState) => state.todoPageConfig
  );
  const [isDateFormat, setIsDateFormat] = useState(true);
  const toggleDateFormat = () => setIsDateFormat((prevState) => !prevState);

  const handleChangeTableHeaderCheckbox = (e) => {
    const checked = e.target.checked;
    if (!checked) {
      dispatch(clearMouseSelectedItems());
    } else {
      const todosObjectList = todos.map((item) => {
        return { boxTodoId: item?._id, innerTodoText: item?.body };
      });
      dispatch(
        AddMouseSelectedItems({
          count: todos?.length,
          entity: "todo",
          items: todosObjectList,
        })
      );
    }
  };
  const handleSelectTableTodoItem = (e, id: string, txt: string) => {
    const checked = e.target.checked;
    if (!checked) {
      dispatch(removeMouseSelectedItemWithId({ id }));
    } else {
      dispatch(
        AddNewMouseSelectedItems({
          entity: "todo",
          newItem: {
            boxTodoId: id,
            innerTodoText: txt,
          },
        })
      );
    }
  };

  const handleCheckItemIsSelected = (id: string) => {
    if (EntitySelection.entity !== "todo" || EntitySelection.count === 0) {
      return false;
    } else {
      const item = EntitySelection.items.find((item) => item.boxTodoId === id);
      if (item?.boxTodoId) {
        return true;
      } else {
        return false;
      }
    }
  };


  const [finalTodoList , setFinalTodoList] = useState([])

  useEffect(()=>{

    setFinalTodoList(todoPageLayout[1] ===  "all" ? todos : todos.filter(item=>item.flag === "isDone") )


  },[todoPageLayout])



  return (
    <Box>
      <TableContainer sx={{ width: "80%", m: "auto" }}>
        <Table
        style={{userSelect:'none'}}
          // sx={{ width: !open ? "90vw" : "84vw" " }}
          aria-label="a dense table"
        >
          <TableHead>
            <StyledTableCell padding="checkbox">
              <Styled_Checkbox
                color="primary"
                // indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={todos?.length === +EntitySelection?.count}
                onChange={handleChangeTableHeaderCheckbox}
                inputProps={{
                  "aria-label": "select all todos",
                }}
              />
            </StyledTableCell>

            <StyledTableCell
              sx={{
                color: "var(--text1)",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              Title
            </StyledTableCell>
            <StyledTableCell
              onClick={toggleDateFormat}
              sx={{
                color: "var(--text1)",
                fontSize: "1rem",
                fontWeight: "bold",
                maxWidth: 70,
              }}
            >
              Created At
            </StyledTableCell>
            <StyledTableCell
              sx={{
                color: "var(--text1)",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              Status
            </StyledTableCell>
            <StyledTableCell
              sx={{
                color: "var(--text1)",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              Priority
            </StyledTableCell>
            <StyledTableCell
              sx={{
                color: "var(--text1)",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
              align="left"
            >
              Action
            </StyledTableCell>
          </TableHead>
          <TableBody>
            {finalTodoList.map((row, idx: number) => (
              <StyledTableRow
                key={idx}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <StyledTableCell padding="checkbox">
                  <Styled_Checkbox
                    color="primary"
                    onChange={(e) =>
                      handleSelectTableTodoItem(e, row?._id, row?.body)
                    }
                    checked={handleCheckItemIsSelected(row?._id)}
                    inputProps={{
                      "aria-labelledby": row._id,
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell
                  
                  size="small"
                  sx={{ 
                    color: "var(--text1)", 
                    width: 200,
                    maxWidth: 200,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    borderStyle: "border-box"
                  }}
                >
                  <span className={`${handleCheckPersianAndRemoveHtmlTags(row.body) ? "text-fa-only" : "text-fa"}`}>{truncateText(removeHTMLTags(row.body), 120)}</span>
                </StyledTableCell>
                <StyledTableCell
                  width="130"
                  sx={{
                    color: "var(--text1)",
                    cursor: "pointer",
                  }}
                  onClick={toggleDateFormat}
                >
                  {moment(row.date).format(
                    isDateFormat ? "YYYY-MM-DD" : "HH:MM:DD"
                  )}
                </StyledTableCell>
                <StyledTableCell width="130" sx={{ color: "var(--text1)" }}>
                  {row.flag === "isDone" ? "Is Done" : "Created"}
                </StyledTableCell>
                <StyledTableCell width="130" sx={{ color: "var(--text1)" }}>
                  {row?.priority === 0
                    ? "Low"
                    : row?.priority === 1
                    ? "Medium"
                    : "High"}
                </StyledTableCell>

                <StyledTableCell width="130">
                  <Box className="d-flex">
                    <IconButton
                      onClick={() => {
                        dispatch(DrawerOpen({ state: "todo", item: row }));
                      }}
                    >
                      <FaEdit color="var(--text1)" />
                    </IconButton>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableListTodo;
