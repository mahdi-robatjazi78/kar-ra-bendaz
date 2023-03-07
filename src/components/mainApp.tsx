import React, { useContext, useState, useEffect } from "react";
import ThemeContext from "@context/themeContext";
import { SidebarContext } from "@context/sidebarContext";
import { AppDataContext } from "@context/appDataContext";
import Header from "./header";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Todos from "./Todos";
import RouteBox from "./routeBox";
import { Box, Grid } from "@mui/material";
import { SetMeData, SetUserToken } from "@/redux/features/userSlice";
import { SetActiveWs } from "@/redux/features/todoPageConfigSlice";
import { RootState } from "@/redux/store";

const Main = () => {
  const theme = useContext(ThemeContext);
  const [ShowBurger, setShowBurger] = React.useState<boolean>(true);
  const { open } = useContext(SidebarContext);
  const { headerPosition } = useContext(AppDataContext);
  const auth = useSelector((state : RootState)=>state.auth)
  const dispatch = useDispatch();
  
  const checkProfileDataEssentials = () =>{
    if(!auth.token){
      const authLocalStorage = JSON.parse(localStorage.getItem("auth"))
      
      const token = authLocalStorage?.token
      if(token){

        const {email ,fname,lname ,gender , userName} = authLocalStorage.me
        dispatch(SetUserToken({
          token
        }))
        dispatch(SetMeData({
          email ,fname,lname ,gender , userName,
        }))
        
      }
      
    }
  }

  checkProfileDataEssentials()




  return (
    <main id="main">
      <Box
        id="App"
        flexDirection={
          headerPosition === "top"
            ? "column"
            : headerPosition === "bottom"
            ? "column-reverse"
            : headerPosition === "left"
            ? "row"
            : headerPosition === "right"
            ? "row-reverse"
            : "row"
        }
      >
        <Header ShowBurger={ShowBurger} setShowBurger={setShowBurger} />
        <RouteBox setShowBurger={setShowBurger} />
      </Box>
    </main>
  );
};

export default Main;
