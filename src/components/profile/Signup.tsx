import React, { useContext, useState, useEffect } from "react";
import ThemeContext from "../../context/themeContext";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import StyledButton from "@/styles/styled/styled_button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { IconButton, InputAdornment, Tooltip } from "@mui/material";
import { FaRegUser } from "react-icons/fa";
import { BsKey } from "react-icons/bs";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import StyledTextFieldWhite from "@/styles/styled/styled_textField";
import {
  useSignupUploadAvatarImageMutation,
  useUserSignupMutation,
} from "@/redux/api/user";
import Text from "@/styles/styled/styled_typography";
import useWindowSize from "@/hooks/useWindowSize";
import UsernameStrenghtPopop from "../mini/popop/usernameStrenghtPopop";
import PasswordStrenghtPopop from "../mini/popop/passwordStrenghtPopop";
import { AiOutlineUser } from "react-icons/ai";
import { SlPicture } from "react-icons/sl";
import { PiGenderFemale, PiGenderMale } from "react-icons/pi";
import { RxQuestionMark } from "react-icons/rx";
import ImagePreviewPopop from "@/components/mini/popop/imagePreviewPopop";
import Toast from "@/util/toast";

const Signup = () => {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const [width, height] = useWindowSize().size;
  const [userSignupRequest, userSignupResponse] = useUserSignupMutation();
  const [userSignupUploadRequest, userSignupUploadResponse] =
    useSignupUploadAvatarImageMutation();
  const [selectedAvatarPreview, setSelectedAvatarPreview] = useState("");
  const [selectedBannerPreview, setSelectedBannerPreview] = useState("");
  const [avatarFileData, setAvatarFileData] = useState({});
  const [bannerFileData, setBannerFileData] = useState({});

  const YupObjectValidationFields = Yup.object({}).shape({
    firstName: Yup.string()
      .min(3, "Must greater than 2 charachters")
      .max(20, "Must be 20 characters or less"),
    lastName: Yup.string()
      .min(3, "Must greater than 2 charachters")
      .max(20, "Must be 20 characters or less"),
    username: Yup.string()
      .required("Username is required")

      .min(6, "Must greater than 5 charachters")
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
      ),

    password: Yup.string()
      .min(6, "Must greater than 5 charachters ")
      .max(20, "Must be 20 characters or less")
      .required("Password is required")
      .test("isValidPass", " Please check validation rules", (value, context) => {
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
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      gender: "unknown",
    },
    validateOnMount: false,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: YupObjectValidationFields,

    onSubmit: (values) => {
      userSignupRequest({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.username,
        password: values.password,
        gender: values.gender,
      })
        .unwrap()
        .then((response) => {
          if (
            response.status === 200 &&
            response.temp_token &&
            selectedAvatarPreview
          ) {
            userSignupUploadRequest({
              file: avatarFileData,
              avatarUploaded: true,
              temp_token: response.temp_token,
            })
              .unwrap()
              .then((respAvatar) => {
                userSignupUploadRequest({
                  file: bannerFileData,
                  avatarUploaded: false,
                  temp_token: response.temp_token,
                })
                  .unwrap()
                  .then((respBanner) => {
                    navigate("/login");
                  });
              });
          } else if (!selectedAvatarPreview && selectedBannerPreview) {
            userSignupUploadRequest({
              file: bannerFileData,
              avatarUploaded: false,
              temp_token: response.temp_token,
            })
              .unwrap()
              .then((respBanner) => {
                navigate("/login");
              });
          } else {
            navigate("/login");
          }
        });
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [anchorEl_username, setAnchorEl_username] = useState(null);
  const handleUsernameFocus = (event: any) => {
    setAnchorEl_username(event.currentTarget);
  };
  const handleCloseUsernamePopop = () => {
    setAnchorEl_username(null);
  };
  const open = Boolean(anchorEl_username);
  const id = open ? "simple-username-popover" : undefined;

  const [anchorEl_password, setAnchorEl_password] = useState(null);

  const handlePasswordFocus = (event: any) => {
    setAnchorEl_password(event.currentTarget);
  };

  const handleClosePasswordPopop = () => {
    setAnchorEl_password(null);
  };

  const openPasswordPopop = Boolean(anchorEl_password);
  const id_passwordPopop = openPasswordPopop
    ? "simple-password-popover"
    : undefined;

  const [anchorEl_avatar, setAnchorEl_avatar] = useState(null);
  const handleAvatarFocus = (event: any) => {
    setAnchorEl_avatar(event.currentTarget);

    setTimeout(() => {
      handleCloseAvatarPopop();
    }, 1000);
  };
  const handleCloseAvatarPopop = () => {
    setAnchorEl_avatar(null);
  };
  const openAvatarPopop = Boolean(anchorEl_avatar);
  const id_AvatarPopop = openAvatarPopop ? "simple-avatar-popover" : undefined;

  const [anchorEl_banner, setAnchorEl_banner] = useState(null);
  const handleBannerFocus = (event: any) => {
    setAnchorEl_banner(event.currentTarget);
    setTimeout(() => {
      handleCloseBannerPopop();
    }, 1000);
  };
  const handleCloseBannerPopop = () => {
    setAnchorEl_banner(null);
  };
  const openBannerPopop = Boolean(anchorEl_banner);
  const id_BannerPopop = open ? "simple-banner-popover" : undefined;

  // handle after select avatar file
  const handleClickSelectAvatarFile = () => {
    var input = document.createElement("input");
    input.type = "file";

    input.onchange = (e) => {
      var file = e.target.files[0];
      if (file) {
        // handle file data keeping

        if (file?.size > 2500000) {
          Toast(
            "Please select avatar image with 2.5mb size or less",
            false,
            true
          );
          return;
        }
        if (
          file?.type !== "image/png" &&
          file?.type !== "image/jpeg" &&
          file?.type !== "image/jpg"
        ) {
          Toast("Please select png or jpg avatar image", false, true);
          return;
        }

        setAvatarFileData(file);
        // handle preview
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e: Event) {
          setSelectedAvatarPreview(e.target.result);
        };
      }
    };
    input.click();
  };
  const handleClickSelectBannerFile = () => {
    var input = document.createElement("input");
    input.type = "file";

    input.onchange = (e) => {
      var file = e.target.files[0];
      if (file) {
        if (file?.size > 2500000) {
          Toast(
            "Please select banner image with 2.5mb size or less",
            false,
            true
          );
          return;
        }

        if (
          file?.type !== "image/png" &&
          file?.type !== "image/jpeg" &&
          file?.type !== "image/jpg"
        ) {
          Toast("Please select png or jpg banner image", false, true);
          return;
        }

        setBannerFileData(file);

        // handle preview
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e: Event) {
          setSelectedBannerPreview(e.target.result);
        };
      }
    };

    input.click();
  };

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
            {height > 570 && <Avatar src={selectedAvatarPreview}></Avatar>}
            {height > 530 && <Text center>Signup</Text>}

            <form
              noValidate
              onSubmit={formik.handleSubmit}
              style={{ marginTop: "2rem" }}
            >
              <Box display="flex" style={{ gap: ".8rem" }}>
                <StyledTextFieldWhite
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
                    formik.values.firstName.length && formik.errors.firstName
                  }
                  helperText={
                    formik.values.firstName.length && formik.errors.firstName
                      ? formik.errors.firstName
                      : ""
                  }
                  valid={
                    formik.values.firstName.length && !formik.errors.firstName
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
                    formik.values.lastName.length && formik.errors.lastName
                  }
                  helperText={
                    formik.values.lastName.length && formik.errors.lastName
                      ? formik.errors.lastName
                      : ""
                  }
                  valid={
                    formik.values.lastName.length && !formik.errors.lastName
                  }
                />
              </Box>

              <StyledTextFieldWhite
                onFocus={handleUsernameFocus}
                onBlur={handleCloseUsernamePopop}
                className={
                  formik.touched.password && formik.errors.username
                    ? "errorStateField"
                    : ""
                }
                tabIndex={3}
                valid={!formik.errors.username && formik.values.username}
                required
                fullWidth
                label="Username"
                name="username"
                key="Username"
                margin="normal"
                variant="outlined"
                size="small"
                type="search"
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
                InputProps={{
                  autocomplete: "off",
                  form: {
                    autocomplete: "off",
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaRegUser style={{ color: theme.borders }} />
                    </InputAdornment>
                  ),
                }}
              />

              <UsernameStrenghtPopop
                open={open}
                anchorEl={anchorEl_username}
                handleClose={handleCloseUsernamePopop}
                id={id}
                username={formik.values.username}
              />

              <StyledTextFieldWhite
                onFocus={handlePasswordFocus}
                onBlur={handleClosePasswordPopop}
                tabIndex={4}
                className={
                  formik.errors.password && formik.touched.password
                    ? "errorStateField"
                    : ""
                }
                valid={!formik.errors.password && formik.values.password}
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
                autoComplete="new-password"
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
                        <HiOutlineEye
                          onClick={() => setShowPassword(true)}
                          className="password-eye"
                        />
                      ) : (
                        <HiOutlineEyeOff
                          onClick={() => setShowPassword(false)}
                          className="password-eye"
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
              />

              <PasswordStrenghtPopop
                open={openPasswordPopop}
                anchorEl={anchorEl_password}
                handleClose={handleClosePasswordPopop}
                id={id_passwordPopop}
                password={formik.values.password}
              />
              <Box className="d-flex-between" style={{ marginTop: ".5rem" }}>
                <Box>
                  <Tooltip
                    arrow
                    title={
                      selectedAvatarPreview
                        ? ""
                        : "Select Profile Avatar (optional)"
                    }
                  >
                    <span
                      onMouseEnter={(event) => {
                        if (selectedAvatarPreview) {
                          handleAvatarFocus(event);
                        }
                      }}
                    >
                      <AiOutlineUser
                        onClick={handleClickSelectAvatarFile}
                        className={
                          !selectedAvatarPreview
                            ? "deactiveGenderIconStyle"
                            : "activeGenderIconStyle"
                        }
                      />
                    </span>
                  </Tooltip>

                  <Tooltip
                    arrow
                    title={
                      selectedBannerPreview
                        ? ""
                        : "Select Profile Banner (optional)"
                    }
                  >
                    <span
                      aria-describedby={id_BannerPopop}
                      onMouseEnter={(event) => {
                        if (selectedBannerPreview) {
                          handleBannerFocus(event);
                        }
                      }}
                    >
                      <SlPicture
                        onClick={handleClickSelectBannerFile}
                        className={
                          !selectedBannerPreview
                            ? "deactiveGenderIconStyle"
                            : "activeGenderIconStyle"
                        }
                      />
                    </span>
                  </Tooltip>
                </Box>
                <Box>
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
              </Box>

              <Box className="d-flex-between" style={{ marginTop: "1.5rem" }}>
                <NavLink to="/login" className="linkStyles">
                  Already have an account? go to Login
                </NavLink>

                <StyledButton
                  tabIndex={5}
                  type="submit"
                  variant="outlined"
                  disabled={
                    formik.errors.password ||
                    formik.errors.username ||
                    (formik.values.firstName.length &&
                      formik.errors.firstName) ||
                    (formik.values.lastName.length && formik.errors.lastName)
                  }
                >
                  <span>Signup</span>
                </StyledButton>
              </Box>

              <ImagePreviewPopop
                open={openAvatarPopop}
                anchorEl={anchorEl_avatar}
                handleClose={handleCloseAvatarPopop}
                id={id_AvatarPopop}
                alt="avatar-image-preview"
                previewImage={selectedAvatarPreview}
              />

              <ImagePreviewPopop
                open={openBannerPopop}
                anchorEl={anchorEl_banner}
                handleClose={handleCloseBannerPopop}
                id={id_BannerPopop}
                alt="banner-image-preview"
                previewImage={selectedBannerPreview}
              />
            </form>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Signup;
