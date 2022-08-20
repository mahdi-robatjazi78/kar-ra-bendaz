import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "../context/themeContext";
import Signup from "./profile/Signup";
import Login from "./profile/Login";
import Profile from "./profile/Profile";
import { SidebarContext } from "../context/sidebarContext";
import Welcome from "./welcome";
import { useLocation, Routes, Route, useNavigate } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import Todos from "./Todos";
import useKeyPress from '../hooks/useKeyPress'

interface IPerson {
  person: {
    name: string;
    age: number;
    isYoung: boolean;
  }[];
}
interface ISignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
}

const boardStyle = {
  width: "100%",
};
const Home = ({ setShowBurger }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const homeKeyboard = useKeyPress('h')
  const profileKeyboard = useKeyPress('p')
  const todoKeyboard = useKeyPress('t')

  if(homeKeyboard && location.pathname !== "/"){
    navigate('/')
  }
  if(profileKeyboard && location.pathname !== "/profile"){
    navigate('/profile')
  }
  if(todoKeyboard && location.pathname !== "/todos"){
    navigate('/todos')
  }

  const theme = useContext(ThemeContext);
  const [userSignupData, setUserSignupData] = useState<ISignupData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
  });
  // const [person ,setPerson] =useState<string[]> (['mahdi robatjazi','zahra mashkani'])

  return (
    <div style={{ color: theme.text1, display: "flex" }}>
      <Box className="board" style={boardStyle}>
        <Routes>
          <Route path="/" element={<Welcome />} />
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
          <Route path="profile" element={<Profile />} />

          <Route path="todos" element={<Todos />} />
        </Routes>
      </Box>
    </div>
  );
};

export default Home;
