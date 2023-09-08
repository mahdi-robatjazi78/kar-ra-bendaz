import React, { useState } from "react";
import Signup from "./profile/Signup";
import Login from "./profile/Login";
import Profile from "./profile/Profile";
import EditProfile from "./profile/EditProfile";
import HomePage from "./home";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Todos from "./Todos";
import NoteBoard from "./notes";
import { useHotkeys } from "react-hotkeys-hook";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Page404 from "@/components/mini/404page/404";
import { LogoutAction } from "@/redux/features/userSlice";
import { useDispatch } from "react-redux";

const CheckUserSinginAndProtectRoutes = ({ userIsSignin, children }) => {
  if (!userIsSignin) {
    return <Page404 />;
  }
  return children;
};

const ProtectAuthenticatePages = ({ userIsSignin, children }) => {
  if (!userIsSignin) {
    return children;
  }
  return <Page404 />;
};

const RouteBox = () => {
  const navigate = useNavigate();
  const { blur } = useSelector((state: RootState) => state.settings);
  const { token } = useSelector((state: RootState) => state.auth);
  let userSignin = token ? true : false;
  useHotkeys("alt+h", () => {
    if (token) {
      navigate("/");
    }
  });
  useHotkeys("alt+w", () => {
    if (token) {
      navigate("/todos");
    }
  });
  useHotkeys("alt+p", () => {
    if (token) {
      navigate("/profile");
    }
  });

  const [userSignupData, setUserSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
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
              <Signup
                userSignupData={userSignupData}
                setUserSignupData={setUserSignupData}
              />
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
            <CheckUserSinginAndProtectRoutes userIsSignin={userSignin}>
              <HomePage />
            </CheckUserSinginAndProtectRoutes>
          }
        />
        <Route
          path="profile"
          element={
            <CheckUserSinginAndProtectRoutes userIsSignin={userSignin}>
              <Profile />{" "}
            </CheckUserSinginAndProtectRoutes>
          }
        />

        <Route
          path="edit-profile"
          element={
            <CheckUserSinginAndProtectRoutes userIsSignin={userSignin}>
              <EditProfile />{" "}
            </CheckUserSinginAndProtectRoutes>
          }
        />

        <Route
          path="todos"
          element={
            <CheckUserSinginAndProtectRoutes userIsSignin={userSignin}>
              <Todos />
            </CheckUserSinginAndProtectRoutes>
          }
        />

        <Route
          path="notes"
          element={
            <CheckUserSinginAndProtectRoutes userIsSignin={userSignin}>
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
