import React from "react";
import StyledPaginationItem from "@/styles/styled/styled_pagination";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Stack,
} from "@mui/material";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import StyledSelectWhiteComponent from "@/styles/styled/styled_Selectbox";
import styled from "@emotion/styled";
import useWindowSize from "@hooks/useWindowSize";


const StyledInputLabelWhite = styled(InputLabel)`
  color: var(--text1) !important;
  filter: brightness(0.7);
`;



const PaginationComponent = (props: any) => {
  const { meta, handleChangeMeta } = props;
  return (
    <Box sx={{ marginTop: "5px" }}>
      <Stack spacing={2}>
        <Pagination
          style={{ margin: ".8rem 2.2rem 0.3rem 0.5rem" }}
          count={meta?.total_pages || 1}
          page={meta?.page || 1}
          onChange={(e, value) => {
            handleChangeMeta(+value, Number(meta?.limit));
          }}
          renderItem={(item) => (
            <StyledPaginationItem
              slots={{ previous: FiArrowLeft, next: FiArrowRight }}
              {...item}
            />
          )}
        />
      </Stack>
    </Box>
  );
};

const PerPageComponent = (props) => {
  const { meta, handleChangeMeta ,fullWidth=false } = props;
  const [width , height] = useWindowSize().size

  return (
    <Box width={fullWidth ? "100%" : 120} style={width > 600 ?{ margin: ".6rem 2.2rem 0rem 2rem" } :{}}>
      <FormControl fullWidth size="small">
        <StyledInputLabelWhite id="per-page-select-label">
          Per Page
        </StyledInputLabelWhite>
        <StyledSelectWhiteComponent
          labelId="per-page-select-label"
          value={meta?.limit || 5}
          onChange={(e) => handleChangeMeta(1, Number(e.target.value))}
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
  );
};

export { PerPageComponent, PaginationComponent };
