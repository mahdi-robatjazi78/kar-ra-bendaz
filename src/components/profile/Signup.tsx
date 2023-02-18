import React, { useContext, useLayoutEffect, useState } from "react";
import ThemeContext from "../../context/themeContext";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { base_url } from "../../services/api";
import { SidebarContext } from "../../context/sidebarContext";
import CButton from "@/styles/styled/Cbutton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import {
  FormControlLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
} from "@mui/material";
import { FaRegUser } from "react-icons/fa";
import { BsKey } from "react-icons/bs";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
// interface ISignupData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   gender: string;
// }

// interface IProps {
//   userSignupData: ISignupData;
//   setUserSignupData: React.Dispatch<React.SetStateAction<ISignupData>>;
// }

const Signup = ({ userSignupData, setUserSignupData }) => {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const { setCloseSidebar } = useContext(SidebarContext);

  // const handleChangeInput = (event) => {
  //   setUserSignupData({
  //     ...userSignupData,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  useLayoutEffect(() => {
    setCloseSidebar();
  }, []);

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
      firstName: "",
      lastName: "",
      username: "",
      password: "",
    },

    validateOnMount: false,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: YupObjectValidationFields,

    onSubmit: async (values) => {
      try {
        await axios.post(`${base_url}/api/users/new`, {
          firstName: values.firstName,
          lastName: values.lastName,
          gender: "female",
          email: values.username,
          password: values.password,
        });

        navigate("/login");
      } catch (error) {
        console.error(error.response);
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  return (
    <Box
      className={
        theme.isDarkMode ? "parentLoginSignupDark" : "parentLoginSignupLight"
      }
    >
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Grid container>
          <Grid xs={12} item className="enterUserPages">
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ ease: "easeOut", duration: 0.3 }}
              className="container"
            >
              <Avatar sx={{ mt: "2em", bgcolor: theme.borders }}>
                {/* <LockOutlinedIcon /> */}
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                style={{ color: theme.text1 }}
              >
                Signup
              </Typography>

              <form
                onSubmit={formik.handleSubmit}
                style={{ marginTop: "2rem", maxWidth: "24rem" }}
              >
                <Grid container>
                  <Grid item xs={12}>
                    <Box display="flex" style={{ gap: ".8rem" }}>
                      <TextField
                        // className={
                        //   formik.errors.username ? "errorStateField" : ""
                        // }
                        margin="normal"
                        autoComplete="given-name"
                        name="firstName"
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        style={{ borderColor: "red" }}
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                        // error={
                        //   formik.errors.firstName !== "" &&
                        //   formik.touched.firstName
                        // }
                        // helperText={formik.errors.firstName}
                        size="small"
                      />

                      <TextField
                        // className={
                        //   formik.errors.username ? "errorStateField" : ""
                        // }
                        margin="normal"
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                        // error={
                        //   formik.errors.lastName !== "" &&
                        //   formik.touched.lastName
                        // }
                        // helperText={formik.errors.lastName}
                        size="small"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={
                        formik.touched.password && formik.errors.username
                          ? "errorStateField"
                          : ""
                      }
                      required
                      fullWidth
                      label="Username"
                      name="username"
                      autoComplete="username"
                      key="Username"
                      margin="normal"
                      variant="outlined"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      error={
                        formik.touched.username && formik.errors.username
                          ? true
                          : false
                      }
                      helperText={
                        formik.touched.username ? formik.errors.username : ""
                      }
                      size="small"
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
                    <TextField
                      className={
                        formik.errors.password && formik.touched.password
                          ? "errorStateField"
                          : ""
                      } 
                      key="password"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      error={
                        formik.touched.password && formik.errors.password
                          ? true
                          : false
                      }
                      helperText={
                        formik.touched.password ? formik.errors.password : ""
                      }
                      size="small"
                      InputProps={{
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
                {/*<Box>
              <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="male"
                  name="gender"
                  row
                  style={{color:theme.text3 , paddingLeft:"1.5rem"}}
                  onChange={(event)=>{
                    setUserSignupData({...userSignupData , gender:event.target.checked})
                  }}
                >
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
              </RadioGroup>
            </Box> */}

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  style={{marginTop:"1.5rem"}}
                >


                <NavLink
                    to="/login"
                    className="linkStyles"
                  >
                    Already have an account? go to Login
                  </NavLink>


                  <CButton
                    type="submit"
                    variant="contained"
                    disabled={formik.errors.password || formik.errors.username}
                  >
                    <span className="submit-button-text">Signup</span>
                  </CButton>

                
                </Box>
              </form>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Signup;
