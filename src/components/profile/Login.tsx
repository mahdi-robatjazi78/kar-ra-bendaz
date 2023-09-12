import React, { useState, useContext, useEffect } from "react";
import ThemeContext from "../../context/themeContext";
import { useNavigate } from "react-router-dom";
import { Box, Avatar, InputAdornment, IconButton, Tooltip } from "@mui/material";
import { NavLink } from "react-router-dom";
import Toast from "../../util/toast";
import StyledButton from "@/styles/styled/styled_button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaRegUser } from "react-icons/fa";
import { BsKey } from "react-icons/bs";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { SetUserData, SetUserToken } from "@/redux/features/userSlice";
import StyledTextFieldWhite from "@/styles/styled/styled_textField";
import { RootState, store } from "@/redux/store";
import { UserRtkService, useUserSigninMutation } from "@/redux/api/user";
import { TodoRtkService } from "@/redux/api/todos";
import { CategoryRtkService } from "@/redux/api/categories";
import { WorkspacesRtkService } from "@/redux/api/workspaces";
import {
  deactiveBlur,
  handleSettingModalClose,
} from "@/redux/features/settingSlice";
import useWindowSize from "@/hooks/useWindowSize";
import Text from "@/styles/styled/styled_typography"; 



const Login = () => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    modal: { open: OpenSettingModal },
  } = useSelector((state: RootState) => state.settings);


  const {token:_Token , me: {email:_Email}} = useSelector((state: RootState) => state.auth);


  const [loginUserRequest, loginUserResponse] = useUserSigninMutation();
  const [width, height] = useWindowSize().size;

  useEffect(() => {
    dispatch(TodoRtkService.util.resetApiState());
    dispatch(CategoryRtkService.util.resetApiState());
    dispatch(UserRtkService.util.resetApiState());
    dispatch(WorkspacesRtkService.util.resetApiState());
    dispatch(deactiveBlur());

    if (OpenSettingModal) {
      dispatch(handleSettingModalClose());
    }
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
      username: "",
      password: "",
    },

    validateOnMount: false,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: YupObjectValidationFields,

    onSubmit: (values) => {
      loginUserRequest({ email: values.username, password: values.password })
        .unwrap()
        .then((response) => {
          const { email, fname, lname, token, userName, picture, accountType ,gender } =
            response;

          dispatch(
            SetUserToken({
              token,
            })
          );
          dispatch(
            SetUserData({
              email,
              fname,
              lname,
              gender,
              userName,
              picture,
              accountType,
            })
          );

          Toast(response.msg, true, true);
        }).then(()=>{
          navigate("/");

        })
        .catch((error) => {
          console.log(error);
        });
    },
  }); 



  return (
    <Box
      className={
        theme.isDarkMode ? "parentLoginSignupDark  " : "parentLoginSignupLight "
      }
    >
      <Box className="enterUserPages">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 0.3 }}
          className="container"
        >
          {height > 470 && <Avatar></Avatar>}
          {height > 430 && <Text center>Login</Text>}

          <form onSubmit={formik.handleSubmit} style={{ marginTop: "2rem" }}>
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
                formik.touched.username && formik.errors.username ? true : false
              }
              helperText={formik.touched.username ? formik.errors.username : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaRegUser style={{ color: theme.borders }} />
                  </InputAdornment>
                ),
              }}
            />

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
                formik.touched.password && formik.errors.password ? true : false
              }
              helperText={formik.touched.password ? formik.errors.password : ""}
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
                      <HiOutlineEye
                        onClick={() => setShowPassword(true)}
                        style={{
                          color: theme.borders,
                          fontSize: "1.5rem",
                          cursor: "pointer",
                          zIndex: 4,
                        }}
                      />
                    ) : (
                      <HiOutlineEyeOff
                        onClick={() => setShowPassword(false)}
                        style={{
                          color: theme.borders,
                          fontSize: "1.5rem",
                          cursor: "pointer",
                          zIndex: 4,
                        }}
                      />
                    )}
                  </InputAdornment>
                ),
              }}
            />

          

            <Box
              className="d-flex-between"
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
      </Box>
    </Box>
  );
};

export default Login;
