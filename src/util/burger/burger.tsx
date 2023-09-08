import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  OpenSidebar,
  CloseSidebar,
} from "@/redux/features/todoPageConfigSlice";
import "./burgerStyles.css";
import { RootState } from "@/redux/store";
import { pairColors, soundPlay } from "../funcs";
import Toast from "../toast";
import ThemeContext from "@context/themeContext";

const Burger = (props: any) => {
  const { activeHeaderItem } = props;
  const dispatch = useDispatch();
  const { sidebar_open: open, active_ws: activeWs } = useSelector(
    (state: RootState) => state.todoPageConfig
  );
  const { playSound } = useSelector((state: RootState) => state.settings);
  const auth = useSelector((state: RootState) => state.auth);
  const theme = useContext(ThemeContext);
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
          "⛔"
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
      <div
        id="nav-icon3"
        className={open ? "open" : ""}
        style={!auth.token ? { cursor: "not-allowed" } : { cursor: "pointer" }}
      >
        <span
          style={
            !auth.token
              ? {
                  backgroundColor: pairColors(
                    "rgb(81 40 104 / 56%)",
                    "rgb(0, 48, 99)",
                    theme.isDarkMode
                  ),
                }
              : {}
          }
          className={activeHeaderItem.todos && auth.token ? "burgerActive" : ""}
        ></span>
        <span
          style={
            !auth.token
              ? {
                  backgroundColor: pairColors(
                    "rgb(81 40 104 / 56%)",
                    "rgb(0, 48, 99)",
                    theme.isDarkMode
                  ),
                }
              : {}
          }
          className={activeHeaderItem.todos && auth.token ? "burgerActive" : ""}
        ></span>
        <span
          style={
            !auth.token
              ? {
                  backgroundColor: pairColors(
                    "rgb(81 40 104 / 56%)",
                    "rgb(0, 48, 99)",
                    theme.isDarkMode
                  ),
                }
              : {}
          }
          className={activeHeaderItem.todos && auth.token ? "burgerActive" : ""}
        ></span>
        <span
          style={
            !auth.token
              ? {
                  backgroundColor: pairColors(
                    "rgb(81 40 104 / 56%)",
                    "rgb(0, 48, 99)",
                    theme.isDarkMode
                  ),
                }
              : {}
          }
          className={activeHeaderItem.todos && auth.token ? "burgerActive" : ""}
        ></span>
      </div>
    </div>
  );
};

export default Burger;
