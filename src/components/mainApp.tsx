import React, { useContext, useState } from "react";
import ThemeContext from "../context/colorModeContext";
import {SidebarContext} from "../context/sidebarContext";
import Header from "./header";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./home";
import Sidebar from "./sidebar/sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notifications from "./notifcations";
import Todos from "./Todos"
import Calender from "./Calender";
import Games from "./Games";
import About from "./About";
import { Box, Grid } from "@mui/material";

interface ISignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Main = (props) => {
  const { isDarkMode, setIsDarkMode } = props;

  const theme = useContext(ThemeContext);
  console.log(">>theme", theme);

  const [userSignupData, setUserSignupData] = useState<ISignupData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { open } = useContext(SidebarContext);

  
  const boardStyle={
    width:"100%"
  }

  return (
    <main
      style={{
        transition: "background .4s ease",
        backgroundColor: theme.background,
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <BrowserRouter>
        <div className="App">
          <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        </div>
        <Box display="flex">
            <Grid container>
          {open === "show" && (
            
            <Grid item xs={4} md={2}>
          
          <Sidebar />
          
            </Grid>
          
          )}

          <Grid item xs={open==="hide" ? 12 : 8} md={open==="hide" ? 12 :10}>


          <Box className="board" style={boardStyle} >

            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="signup"
                element={
                  <Signup
                  userSignupData={userSignupData}
                  setUserSignupData={setUserSignupData}
                  />
                }
                />
              <Route path="login" element={<Login />} />

              <Route path={"/todos"} element={<Todos />} />
              <Route path={"/calender"} element={<Calender />} />
              <Route path={"/games"} element={<Games />} />
              <Route path={"/about"} element={<About />} />
            </Routes>
          </Box>
                </Grid>
            </Grid>
        </Box>
      </BrowserRouter>
      {/* <h1 style={{color:theme.foreground , margin:0}}>hay this is main</h1> */}
    </main>
  );
};

export default Main;
