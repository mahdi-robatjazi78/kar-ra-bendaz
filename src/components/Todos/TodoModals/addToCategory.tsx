import React, { useEffect, useState, useContext } from "react";
import ThemeContext from "@context/themeContext";
import Swal from "sweetalert2";
import { deactiveBlur, setBlurPage } from "@/redux/features/settingSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

const ShowModalAddToCategory = (props) => {
  const { CategoryList, setModalOpen, HandleTodoAssignToCategory } = props;

  const theme = useContext(ThemeContext);

  const dispatch: AppDispatch = useDispatch();
  const addToCategoryModal = async () => {
    try {
      const allCategories = CategoryList;

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
          confirmButton: "Modal_Confirm_Button",
          cancelButton: "Modal_Cancel_Button",
          footer: "Modal_Footer",
          input: theme.isDarkMode ? "Modal_Input_Dark" : "Modal_Input_Light",
        },
      });

      if (selectedCategoryIndex.value) {
        const categoId = allCategories[selectedCategoryIndex.value].uuid;
        HandleTodoAssignToCategory(categoId);
        dispatch(deactiveBlur());
      }

      setModalOpen({ status: false, modal: "" });
    } catch (error) {
      setModalOpen({ status: false, modal: "" });
    }
  };

  useEffect(() => {
    addToCategoryModal();
    // setDrawerState({
    //   open: false,
    //   item: {},
    //   state: "",
    // });
  }, []);

  return <></>;
};

export default ShowModalAddToCategory;
