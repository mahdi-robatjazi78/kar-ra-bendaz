import React ,{useContext} from "react";
import { Box, Grid } from "@mui/material";
import CreateSpace from "./createSpace";
import { AppDataContext } from "@/context/appDataContext";
import SettingsBox from "./settingsBox";
import TableOfContent from './tableOfContent'

const HomePage = () => {

  return (
    <Box id="home-page">
      <Grid container >
          <Grid item xs={12} md={4}>
            <CreateSpace />
          </Grid>
          <Grid item xs={12} md={4}>
            <SettingsBox />
          </Grid>
          <Grid item xs={12} md={8}>
            <TableOfContent />
          </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage 