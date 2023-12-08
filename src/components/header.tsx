import React, { useContext, useEffect, useState } from "react";
import DarkLight from "./mini/darkLight";
import { FaUserAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { BiLogInCircle } from "react-icons/bi";
import { RiUserAddLine, RiLogoutCircleRLine } from "react-icons/ri";
import { SiHomeassistant } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import Toast from "../util/toast";
import Burger from "../util/burger/burger";
import { motion } from "framer-motion";
import { LogoutAction } from "@/redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { AiFillSetting } from "react-icons/ai";
import { Styled_Menu, Styled_Menu_Item } from "@/styles/styled/styled_menu";
import { pairColors, soundPlay } from "@/util/funcs";
import { useUserSignoutMutation } from "@/redux/api/user";
import { UnActiveWs } from "@/redux/features/todoPageConfigSlice";
import ThemeContext from "@/context/themeContext";
import { Avatar } from "@mui/material";





const Header = (props) => {
  const { handleOpenSettingModal } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch: AppDispatch = useDispatch();
  const [userSignoutRequest, userSignoutResponse] = useUserSignoutMutation();
  const auth = useSelector((state: RootState) => state.auth);
  const {
    headerPosition,
    blur,
    playSound,
    modal: { open: SettingModalOpen },
  } = useSelector((state: RootState) => state.settings);
  const theme = useContext(ThemeContext);
  const handleLogoutUser = () => {
    userSignoutRequest({})
      .unwrap()
      .then((response) => {
        handleClose();
        dispatch(LogoutAction({}));
        dispatch(UnActiveWs());
        if (playSound) {
          soundPlay("sound7.wav");
        }
        navigate("/login");
        Toast(response.data.msg, false, true);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const [activeHeaderItem, setActiveHeaderItem] = useState({
    profile: false,
    home: false,
    settingModal: false,
    todos: false,
  });

  const handleActiveHeaderItem = () => {
    switch (window.location.pathname) {
      case ["/profile", "/login", "/signup", "/edit-profile"].find(
        (x) => x === window.location.pathname
      ):
        setActiveHeaderItem({
          profile: true,
          settingModal: false,
          home: false,
          todos: false,
        });
        break;

      case "/":
        setActiveHeaderItem({
          home: true,
          settingModal: false,
          profile: false,
          todos: false,
        });
        break;
      case "/todos":
        setActiveHeaderItem({
          home: false,
          settingModal: false,
          profile: false,
          todos: true,
        });

        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleActiveHeaderItem();
  }, [window.location.pathname]);

  useEffect(() => {
    if (SettingModalOpen) {
      setActiveHeaderItem({
        settingModal: true,
        home: false,
        profile: false,
        todos: false,
      });
    } else {
      handleActiveHeaderItem();
    }
  }, [SettingModalOpen]);

  const handleClickNavLink = (e) => {
    if (!auth.token) {
      e.preventDefault();
    }
  };

  return (
    <motion.header
      className={`App-header`}
      style={
        headerPosition === "left" || headerPosition === "right"
          ? {
              width: 70,
              zIndex: 9,
              flexDirection: "column",
              height: "100vh",
              ...(blur.head && { filter: `blur(${blur.size}px)` }),
            }
          : {
              height: 70,
              zIndex: 9,
              flexDirection: "row",
              width: "100vw",
              ...(blur.head && { filter: `blur(${blur.size}px)` }),
            }
      }
      initial={
        headerPosition === "top"
          ? { y: -100 }
          : headerPosition === "bottom"
          ? { y: 100 }
          : headerPosition === "left"
          ? { x: -100 }
          : headerPosition === "right"
          ? { x: 100 }
          : {}
      }
      animate={
        headerPosition === "top"
          ? { y: 0 }
          : headerPosition === "bottom"
          ? { y: 0 }
          : headerPosition === "left"
          ? { x: 0 }
          : headerPosition === "right"
          ? { x: 0 }
          : {}
      }
      transition={{ ease: "easeOut", duration: 0.3 }}
    >
      <Burger activeHeaderItem={activeHeaderItem} />

      <AiFillSetting
        className={activeHeaderItem.settingModal ? "active-header-item" : ""}
        style={
          !auth.token
            ? {
                color: pairColors(
                  "rgb(81 40 104 / 56%)",
                  "rgb(0, 48, 99)",
                  theme.isDarkMode
                ),
                cursor: "not-allowed",
                fontSize: "2rem",
                margin: "1rem",
              }
            : {
                cursor: "pointer",
                fontSize: "2rem",
                margin: "1rem",
                color:
                  !auth.token &&
                  pairColors(
                    "rgb(81 40 104 / 56%)",
                    "rgb(0, 48, 99)",
                    theme.isDarkMode
                  ),
              }
        }
        onClick={() => {
          if (auth.token) {
            handleOpenSettingModal();
          }
        }}
      />
      <NavLink className="header-link" to={"/"} onClick={handleClickNavLink}>
        <SiHomeassistant
          className={activeHeaderItem.home ? "active-header-item" : ""}
          style={
            !auth.token
              ? {
                  color: pairColors(
                    "rgb(81 40 104 / 56%)",
                    "rgb(0, 48, 99)",
                    theme.isDarkMode
                  ),
                  cursor: "not-allowed",
                }
              : {}
          }
        />
      </NavLink>
      <Box>
        {auth.me.picture.avatar ? (
          <Avatar
            onClick={handleClick}
            alt={
              auth.me?.picture?.avatar
                ? "user-profile-avatar"
                : auth.me.fname || auth.me.email
            }
            src={`${process.env.BACKEND_APP_BASE_URL_UPLOADS}/${auth.me?.picture?.avatar}`}
            sx={{
              width: 40,
              cursor: "pointer",
            }}
          />
        ) : (
          <FaUserAlt
            style={{
              cursor: "pointer",
            }}
            className={activeHeaderItem.profile ? "active-header-item" : ""}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          />
        )}

        {auth.token && auth.me.email ? (
          <Styled_Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <Styled_Menu_Item>
              <NavLink style={{ textDecoration: "none" }} to={"/profile"}>
                <Box className="d-flex-between">
                  <Box>Profile</Box>
                  <CgProfile style={{ padding: ".2rem", fontSize: "1.5rem" }} />
                </Box>
              </NavLink>
            </Styled_Menu_Item>

            <Styled_Menu_Item>
              <NavLink style={{ textDecoration: "none" }} to={"/edit-profile"}>
                <Box className="d-flex-between">
                  <Box>Edit Profile</Box>
                  <FiEdit style={{ padding: ".2rem", fontSize: "1.5rem" }} />
                </Box>
              </NavLink>
            </Styled_Menu_Item>

            <Styled_Menu_Item>
              <Box
                className="logout"
                style={{ textDecoration: "none" }}
                onClick={() => handleLogoutUser()}
              >
                <Box className="d-flex-between">
                  <Box className="logout-text">Logout</Box>
                  <RiLogoutCircleRLine
                    className="logout-text"
                    style={{ padding: ".2rem", fontSize: "1.5rem"  }}
                  />
                </Box>
              </Box>
            </Styled_Menu_Item>
          </Styled_Menu>
        ) : (
          <Styled_Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <Styled_Menu_Item>
              <NavLink style={{ textDecoration: "none" }} to={"/signup"}>
                <Box className="d-flex-between">
                  <Box>Signup</Box>
                  <BiLogInCircle
                    style={{ padding: ".2rem", fontSize: "1.5rem" }}
                  />
                </Box>
              </NavLink>
            </Styled_Menu_Item>

            <Styled_Menu_Item>
              <NavLink style={{ textDecoration: "none" }} to={"/login"}>
                <Box className="d-flex-between">
                  <Box>Login</Box>{" "}
                  <RiUserAddLine
                    style={{ padding: ".2rem", fontSize: "1.5rem" }}
                  />
                </Box>
              </NavLink>
            </Styled_Menu_Item>
          </Styled_Menu>
        )}
      </Box>
      <Outlet />
    </motion.header>
  );
};

export default Header;
