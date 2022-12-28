import React, { useState, useContext, useLayoutEffect } from "react";
import ThemeContext from "../../context/themeContext";
import { SidebarContext } from "../../context/sidebarContext";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import {
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Button,
  Avatar,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Axios, { base_url } from "../../services/api";
import Toast from "../../util/toast";
import CButton from "@/styled-component/Cbutton";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const theme = useContext(ThemeContext);
  const { setCloseSidebar } = useContext(SidebarContext);
  const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [focus, setFocus] = useState("username");
  



  const YupObjectValidationFields = Yup.object({})
  .shape({
    username: Yup.string()
      .min(3, "Must Greater than 3 charachters")
      .max(35, "Must be 35 characters or less")
      .required("Username is Required"),

    password: Yup.string()
      .min(4, "Must Greater than 3 charachters ")
      .max(20, "Must be 20 characters or less")
      .required("Password is Required"),
  })

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },


    validateOnMount:false,
    validateOnChange: false, // this one
    validateOnBlur: true, // and this one

    // validationSchema: YupObjectValidationFields,


    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${base_url}/users/login`, {
          email: values.username,
          password: values.password,
        });
        Axios.defaults.headers["x-auth-token"] = response.data.data.token;
        localStorage.setItem("user", JSON.stringify(response.data.data));
        navigate("/");
        Toast(response.data.msg);
      } catch (error) {
        console.log("error login");
        Toast(error.response.data.msg, false);
      }
    },
  }); 
  console.log("touched username"  , formik.touched.username)
  console.log("touched password"  , formik.touched.password)
  console.log("errors username"  , formik.errors.username)
  console.log("errors password"  , formik.errors.password)
  console.log("-----------------------------------------------------")

  useLayoutEffect(() => {
    setCloseSidebar();
  }, []);

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
            <Box className="container">
              <Avatar sx={{ mt: "3em", bgcolor: theme.borders }}>
                {/* <LockOutlinedIcon /> */}
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                style={{ color: theme.text1 }}
              >
                Login
              </Typography>
              <form
                onSubmit={formik.handleSubmit}
                style={{ marginTop: "2rem" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      className={
                        formik.errors.username ? "errorStateField" : ""
                      }
                      autoFocus
                      fullWidth
                      label="Username"
                      name="username"
                      autoComplete="username"
                      key="Username"
                      margin="normal"
                      variant="outlined"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      error={
                        formik.touched.username && 
                        formik.errors.username !== ""
                      }
                      helperText={formik.errors.username}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={
                        formik.errors.password ? "errorStateField" : ""
                      }
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      variant="outlined"
                      key="Password"
                      margin="normal"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      error={
                        formik.touched.password && 
                        formik.errors.password !== ""
                      }
                      helperText={formik.errors.password}
                    />
                  </Grid>
                </Grid>
                <CButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={formik.errors.password || formik.errors.username}
                >
                  Login
                </CButton>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <NavLink to="/signup" className="linkStyles">
                      {"Don't have an account? Sign Up"}
                    </NavLink>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;
