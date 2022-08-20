import React, { useContext, useState, useEffect } from "react";
import ThemeContext from "../context/themeContext";
import { SidebarContext } from "../context/sidebarContext";
import Header from "./header";

import Sidebar from "./sidebar/sidebar";
import { BrowserRouter } from "react-router-dom";
import Todos from "./Todos";
import Home from "./home"
import { Box, Grid } from "@mui/material";

const Main = () => {


  const theme = useContext(ThemeContext);
  console.log(">>theme", theme);
  const [ShowBurger ,setShowBurger] = React.useState<boolean>(true)
  
  const { open } = useContext(SidebarContext);

  return (
    <main
      style={{
        transition: "all 1s ease",
        backgroundColor: theme.background,
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* <BrowserRouter> */}
        <div className="App">
          <Header ShowBurger={ShowBurger} setShowBurger={setShowBurger}  />
        </div>
        <Box display="flex">
          <Grid container>
            {open === "show" && (
              <Grid item xs={4} md={2}>
                <Sidebar />
              </Grid>
            )}
            <Grid item xs={open==="hide" ? 12 : 8} md={open==="hide" ? 12 :10}>
              <Home setShowBurger={setShowBurger} />
            </Grid>
          </Grid>
        </Box>
      {/* </BrowserRouter>   */}
      {/* <h1 style={{color:theme.foreground , margin:0}}>hay this is main</h1> */}
    </main>
  );
};

export default Main;
