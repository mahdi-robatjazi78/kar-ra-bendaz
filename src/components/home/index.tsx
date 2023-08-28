import React from "react";
import { Box, Grid } from "@mui/material";
import WorkspacesTable from "./WorkSpacesBox";
import AppTextPreviewAnimation from "../fun/appTextPreviewAnimation";

const HomePage = () => {
  return (
    <Box style={{overflowY:"scroll"}}>
    <Grid container style={{height:"100vh"}}>
      <Grid item xs={12}>
      <Box id="home-page"> 
        <WorkspacesTable /> 
      </Box>
      </Grid> 
      <Grid item xs={12}>
      
      <Box position="relative" style={{ height: "100vh"}}>
        <AppTextPreviewAnimation />
      </Box>
      </Grid>
    </Grid>
    </Box>
  );
};

export default HomePage;
