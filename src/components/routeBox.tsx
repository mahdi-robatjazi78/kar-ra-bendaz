import React, { useState } from "react";
import Signup from "./profile/Signup";
import Login from "./profile/Login";
import Profile from "./profile/Profile";
import HomePage from "./home";
import {  Routes, Route, useNavigate } from "react-router-dom";
import { Box} from "@mui/material";
import Todos from "./Todos";
import NoteBoard from "./notes";
import { useHotkeys } from "react-hotkeys-hook";
import {useSelector} from 'react-redux'
import { RootState } from "@/redux/store";

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
const RouteBox = () => {
  const navigate = useNavigate();
  const  {blur} = useSelector((state:RootState)=>state.settings)
 
  useHotkeys("alt+ctrl+h", () => navigate("/"));
  useHotkeys("alt+ctrl+t", () => navigate("/todos"));
  useHotkeys("alt+ctrl+p", () => navigate("/profile"));


  const [userSignupData, setUserSignupData] = useState<ISignupData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
  });

  return (
    <Box
      style=
      {
        {
          ...(blur.body && {filter:`blur(${blur.size}px)`}),
          width:"100%"
        }
      }
      >
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
    </Box>
  );
};

export default RouteBox;
