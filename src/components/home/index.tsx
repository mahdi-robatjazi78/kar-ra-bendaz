import React from "react";
import { Box, Grid } from "@mui/material";
import SettingsBox from "./settingsBox";
import WorkspacesTable from "./WorkSpacesBox";

const HomePage = () => {
  return (
    <Box id="home-page">
      <Grid container>
        <Grid item xs={12} md={6}>
          <WorkspacesTable />
        </Grid>
        <Grid item xs={12} md={6}>
          <SettingsBox />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
