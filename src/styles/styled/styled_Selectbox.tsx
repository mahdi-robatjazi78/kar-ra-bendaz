import styled from "styled-components";
import {Select} from "@mui/material";

const StyledSelectWhite = styled(Select)`
  & .MuiSelect-select{
    color:var(--text1);

    
  }
 
  & fieldset {
    border-color: var(--text1) !important;
  }
  & svg {
    color: var(--borders);
  }

`;

export default StyledSelectWhite