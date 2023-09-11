import React, { useState, useContext } from "react";
import { Box, InputAdornment, Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RootState } from "@/redux/store";
import StyledTextFieldWhite from "@/styles/styled/styled_textField";
import { FaRegUser } from "react-icons/fa";
import ThemeContext from "@/context/themeContext";
import StyledButton from "@/styles/styled/styled_button";
import {
  useEditProfileDataMutation,
  useLazyGetProfileMeDataQuery,
} from "@/redux/api/user";
import Toast from "@/util/toast";
import { SetUserData } from "@/redux/features/userSlice";
import UsernameStrenghtPopop from "@/components/mini/popop/usernameStrenghtPopop";
import useWindowSize from "@/hooks/useWindowSize";
import { PiGenderFemale, PiGenderMale } from "react-icons/pi";
import { RxQuestionMark } from "react-icons/rx";

const ProfileData = () => {
  const [profileMeDataRequset, profileMeDataResponse] = useLazyGetProfileMeDataQuery();

  const { fname, lname, email, gender } = useSelector(
    (state: RootState) => state.auth.me
  );

  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);

  const [editFormDataRequest, editFormDataResponse] =
    useEditProfileDataMutation();

  const YupObjectValidationFields = Yup.object({}).shape({
    firstName: Yup.string()
    .min(3, "Must Greater than 2 charachters")
    .max(20, "Must be 20 characters or less"),
  lastName: Yup.string()
    .min(3, "Must Greater than 2 charachters")
    .max(20, "Must be 20 characters or less"),
  username: Yup.string()
    .min(6, "Must Greater than 5 charachters")
    .max(35, "Must be 34 characters or less")
    .test(
      "Must has lowercase letters",
      "It doesnt contain lowercase letters",
      (value, context) => /[a-z]/.test(value)
    )
    .test(
      "Must has uppercase letters",
      "It doesnt contain uppercase letters",
      (value, context) => /[A-Z]/.test(value)
    )
    .test(
      "Must has Seperators or any Number",
      "It doesnt contain any seperators or numbers",
      (value, context) => {
        let hasAcceptableSeperators = /[-_.]/.test(value);
        let hasAnyNumber = /[0-9]/.test(value);

        if (hasAcceptableSeperators || hasAnyNumber) {
          return true;
        } else return false;
      }
    )
    .required("Username is Required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: fname,
      lastName: lname,
      username: email,
      gender: gender,
    },
    validateOnMount: false,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: YupObjectValidationFields,

    onSubmit: (values) => {
      const body = {
        fname: values.firstName,
        lname: values.lastName,
        username: values.username,
        gender: values.gender,
      };

      editFormDataRequest(body)
        .unwrap()
        .then((resp) => {
          Toast(resp.msg, true, true);

          profileMeDataRequset({})
            .unwrap()
            .then((resp) => {
              const { email, fname, lname, userName, picture ,gender} = resp;
              dispatch(
                SetUserData({
                  email,
                  fname,
                  lname,
                  gender,
                  userName,
                  picture,
                })
              );
            });
        });
    },
  });

  const [w, h] = useWindowSize().size;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleUsernameFocus = (event: any) => {
    event.currentTarget.setSelectionRange(event.currentTarget.value.length, event.currentTarget.value.length)
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box className="edit-profile-data-container">
      <form onSubmit={formik.handleSubmit} style={{ marginTop: "2rem" }}>
        <Box
          display="flex"
          style={{
            gap: w > 450 ? ".8rem" : 0,
            flexDirection: w > 450 ? "row" : "column",
          }}
        >
          <StyledTextFieldWhite
            labelBackground="rgba(121, 121, 121, 0.155)"
            tabIndex={1}
            margin="normal"
            name="firstName"
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
            style={{ borderColor: "red" }}
            onChange={formik.handleChange}
            value={formik.values.firstName}
            size="small"
            error={
              formik.values.firstName && formik.errors.firstName
            }
            helperText={
              formik.values.firstName && formik.errors.firstName
                ? formik.errors.firstName
                : ""
            }
            valid={
              formik.values.firstName && !formik.errors.firstName
            }
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
            error={
              formik.values.lastName && formik.errors.lastName
            }
            helperText={
              formik.values.lastName && formik.errors.lastName
                ? formik.errors.lastName
                : ""
            }
            valid={
              formik.values.lastName && !formik.errors.lastName
            }
          />
        </Box>

        <StyledTextFieldWhite
          onFocus={handleUsernameFocus}
          onBlur={handleClose}
          className={formik.errors.username ? "errorStateField" : ""}
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
          valid={!formik.errors.username && formik.values.username}
          value={formik.values.username}
          error={
            formik.touched.username && formik.errors.username ? true : false
          }
          helperText={formik.touched.username ? formik.errors.username : ""}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaRegUser style={{ color: theme.borders }} />
              </InputAdornment>
            ),
          }}
        />

        <UsernameStrenghtPopop
          open={open}
          anchorEl={anchorEl}
          handleClose={handleClose}
          id={id}
          username={formik.values.username}
        />

        <Box className="gender-box">
          <Tooltip arrow title="Male">
            <span>
              <input
                type="radio"
                name="gender"
                id="gender-male"
                value="male"
                onClick={formik.handleChange}
              />
              <label htmlFor="gender-male">
                <PiGenderMale
                  className={
                    formik.values.gender === "male"
                      ? "activeGenderIconStyle"
                      : "deactiveGenderIconStyle"
                  }
                />
              </label>
            </span>
          </Tooltip>

          <Tooltip arrow title="Female">
            <span>
              <input
                type="radio"
                name="gender"
                id="gender-female"
                value="female"
                onClick={formik.handleChange}
              />
              <label htmlFor="gender-female">
                <PiGenderFemale
                  className={
                    formik.values.gender === "female"
                      ? "activeGenderIconStyle"
                      : "deactiveGenderIconStyle"
                  }
                />
              </label>
            </span>
          </Tooltip>
          <Tooltip arrow title="Unknown">
            <span>
              <input
                type="radio"
                name="gender"
                id="gender-unknown"
                value="unknown"
                onClick={formik.handleChange}
              />
              <label htmlFor="gender-unknown">
                <RxQuestionMark
                  className={
                    formik.values.gender === "unknown"
                      ? "activeGenderIconStyle"
                      : "deactiveGenderIconStyle"
                  }
                />
              </label>
            </span>
          </Tooltip>
        </Box>

        <StyledButton
          tabIndex={4}
          type="submit"
          variant="outlined"
          disabled={
            formik.errors.username ||
            formik.errors.firstName ||
            formik.errors.lastName ||
            (formik.values.firstName === fname &&
              formik.values.lastName === lname &&
              formik.values.username === email &&
              formik.values.gender === gender)
          }
        >
          <span>Update Profile</span>
        </StyledButton>
      </form>
    </Box>
  );
};

export default ProfileData;
