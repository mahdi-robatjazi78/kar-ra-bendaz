import { Badge } from "@mui/material";
import styled from "styled-components";

const StyledBadge = styled(Badge)`
  & .MuiBadge-badge {
    background: var(--header);
    color: white;
    font-size: 0.6rem;
    vertical-align: baseline !important;
    border: ${(props) => (props.bordered ? "1px solid white" : "none")};
  }
`;

export default StyledBadge;