import { Badge } from "@mui/material";
import styled from "styled-components";


const StyledBadge = styled(Badge)`
	
	& .MuiBadge-badge {
		background: var(--header);
		color:white;
		font-size:.6rem;
	}
`



export default StyledBadge