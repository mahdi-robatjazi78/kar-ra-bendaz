import React from "react";
import { Box, Grid } from "@mui/material";
import WorkspacesTable from "./WorkSpacesBox";

const HomePage = () => {
  return (
    <Box id="home-page">
      <Grid container>
        <Grid item xs={12} md={6}>
          <WorkspacesTable />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
