import React,{useContext} from "react";
import logo from "../logo.svg";
import DarkLight from "./darkLight";
import { FaUserAlt } from "react-icons/fa";
import { BiLogInCircle } from "react-icons/bi";
import { RiUserAddLine } from "react-icons/ri";
import { SiHomeassistant } from "react-icons/si";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink, Outlet } from "react-router-dom";
import { Box } from "@mui/system";
import {SidebarContext} from "../context/sidebarContext"

const Header = ({ isDarkMode, setIsDarkMode }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [showHome ,setShowHome] = React.useState<boolean>(false)
  const [showSidebar ,setShowSidebar] = React.useState<boolean>(false)


  const {setToggleSidebar ,setOpenSidebar ,setCloseSidebar} = useContext(SidebarContext)

  return (
    <header >
      <div className="App-header">
      {/* <img src={logo} className="App-logo" alt="logo" /> */}

      {
        (showHome && !showSidebar) && (
          <GiHamburgerMenu fontSize="2rem" onClick={()=>{
            setShowSidebar(true)
            setOpenSidebar()
          }}/>
        )
}{
        (showHome && showSidebar) && (  
          <IoMdClose fontSize="2rem" onClick={()=>{
            setShowSidebar(false)
            setCloseSidebar()
          }} />
        )
      }


      <DarkLight isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <NavLink style={{ color: "white" }} to={"/"}>
        <SiHomeassistant fontSize="2rem" onClick={()=>{
          setShowHome(true)
        }} />
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
                <BiLogInCircle style={{ padding: ".2rem" }} />
              </Box>
            </NavLink>
          </MenuItem>

          <MenuItem style={{ width: "15rem", display: "block" }}>
            <NavLink
              style={{ color: "black", textDecoration: "none" }}
              to={"/login"}
            >
              <Box display="flex" justifyContent="space-between">
                <Box>Login</Box> <RiUserAddLine style={{ padding: ".2rem" }} />
              </Box>
            </NavLink>
          </MenuItem>
        </Menu>
      </Box>
      <Outlet />
      </div>
    </header>
  );
};

export default Header;
