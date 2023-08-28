import React, { useContext, useState , useEffect } from "react";
import ThemeContext from "../../context/themeContext";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import StyledButton from "@/styles/styled/styled_button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { IconButton, InputAdornment } from "@mui/material";
import { FaRegUser } from "react-icons/fa";
import { BsKey } from "react-icons/bs";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import StyledTextFieldWhite from "@/styles/styled/styled_textField";
import { useUserSignupMutation } from "@/redux/api/user";
import Text from "@/styles/styled/styled_typography";
import useWindowSize from "@/hooks/useWindowSize";
const Signup = () => {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const [width, height] = useWindowSize().size;
  const [userSignupRequest, userSignupResponse] = useUserSignupMutation();
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

    onSubmit: (values) => {
      userSignupRequest({
        firstName: values.firstName,
        lastName: values.lastName,
        gender: "male",
        email: values.username,
        password: values.password,
      })
        .unwrap()
        .then((response) => {
          navigate("/login");
        });
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
        <Box className="enterUserPages">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ease: "easeOut", duration: 0.3 }}
            className="container"
          >
            {height > 570 && <Avatar></Avatar>}
            {height > 530 && (
              <Text style={{ textAlign: "center" }}>Signup</Text>
            )}

            <form
              onSubmit={formik.handleSubmit}
              style={{ marginTop: "2rem", }}
            >
              <Box display="flex" style={{ gap: ".8rem" }}>
                <StyledTextFieldWhite
                  tabIndex={1}
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
                  size="small"
                />

                <StyledTextFieldWhite
                  tabIndex={2}
                  margin="normal"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  size="small"
                />
              </Box>

              <StyledTextFieldWhite
                className={
                  formik.touched.password && formik.errors.username
                    ? "errorStateField"
                    : ""
                }
                tabIndex={3}
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

              <StyledTextFieldWhite
                tabIndex={4}
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
                          <HiOutlineEye style={{ color: theme.borders }} />{" "}
                        </IconButton>
                      ) : (
                        <IconButton onClick={() => setShowPassword(false)}>
                          <HiOutlineEyeOff style={{ color: theme.borders }} />{" "}
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
              />

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                style={{ marginTop: "1.5rem" }}
              >
                <NavLink to="/login" className="linkStyles">
                  Already have an account? go to Login
                </NavLink>

                <StyledButton
                  tabIndex={5}
                  type="submit"
                  variant="outlined"
                  disabled={formik.errors.password || formik.errors.username}
                >
                  <span>Signup</span>
                </StyledButton>
              </Box>
            </form>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Signup;
