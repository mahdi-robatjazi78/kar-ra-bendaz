import React, { useContext } from "react";
import DarkLight from "./mini/darkLight";
import { FaUserAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { BiLogInCircle } from "react-icons/bi";
import { RiUserAddLine, RiLogoutCircleRLine } from "react-icons/ri";
import { SiHomeassistant } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
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
import { soundPlay } from "@/util/funcs";
import { useUserSignoutMutation } from "@/redux/api/user";
import { UnActiveWs } from "@/redux/features/todoPageConfigSlice";

const Header = (props) => {
  const { handleOpenSettingModal } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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
  const { headerPosition, blur, playSound } = useSelector(
    (state: RootState) => state.settings
  );

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
      <Burger />

      <AiFillSetting
        style={{ cursor: "pointer", fontSize: "2rem", margin: "1rem" }}
        onClick={() => {
          handleOpenSettingModal();
        }}
      />
      <NavLink className="header-link" to={"/"}>
        <SiHomeassistant />
      </NavLink>
      <Box>
        <FaUserAlt
          fontSize="1.6rem"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        />

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
                  <Box>Logout</Box>
                  <RiLogoutCircleRLine
                    style={{ padding: ".2rem", fontSize: "1.5rem" }}
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
                  <Box>Register</Box>
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
