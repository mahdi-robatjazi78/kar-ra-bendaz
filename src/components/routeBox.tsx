import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "../context/themeContext";
import Signup from "./profile/Signup";
import Login from "./profile/Login";
import Profile from "./profile/Profile";
import { SidebarContext } from "../context/sidebarContext";
import HomePage from "./home";
import { useLocation, Routes, Route, useNavigate } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import Todos from "./Todos";
import NoteBoard from "./notes";
import { useHotkeys } from "react-hotkeys-hook";

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
const RouteBox = ({ setShowBurger }) => {
  const navigate = useNavigate();
 
 
  useHotkeys("alt+ctrl+h", () => navigate("/"));
  useHotkeys("alt+ctrl+t", () => navigate("/todos"));
  useHotkeys("alt+ctrl+p", () => navigate("/profile"));

  const theme = useContext(ThemeContext);
  const [userSignupData, setUserSignupData] = useState<ISignupData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
  });

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
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
      <Route path="notes" element={<NoteBoard />} />
    </Routes>
  );
};

export default RouteBox;
