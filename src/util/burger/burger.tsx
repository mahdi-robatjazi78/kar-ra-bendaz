import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarContext } from "../../context/sidebarContext";



import "./burgerStyles.css";
const Burger = () => {
  const { setOpenSidebar, setCloseSidebar ,open} = useContext(SidebarContext);
  const [op, setOpen] = useState(open === "show" ? true : false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (op) {
      setCloseSidebar();
    } else {
      setOpenSidebar();
    }
  }, [op]);

  return (
    <div
      id="container-burger"
      onClick={() => {
        if(location.pathname !== "/todos"){
          navigate("/todos");
        }
        setOpen(!op);
      }}
    >
      <div id="nav-icon3" className={op ? "open" : ""}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Burger;
