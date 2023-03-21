import React, { useContext, useState, useEffect, useRef } from "react";
import ThemeContext from "@context/themeContext";
import { HiPlus } from "react-icons/hi";
import styled from "styled-components";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  Stack,
  Tooltip,
} from "@mui/material";

const TodoPageFooter = (props) => {
  const StyledPaginationItem = styled(PaginationItem)`
    color: var(--text1) !important;
    &.css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected {
      background-color: var(--text1) !important;
      color: black !important;
      border-radius: 25% !important;
    }
  `;

  const StyledFormControl = styled(FormControl)`
    &.css-1d3z3hw-MuiOutlinedInput-notchedOutline {
      border-color:var(--borders) !important; 
    }
  `;


  const { setShowModalAddTodo } = props;
  const theme = useContext(ThemeContext);
  const [perPage , setPerPage] = useState(10)

  return (
    <Box className="todo-list-footer">
      <Box width={120} 
        style={{ margin: ".2rem 2.2rem 0.3rem 0.5rem" }}

      
      >
        <StyledFormControl fullWidth size="small">
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={perPage}
            label="Age"
            onChange={(e)=>setPerPage(Number(e.target.value))}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={75}>75</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </StyledFormControl>
      </Box>

      <Box>
        <Stack spacing={2}>
          <Pagination
            style={{ margin: ".8rem 2.2rem 0.3rem 0.5rem" }}
            count={22}
            renderItem={(item) => <StyledPaginationItem {...item} />}
          />
        </Stack>
      </Box>

      <Box className="add-new-todo-icon">
        <Tooltip arrow title="Add New Task">
          <Box className="icon-box" onClick={() => setShowModalAddTodo(true)}>
            <IconButton>
              <HiPlus
                fontSize=".8rem"
                color={theme.isDarkMode ? "black" : "white"}
              />
            </IconButton>
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default TodoPageFooter;
