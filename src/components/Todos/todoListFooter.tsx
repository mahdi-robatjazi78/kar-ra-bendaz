import React, { useContext} from "react";
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
  Stack,
  Tooltip,
} from "@mui/material";
import { FiArrowLeft, FiArrowRight, FiSearch } from "react-icons/fi";
import StyledPaginationItem from "@/styles/styled/styled_pagination"
import StyledSelectWhiteComponent from "@/styles/styled/styled_Selectbox";


const TodoPageFooter = (props) => {
  const { setShowModalAddTodo ,meta , handleChangeMeta ,ActiveCategoryID} = props;

  const StyledInputLabelWhite = styled(InputLabel)`
    color: var(--text1) !important;
    filter: brightness(0.7);
  `;

  const theme = useContext(ThemeContext);


  return (
    <Box className="todo-list-footer">


      {
        ActiveCategoryID ? <Box></Box>:(
          <Box width={120} style={{ margin: ".6rem 2.2rem 0rem 2rem" }}>
          <FormControl fullWidth size="small">
            <StyledInputLabelWhite id="per-page-select-label">
              Per Page
            </StyledInputLabelWhite>
            <StyledSelectWhiteComponent
              labelId="per-page-select-label"
              value={meta?.limit || 5}
              onChange={(e) =>handleChangeMeta(1 , Number(e.target.value))}
              label={"Per Page"}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </StyledSelectWhiteComponent>
          </FormControl>
        </Box>
        )
      }
      {
        ActiveCategoryID ?<Box></Box>:(
          <Box sx={{marginTop:"5px"}}>
          <Stack spacing={2}>
            <Pagination
              style={{ margin: ".8rem 2.2rem 0.3rem 0.5rem" }}
              count={meta.total_pages}
              page={meta?.page || 1}
              onChange={(e , value)=>{
                handleChangeMeta(+value , Number(meta?.limit))}
              }
              renderItem={(item) => (
                <StyledPaginationItem
                  slots={{ previous: FiArrowLeft, next: FiArrowRight }}
                  {...item}
                />
              )}
            />
          </Stack>
        </Box>
        )
      }

    
      <Box display="flex" mr={2}>
        <Box className="add-new-todo-icon">
          <Tooltip arrow title="Search">
            <Box className="icon-box" onClick={() => {}}>
              <IconButton>
                <FiSearch
                  fontSize=".8rem"
                  color={theme.isDarkMode ? "black" : "white"}
                />
              </IconButton>
            </Box>
          </Tooltip>
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
    </Box>
  );
};

export default TodoPageFooter;
