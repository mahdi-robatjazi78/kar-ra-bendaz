import React, { useState, useContext, useLayoutEffect } from "react";
import ThemeContext from "../../context/themeContext";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Grid,
  Box,
  Typography,
  Container,
  Avatar,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Axios, { base_url } from "../../services/api";
import Toast from "../../util/toast";
import StyledButton from "@/styles/styled/styled_button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaRegUser } from "react-icons/fa";
import { BsKey } from "react-icons/bs";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { SetMeData, SetUserToken } from "@/redux/features/userSlice";
import StyledTextFieldWhite from "@/styles/styled/styled_textField";
import { setCommonLocalSettings } from "@/util/funcs";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Login = () => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { headerPosition } = useSelector((state: RootState) => state.settings);
  const YupObjectValidationFields = Yup.object({}).shape({
    username: Yup.string()
      .min(3, "Must Greater than 3 charachters")
      .max(35, "Must be 35 characters or less")
      .required("Username is Required"),

    password: Yup.string()
      .min(4, "Must Greater than 3 charachters ")
      .max(20, "Must be 20 characters or less")
      .required("Password is Required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validateOnMount: false,
    validateOnChange: true,
    validateOnBlur: true,

    validationSchema: YupObjectValidationFields,

    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${base_url}/users/login`, {
          email: values.username,
          password: values.password,
        });
        const { email, fname, lname, gender, token, userName } = response.data;

        dispatch(
          SetUserToken({
            token,
          })
        );
        dispatch(
          SetMeData({
            email,
            fname,
            lname,
            gender,
            userName,
          })
        );

        setCommonLocalSettings("auth", {
          token: token,
          me: {
            email,
            fname,
            lname,
            gender,
            userName,
          },
        });

        navigate("/");
        Toast(response.data.msg, true, true);
      } catch (error) {
        Toast(error.response.data.msg, false, true);
      }
    },
  });

  return (
    <Box
      className={
        theme.isDarkMode ? "parentLoginSignupDark" : "parentLoginSignupLight"
      }
    >
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Grid container>
          <Grid xs={12} item className="enterUserPages">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ ease: "easeOut", duration: 0.3 }}
              className="container"
            >
              <Avatar></Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <form
                onSubmit={formik.handleSubmit}
                style={{ marginTop: "2rem", maxWidth: "20rem" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <StyledTextFieldWhite
                      tabIndex={1}
                      className={
                        formik.touched.password && formik.errors.username
                          ? "errorStateField"
                          : ""
                      }
                      fullWidth
                      label="Username"
                      name="username"
                      autoComplete="username"
                      key="Username"
                      margin="normal"
                      variant="outlined"
                      size="small"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      error={
                        formik.touched.username && formik.errors.username
                          ? true
                          : false
                      }
                      helperText={
                        formik.touched.username ? formik.errors.username : ""
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FaRegUser style={{ color: theme.borders }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledTextFieldWhite
                      tabIndex={2}
                      className={
                        formik.errors.password && formik.touched.password
                          ? "errorStateField"
                          : ""
                      }
                      fullWidth
                      name="password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      autoComplete="new-password"
                      variant="outlined"
                      key="Password"
                      margin="normal"
                      size="small"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      error={
                        formik.touched.password && formik.errors.password
                          ? true
                          : false
                      }
                      helperText={
                        formik.touched.password ? formik.errors.password : ""
                      }
                      InputProps={{
                        autoComplete: "off",
                        startAdornment: (
                          <InputAdornment position="start">
                            <BsKey style={{ color: theme.borders }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            {!showPassword ? (
                              <IconButton onClick={() => setShowPassword(true)}>
                                <HiOutlineEye
                                  style={{ color: theme.borders }}
                                />{" "}
                              </IconButton>
                            ) : (
                              <IconButton
                                onClick={() => setShowPassword(false)}
                              >
                                <HiOutlineEyeOff
                                  style={{ color: theme.borders }}
                                />{" "}
                              </IconButton>
                            )}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  style={{ marginTop: "1.5rem" }}
                >
                  <NavLink to="/signup" className="linkStyles">
                    {"Don't have an account? go to Signup"}
                  </NavLink>

                  <StyledButton
                    tabIndex={3}
                    type="submit"
                    variant="outlined"
                    disabled={formik.errors.password || formik.errors.username}
                  >
                    <span>Login</span>
                  </StyledButton>
                </Box>
              </form>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;
