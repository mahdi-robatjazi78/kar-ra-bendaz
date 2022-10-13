import React, { useEffect, useState, useContext } from "react";
import Toast from "@utils/toast";
 
import ThemeContext from "@context/themeContext";
import { AppDataContext } from "@context/appDataContext";
import Axios from "@/services/api";
import Swal from "sweetalert2";

const ShowModalAddToCategory = (props) => {
  const { todo, setModalOpen } = props;
  const { blurFalse , getAllTodos ,updateCategoryOn } = useContext(AppDataContext);
 
  const theme = useContext(ThemeContext);

  const addToCategoryModal = async () => {
    try {
      const resp = await Axios.get("/category/getAll");
      const allCategories = resp.data.list;

      const selectedCategoryIndex = await Swal.fire({
        title: "Select a category",
        input: "select",
        inputOptions: allCategories.map((item) => item.title),
        inputPlaceholder: "Category List",
        showCancelButton: true,
        showCloseButton: true,
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
      });

      console.log("after", allCategories, selectedCategoryIndex);

      if (selectedCategoryIndex.value) {
        await Axios.put("/todos/add-to-category", {
          todoId: todo._id,
          categoId: allCategories[selectedCategoryIndex.value].uuid,
        });
        updateCategoryOn();
        getAllTodos()
      }

      setModalOpen({ status: false, modal: "" });
      blurFalse();
    } catch (error) {
      console.log(error);
      console.log(error?.response);
      setModalOpen({ status: false, modal: "" });
      blurFalse();
    }
  };

  useEffect(() => {
    addToCategoryModal();
  }, []);

  return <></>;
};

export default ShowModalAddToCategory;
