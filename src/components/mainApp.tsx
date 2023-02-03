import React, { useContext, useState, useEffect } from "react";
import ThemeContext from "@context/themeContext";
import { SidebarContext } from "@context/sidebarContext";
import { AppDataContext } from "@context/appDataContext";
import Header from "./header";
import Sidebar from "./sidebar";
import { BrowserRouter } from "react-router-dom";
import Todos from "./Todos";
import RouteBox from "./routeBox";
import { Box, Grid } from "@mui/material";

const Main = () => {
  const theme = useContext(ThemeContext);
  const [ShowBurger, setShowBurger] = React.useState<boolean>(true);
  const { open } = useContext(SidebarContext);
  const { blurPage, headerPosition } = useContext(AppDataContext);

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
