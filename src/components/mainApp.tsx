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
import { setMeData, setUserToken } from "@/redux/features/userSlice";

const Main = () => {
  const theme = useContext(ThemeContext);
  const [ShowBurger, setShowBurger] = React.useState<boolean>(true);
  const { open } = useContext(SidebarContext);
  const { blurPage, headerPosition } = useContext(AppDataContext);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const checkProfileEssentials = () => {
    const localStorageUserData = JSON.parse(localStorage.getItem("user"));

    if (!localStorageUserData?.token && auth?.token) {
      // fill localstorage from redux
      const data = {
        email: auth?.me?.email,
        fname: auth?.me?.fname,
        lname: auth?.me?.lname,
        gender: auth?.me?.gender,
        userName: auth?.me?.userName,
        token: auth?.token,
      };

      localStorage.setItem("user", JSON.stringify(data));
    }

    if (!auth?.token) {
      // fill redux from localstorage
      if (localStorageUserData?.token) {
        dispatch(
          setUserToken({
            token: localStorageUserData?.token,
          })
        );
      }
     
    }
    if (!auth?.me?.email && localStorageUserData?.email) {
      const { email, fname, lname, gender, userName } = localStorageUserData;
      dispatch(
        setMeData({
          email,
          fname,
          lname,
          gender,
          userName,
        })
      );
    }
  };
  checkProfileEssentials();

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
        style={blurPage ? { filter: "blur(10px)" } : {}}
      >
        <Header ShowBurger={ShowBurger} setShowBurger={setShowBurger} />
        <RouteBox setShowBurger={setShowBurger} />
      </Box>
    </main>
  );
};

export default Main;
