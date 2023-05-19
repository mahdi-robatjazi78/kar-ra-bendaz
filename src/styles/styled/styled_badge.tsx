import { Badge } from "@mui/material";
import styled from "styled-components";

const StyledBadge = styled(Badge)`
  & .MuiBadge-badge {
    background: var(--header);
    color: white;
    font-size: ${(props: any) => (props.fontSize ? props.fontSize : " 0.6rem")};
    padding: ${(props: any) => (props.padding ? props.padding : "unset")};
    vertical-align: baseline !important;
    border: ${(props: any) => (props.bordered ? "1px solid white" : "none")};
  }
`;

export default StyledBadge;
