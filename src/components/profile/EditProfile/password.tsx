import React, { useContext, useState, useEffect, useRef } from "react";
import { Box, InputAdornment } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import StyledTextFieldWhite from "@/styles/styled/styled_textField";
import ThemeContext from "@/context/themeContext";
import StyledButton from "@/styles/styled/styled_button";
import { useEditProfilePasswordMutation } from "@/redux/api/user";
import Toast from "@/util/toast";
import { BsKey } from "react-icons/bs";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import PasswordStrenghtPopop from "@/components/mini/popop/passwordStrenghtPopop";
const UpdatePasswordComponent = () => {
  const theme = useContext(ThemeContext);
  const [editProfilePasswordRequest, editProfilePasswordResponse] =
    useEditProfilePasswordMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const YupObjectValidationFields = Yup.object({}).shape({
    password: Yup.string()
    .min(6, "Must Greater than 5 charachters ")
    .max(20, "Must be 20 characters or less")
    .required("Password is Required")
    .test("isValidPass", " is not valid", (value, context) => {
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSymbole = /[!@#%&]/.test(value);
      const conditions = [hasLowerCase, hasUpperCase, hasNumber, hasSymbole];
      const result = conditions.every((condition) => condition);
      if (result) {
        return true;
      } else return false;
    }),

    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password")],
      "Confirmation password must match with password"
    ),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },
    validateOnMount: false,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: YupObjectValidationFields,

    onSubmit: (values) => {
      editProfilePasswordRequest({
        password: values.password,
        passwordConfirmation: values.passwordConfirmation,
      })
        .unwrap()
        .then((response) => {
          Toast(response.msg, true, true);
        });
    },
  });

  
  const [anchorEl, setAnchorEl] = useState(null);
  

  const handlePasswordFocus = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }; 

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
 


  return (
    <Box className="edit-profile-data-container">
      <form onSubmit={formik.handleSubmit}>
        <StyledTextFieldWhite
          autoFocus={false}
          onFocus={handlePasswordFocus}
          onBlur={handleClose}
          tabIndex={4}
          className={formik.errors.password ? "errorStateField" : ""}
          aria-describedby={id}
          key="password"
          margin="normal"
          required
          fullWidth
          name="password"
          label="New Password"
          id="password"
          type={showPassword ? "text" : "password"}
          valid={!formik.errors.password && formik.values.password}
          onChange={formik.handleChange}
          value={formik.values.password}
          error={(formik.errors.password && formik.values.password) ? true : false}
          helperText={formik.touched.password ? formik.errors.password : ""}
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
                  <HiOutlineEye
                    onClick={() => setShowPassword(true)}
                    style={{
                      color: theme.borders,
                      fontSize: "1.5rem",
                      cursor: "pointer",
                    }}
                  />
                ) : (
                  <HiOutlineEyeOff
                    onClick={() => setShowPassword(false)}
                    style={{
                      color: theme.borders,
                      fontSize: "1.5rem",
                      cursor: "pointer",
                    }}
                  />
                )}
              </InputAdornment>
            ),
          }}
        />

        <PasswordStrenghtPopop
          open={open}
          anchorEl={anchorEl}
          handleClose={handleClose}
          id={id}
          password={formik.values.password}
        />

        <StyledTextFieldWhite
          tabIndex={4}
          className={
            formik.errors.passwordConfirmation ? "errorStateField" : ""
          }
          key="passwordConfirmation"
          margin="normal"
          required
          fullWidth
          valid={!formik.errors.passwordConfirmation && formik.values.passwordConfirmation}
          name="passwordConfirmation"
          label="Password Confirmation"
          id="password-confirmation"
          type={showPasswordConfirmation ? "text" : "password"}
          onChange={formik.handleChange}
          value={formik.values.passwordConfirmation}
          error={formik.errors.passwordConfirmation ? true : false}
          helperText={
            formik.errors.passwordConfirmation
              ? formik.errors.passwordConfirmation
              : ""
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
                {!showPasswordConfirmation ? (
                  <HiOutlineEye
                    onClick={() => setShowPasswordConfirmation(true)}
                    style={{
                      color: theme.borders,
                      fontSize: "1.5rem",
                      cursor: "pointer",
                    }}
                  />
                ) : (
                  <HiOutlineEyeOff
                    onClick={() => setShowPasswordConfirmation(false)}
                    style={{
                      color: theme.borders,
                      fontSize: "1.5rem",
                      cursor: "pointer",
                    }}
                  />
                )}
              </InputAdornment>
            ),
          }}
        />
        <StyledButton
          className="passwd-submit-button"
          tabIndex={4}
          type="submit"
          variant="outlined"
          disabled={
            !formik.values.password|| !formik.values.passwordConfirmation ||
            formik.errors.password || formik.errors.passwordConfirmation
          }
        >
          <span>Update Password</span>
        </StyledButton>
      </form>
    </Box>
  );
};

export default UpdatePasswordComponent;
