import React, { useEffect, useState, useContext } from "react";
import Toast from "@utils/toast";
import withReactContent from "sweetalert2-react-content";
import ThemeContext from "@context/themeContext";
import { AppDataContext } from "@context/appDataContext";
import Axios from "@/services/api";
import Swal from "sweetalert2";

const ShowModalNewTodo = (props) => {
  const MySwal = withReactContent(Swal);
  const { setShowModalAddTodo } = props;

  const theme = useContext(ThemeContext);
  const { selected, getAllTodos, blurFalse, updateCategoryOn, blurTrue } =
    useContext(AppDataContext);

  const getInformationOfCategory = async (selectedCategoryId) => {
    try {
      const result = await Axios.get(
        `/category/getInfo?uuid=${selectedCategoryId}`
      );
      console.log(result.data.category.title);
      return result.data.category.title;
    } catch (error) {
      console.log(error);
    }
  };

  const Submit = async (newTask, intoCategory = false) => {
    try {
      const response = await Axios.post("/todos/newTodo", {
        todo: newTask,
        ...(intoCategory && { categoId: selected }),
      });
      console.log(response);
      getAllTodos(); 
      Toast(response.data.msg);
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.log(error.response);
        Toast(error.response.msg, false);
      }
    }
  };

  const ShowAddTaskModal = async () => {
    try {
      let categoryTitle = "";
      if (selected !== "other") {
        categoryTitle = await getInformationOfCategory(selected);
      }

      blurTrue();

      const { value: text } = await MySwal.fire({
        customClass: {
          popup: theme.isDarkMode ? "Modal_DrakMode" : "Modal_LightMode",
          title: theme.isDarkMode
            ? "Modal_TitleBar_Dark"
            : "Modal_TitleBar_Light",
          confirmButton: theme.isDarkMode
            ? "Modal_Confirm_Button_Dark"
            : "Modal_Confirm_Button_Light",
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
        html:
          selected !== "other"
            ? `<div><input type="checkbox" checked=true  id="Selected-Category-Id" /> <label>${categoryTitle}</label> </div>`
            : null,

        inputValue: "",
        showCancelButton: true,
      });

      console.log("text", text);

      if (text != undefined) {
        const selectedCategoryElement: HTMLInputElement =
          document.querySelector("#Selected-Category-Id");
        if (
          !selectedCategoryElement ||
          selectedCategoryElement.checked == false
        ) {
          Submit(text, false);
        } else if (
          selectedCategoryElement &&
          selectedCategoryElement.checked == true
        ) {
          Submit(text, true);
        }

        blurFalse();
        setShowModalAddTodo(false);
      } else {
        blurFalse();
        setShowModalAddTodo(false);
      }
    } catch (error) {
      console.log(error);
      blurFalse();
      setShowModalAddTodo(false);
    }
  };

  useEffect(() => {
    ShowAddTaskModal();
  }, []);

  return <></>;
};

export default ShowModalNewTodo;