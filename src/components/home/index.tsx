import React ,{useContext} from "react";
import { Box, Grid , Container } from "@mui/material";
import SettingsBox from "./settingsBox";
import TableOfContent from './tableOfContent'

const HomePage = () => {

  return (
    <Box id="home-page">
      <Grid container >

          <Grid item xs={12} md={6}>
            <TableOfContent />
          </Grid>
          <Grid item xs={12} md={6}>
            <SettingsBox />
          </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage 