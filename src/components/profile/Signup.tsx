import React, { useContext, useLayoutEffect, FC } from "react";
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
import CButton from "@/styled-component/Cbutton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
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

const Signup= ({ userSignupData, setUserSignupData }) => {
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


  // const submitForm = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       `${base_url}/users/new`,
  //       userSignupData
  //     );
  //     navigate("/login");
  //   } catch (error) {
  //     console.error(error.response);
  //   }
  // };




  const formik = useFormik({

   


    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Must Greater than 3 charachters")
        .max(35, "Must be 35 characters or less")
        .required("this field is Required"),

      password: Yup.string()
        .min(4, "Must Greater than 3 charachters ")
        .max(20, "Must be 20 characters or less")
        .required("this field is Required"),
    }),



    validateOnChange: false, // this one
    validateOnBlur: true, // and this one

    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${base_url}/users/new`,
          {
            firstName:values.firstName,
            lastName:values.lastName,
            gender:"female",
            email: values.username,
            password: values.password,
          });
        
        navigate("/login");
      } catch (error) {
        console.error(error.response);
      }
    },
  }); 

  return (
    <Box
    className={
      theme.isDarkMode ? "parentLoginSignupDark" : "parentLoginSignupLight"
    }
  >
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Grid container >
        <Grid xs={12} item className="enterUserPages">
        <Box className="container">
          <Avatar  sx={{ mt: "2em", bgcolor: theme.borders }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5" style={{ color: theme.text1 }}>
            Sign Up
          </Typography>
        
        <form 
         onSubmit={formik.handleSubmit}
         style={{ marginTop: "2rem" }} 
        > 
        <Grid container>
            <Grid item xs={12}>
              <Box display="flex" style={{gap:'.8rem'}}>
              <TextField
               className={
                  formik.errors.username ? "errorStateField" : ""
                }
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
                error={
                  formik.errors.firstName !== "" && formik.touched.firstName
                }
                helperText={formik.errors.firstName}
              />
            
              <TextField
               className={
                  formik.errors.username ? "errorStateField" : ""
                }
                margin="normal"
                
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                error={
                  formik.errors.lastName !== "" && formik.touched.lastName
                }
                helperText={formik.errors.lastName}
              />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={
                  formik.errors.username ? "errorStateField" : ""
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
                  formik.errors.username !== "" && formik.touched.username
                }
                helperText={formik.errors.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              className={
                formik.errors.password ? "errorStateField" : ""
              }
                autoComplete="new-password"
                key="password"
                margin="normal"
                
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={formik.handleChange}
                      value={formik.values.password}
                      error={
                        formik.touched.password && formik.errors.password !== ""
                      }
                      helperText={formik.errors.password}
              />
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
          
          <CButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </CButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink to="/login"  className="linkStyles">
                Already have an account? Sign in
              </NavLink>
            </Grid>
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

export default Signup;
