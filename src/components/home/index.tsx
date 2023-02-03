import React ,{useContext} from "react";
import { Box } from "@mui/material";
import CreateSpace from "./createSpacec";
import { AppDataContext } from "@/context/appDataContext";
import SettingsBox from "./settingsBox";
const HomePage = () => {



  return (
    <Box id="home-page">

      <CreateSpace />
      <SettingsBox />
      
    </Box>
  );
};

export default HomePage 