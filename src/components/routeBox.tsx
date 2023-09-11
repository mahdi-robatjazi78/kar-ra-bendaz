import React, { useState } from "react";
import Signup from "./profile/Signup";
import Login from "./profile/Login";
import Profile from "./profile/Profile";
import EditProfile from "./profile/EditProfile";
import HomePage from "./home";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import Todos from "./Todos";
import NoteBoard from "./notes";
import { useHotkeys } from "react-hotkeys-hook";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Page404 from "@/components/mini/404page/404";
import { LogoutAction } from "@/redux/features/userSlice";
import Toast from "@/util/toast";

const CheckUserSinginAndProtectRoutes = ({
  userIsSignin,
  children,
  navigate,
}) => {
  if (!userIsSignin) {
    navigate(-1);
  } else {
    return children;
  }
};

const ProtectAuthenticatePages = ({ userIsSignin, children }) => {
  if (userIsSignin) {
    return <Navigate to="/login" replace />
  }
  return children;
};

const RouteBox = () => {
  const navigate = useNavigate();
  const { blur } = useSelector((state: RootState) => state.settings);
  const { token } = useSelector((state: RootState) => state.auth);
  const { active_ws:ActiveWs } = useSelector((state: RootState) => state.todoPageConfig);
  let userSignin = token ? true : false;




  useHotkeys("alt+h", () => {
    if (token) {
      navigate("/");
    }
  });
  useHotkeys("alt+w", () => {
    if (token) {
      if(ActiveWs?.id){
        navigate("/todos");
      }else{
        Toast("Please first active one workspace then go to todo page" , false , true , "⛔")
        navigate("/");
      }
      
    }
  });
  useHotkeys("alt+p", () => {
    if (token) {
      navigate("/profile");
    }
  });

  return (
    <Box
      style={{
        ...(blur.body && { filter: `blur(${blur.size}px)` }),
        width: "100%",
      }}
    >
      <Routes>
        <Route
          path="signup"
          element={
            <ProtectAuthenticatePages userIsSignin={userSignin}>
              <Signup />
            </ProtectAuthenticatePages>
          }
        />

        <Route
          path="login"
          element={
            <ProtectAuthenticatePages userIsSignin={userSignin}>
              <Login />
            </ProtectAuthenticatePages>
          }
        />

        <Route
          path="/"
          element={
            <CheckUserSinginAndProtectRoutes
              navigate={navigate}
              userIsSignin={userSignin}
            >
              <HomePage />
            </CheckUserSinginAndProtectRoutes>
          }
        />
        <Route
          path="profile"
          element={
            <CheckUserSinginAndProtectRoutes
              navigate={navigate}
              userIsSignin={userSignin}
            >
              <Profile />
            </CheckUserSinginAndProtectRoutes>
          }
        />

        <Route
          path="edit-profile"
          element={
            <CheckUserSinginAndProtectRoutes
              navigate={navigate}
              userIsSignin={userSignin}
            >
              <EditProfile />
            </CheckUserSinginAndProtectRoutes>
          }
        />

        <Route
          path="todos"
          element={
            <CheckUserSinginAndProtectRoutes
              navigate={navigate}
              userIsSignin={userSignin}
            >
              <Todos />
            </CheckUserSinginAndProtectRoutes>
          }
        />

        <Route
          path="notes"
          element={
            <CheckUserSinginAndProtectRoutes
              navigate={navigate}
              userIsSignin={userSignin}
            >
              <NoteBoard />
            </CheckUserSinginAndProtectRoutes>
          }
        />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </Box>
  );
};

export default RouteBox;
