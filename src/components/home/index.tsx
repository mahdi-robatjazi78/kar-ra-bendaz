import React , {useEffect} from "react";
import { Box, Grid } from "@mui/material";
import WorkspacesTable from "./WorkSpacesBox";
import AppTextPreviewAnimation from "../fun/appTextPreviewAnimation";
import { useSelector , useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { changeHeaderPosition } from "@/redux/features/settingSlice";

const HomePage = () => {
  const { headerPosition } = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch()
  useEffect(()=>{
    if(headerPosition === "bottom"){
      dispatch(changeHeaderPosition("top"));
    }
  },[])



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
