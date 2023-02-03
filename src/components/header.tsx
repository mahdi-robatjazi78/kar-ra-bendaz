import React, { useContext } from "react";
import DarkLight from "./darkLight";
import { FaUserAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { BiLogInCircle } from "react-icons/bi";
import { RiUserAddLine, RiLogoutCircleRLine } from "react-icons/ri";
import { SiHomeassistant } from "react-icons/si";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { base_url } from "@services/api";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { SidebarContext } from "../context/sidebarContext";
import Toast from "../util/toast";
import Burger from "../util/burger/burger";
import { AppDataContext } from "@/context/appDataContext";
import { motion } from "framer-motion";
const Header = ({ ShowBurger, setShowBurger }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [showSidebar, setShowSidebar] = React.useState<boolean>(true);
  const user = JSON.parse(localStorage.getItem("user"));

  const { setToggleSidebar, setOpenSidebar, setCloseSidebar } = useContext(
    SidebarContext
  );
  const { headerPosition } = useContext(AppDataContext);

  const handleLogoutUser = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await axios.put(`${base_url}/users/logout`, {
        email: user.email,
      });
      console.log("response logout", response);
      if (response.status === 200) {
        localStorage.removeItem("user");
        navigate("/login");
        Toast(response.data.msg);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <motion.header
      className="App-header"
      style={
        headerPosition === "left" || headerPosition === "right"
          ? {
              width: 70,
              flexDirection: "column",
              height:"100vh"
            }
          : {
              height: 70,
              flexDirection: "row",
              width:"100vw"
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

      <DarkLight />
      <NavLink className="header-link" to={"/"}>
        <SiHomeassistant
          onClick={() => {
            setShowBurger(true);
          }}
        />
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

        {user && user.email ? (
          <Menu
            id="user-profile-icon-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem style={{ width: "15rem", display: "block" }}>
              <NavLink
                style={{ color: "black", textDecoration: "none" }}
                to={"/profile"}
              >
                <Box display="flex" justifyContent="space-between">
                  <Box>Profile</Box>
                  <CgProfile style={{ padding: ".2rem", fontSize: "1.5rem" }} />
                </Box>
              </NavLink>
            </MenuItem>

            <MenuItem style={{ width: "15rem", display: "block" }}>
              <NavLink
                style={{ color: "black", textDecoration: "none" }}
                to={"/edit-profile"}
              >
                <Box display="flex" justifyContent="space-between">
                  <Box>Edit Profile</Box>
                  <FiEdit style={{ padding: ".2rem", fontSize: "1.5rem" }} />
                </Box>
              </NavLink>
            </MenuItem>

            <MenuItem style={{ width: "15rem", display: "block" }}>
              <Box
                style={{ color: "black", textDecoration: "none" }}
                onClick={() => handleLogoutUser()}
              >
                <Box display="flex" justifyContent="space-between">
                  <Box>Logout</Box>
                  <RiLogoutCircleRLine
                    style={{ padding: ".2rem", fontSize: "1.5rem" }}
                  />
                </Box>
              </Box>
            </MenuItem>
          </Menu>
        ) : (
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem style={{ width: "15rem", display: "block" }}>
              <NavLink
                style={{ color: "black", textDecoration: "none" }}
                to={"/signup"}
              >
                <Box display="flex" justifyContent="space-between">
                  <Box>Register</Box>
                  <BiLogInCircle
                    style={{ padding: ".2rem", fontSize: "1.5rem" }}
                  />
                </Box>
              </NavLink>
            </MenuItem>

            <MenuItem style={{ width: "15rem", display: "block" }}>
              <NavLink
                style={{ color: "black", textDecoration: "none" }}
                to={"/login"}
              >
                <Box display="flex" justifyContent="space-between">
                  <Box>Login</Box>{" "}
                  <RiUserAddLine
                    style={{ padding: ".2rem", fontSize: "1.5rem" }}
                  />
                </Box>
              </NavLink>
            </MenuItem>
          </Menu>
        )}
      </Box>
      <Outlet />
    </motion.header>
  );
};

export default Header;
