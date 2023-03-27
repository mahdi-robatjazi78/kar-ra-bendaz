import styled from "styled-components";
import { PaginationItem } from "@mui/material";

const StyledPaginationItem = styled(PaginationItem)`
  color: var(--text1) !important;
  &.Mui-selected {
    background-color: var(--text1) !important;
    color: var(--sidebar) !important;
    border-radius: 25% !important;
  }
`;

export default StyledPaginationItem;
