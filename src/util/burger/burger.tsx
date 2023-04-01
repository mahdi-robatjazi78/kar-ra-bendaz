import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
import { OpenSidebar , CloseSidebar } from "@/redux/features/todoPageConfigSlice";

import "./burgerStyles.css";
import { RootState } from "@/redux/store";

const Burger = () => {
  
  
  const dispatch = useDispatch()
  const {sidebar_open : open}  = useSelector((state:RootState)=>state.todoPageConfig)
  
  
  
  const [op, setOpen] = useState(open ? true : false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (op) {
      dispatch(CloseSidebar());
    } else {
      dispatch(OpenSidebar());
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
