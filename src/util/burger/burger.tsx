import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  OpenSidebar,
  CloseSidebar,
} from "@/redux/features/todoPageConfigSlice";

import "./burgerStyles.css";
import { RootState } from "@/redux/store";

const Burger = () => {
  const dispatch = useDispatch();
  const { sidebar_open: open } = useSelector(
    (state: RootState) => state.todoPageConfig
  );

  const [op, setOpen] = useState(open);

  const location = useLocation();
  const navigate = useNavigate();

  const handleClickBurger = () => {
    if (location.pathname !== "/todos") {
      dispatch(OpenSidebar());
      navigate("/todos");
    } else {
      dispatch(CloseSidebar());
    }

    if (!open) {
      dispatch(OpenSidebar());
      setOpen(true);
    } else {
      dispatch(CloseSidebar());
    }
  };

  useEffect(() => {
    if (window.location.pathname !== "/todos" && open) {
      dispatch(CloseSidebar());
    }
  }, [window.location.pathname]);

  return (
    <div id="container-burger" onClick={handleClickBurger}>
      <div id="nav-icon3" className={open ? "open" : ""}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Burger;
