import React, { useEffect, useState, useContext } from "react";
import Toast from "@utils/toast";
import withReactContent from "sweetalert2-react-content";
import ThemeContext from "@context/themeContext";
import { AppDataContext } from "@context/appDataContext";
import Axios from "@/services/api";
import Swal from "sweetalert2";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { deactiveBlur, setBlurPage } from "@/redux/features/settingSlice";
import { useStoreNewTodoMutation } from "@/redux/api/todos";
import { useSelector } from "react-redux";

const ShowModalNewTodo = (props) => {
  const MySwal = withReactContent(Swal);
  const { setShowModalAddTodo, UpdateTodoAndCategories } = props;
  const dispatch: AppDispatch = useDispatch();
  const theme = useContext(ThemeContext);
  const {
    active_ws: { id: ActiveWorkspaceID },
    active_category: { id: ActiveCategoryID, title: ActiveCategoryTitle },
  } = useSelector((state: RootState) => state.todoPageConfig);
  const [storeNewTodo, respStoreNewTodo] = useStoreNewTodoMutation();

  const SubmitNewTodo = (todo, intoCategory = false) => {
    storeNewTodo({
      todo,
      ws: ActiveWorkspaceID,
      ...(intoCategory && { categoId: ActiveCategoryID }),
    })
      .then((resp) => {
        Toast(resp.data.msg, true, true, "📝");
        UpdateTodoAndCategories();
      })
      .catch(() => {});
  };

  const ShowAddTaskModal = async () => {
    try {
      dispatch(setBlurPage());
      let categoryTitle = ActiveCategoryTitle;

      const { value: text } = await MySwal.fire({
        customClass: {
          popup: theme.isDarkMode ? "Modal_DrakMode" : "Modal_LightMode",
          title: theme.isDarkMode
            ? "Modal_TitleBar_Dark"
            : "Modal_TitleBar_Light",
          confirmButton: "Modal_Confirm_Button",
          cancelButton: "Modal_Cancel_Button",
          footer: "Modal_Footer",
          input: theme.isDarkMode ? "Modal_Input_Dark" : "Modal_Input_Light",
        },
        input: "textarea",
        title: "New Todo",
        inputPlaceholder: "Type your new todo and press Ctrl + Enter",

        inputAttributes: {
          "aria-label": "Type your message here",
        },
        html: ActiveCategoryTitle
          ? `<div><input type="checkbox" checked=true  id="Selected-Category-Id" /> <label>${categoryTitle}</label> </div>`
          : null,

        inputValue: "",
        showCancelButton: true,
      });

      if (text != undefined) {
        const selectedCategoryElement: HTMLInputElement = document.querySelector(
          "#Selected-Category-Id"
        );
        if (
          !selectedCategoryElement ||
          selectedCategoryElement.checked == false
        ) {
          SubmitNewTodo(text, false);
        } else if (
          selectedCategoryElement &&
          selectedCategoryElement.checked == true
        ) {
          SubmitNewTodo(text, true);
        }

        dispatch(deactiveBlur());
        setShowModalAddTodo(false);
      } else {
        dispatch(deactiveBlur());
        setShowModalAddTodo(false);
      }
    } catch (error) {
      console.log(error);
      dispatch(deactiveBlur());
      setShowModalAddTodo(false);
    }
  };

  useEffect(() => {
    ShowAddTaskModal();
  }, []);

  return <></>;
};

export default ShowModalNewTodo;
