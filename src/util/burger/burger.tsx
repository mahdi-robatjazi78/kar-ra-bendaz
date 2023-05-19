import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  OpenSidebar,
  CloseSidebar,
} from "@/redux/features/todoPageConfigSlice";
import "./burgerStyles.css";
import { RootState } from "@/redux/store";
import { soundPlay } from "../funcs";
import Toast from "../toast";

const Burger = () => {
  const dispatch = useDispatch();
  const { sidebar_open: open, active_ws: activeWs } = useSelector(
    (state: RootState) => state.todoPageConfig
  );
  const { playSound } = useSelector((state: RootState) => state.settings);

  const [op, setOpen] = useState(open);

  const location = useLocation();
  const navigate = useNavigate();

  const handleClickBurger = () => {
    if (location.pathname !== "/todos") {
      if (activeWs?.id) {
        dispatch(OpenSidebar());

        if (playSound) {
          soundPlay("sound8.wav");
        }

        navigate("/todos");
      } else {
        Toast(
          "Please first select a workspace then go to todo page",
          true,
          true,
          "⚠"
        );
        return;
      }
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
