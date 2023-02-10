import React, { useEffect, useState, useContext } from "react";
import Toast from "@utils/toast";
import withReactContent from "sweetalert2-react-content";
import ThemeContext from "@context/themeContext";
import { AppDataContext } from "@context/appDataContext";
import Axios from "@/services/api";
import Swal from "sweetalert2";

const ShowModalNewCategory = (props) => {
  const MySwal = withReactContent(Swal);
  const {
    showAddCategoryModal,
    setShowAddCategoryModal,
    userSelectedCategory,
    getSelectedCategoryData    
} = props;
  const theme = useContext(ThemeContext);
  const { selected, getAllTodos, blurFalse, updateCategoryOn, blurTrue } =
    useContext(AppDataContext);
    const {selectedWorkspace} = useContext(AppDataContext)

  const submitNewCategory = async (title) => {
    try {
      const response = await Axios.post("/category/new", { title , ws:selectedWorkspace.id });
      Toast(response.data.msg);
      updateCategoryOn();
    } catch (error) {
      console.log(error.response);
      Toast(error.response.data.msg, false);
    }
  };

  const editCategoryName = async (title) => {
    try {
      console.log("userSelectedCategory , ", userSelectedCategory);

      const response = await Axios.put("/category/editname", {
        uuid: userSelectedCategory.category.uuid,
        newTitle: title,
      });
      Toast(response.data.msg);
      updateCategoryOn();
      getSelectedCategoryData();
    } catch (error) {
      console.log(error.response);
      Toast("Something went wrong", false);
    }
  };

  const ShowAddCategoryModal = async () => {
    blurTrue();
    try {
      const result = await MySwal.fire({
        title:
          showAddCategoryModal.state === "edit"
            ? "Edit Category Name"
            : "New Category",
        input: "text",
        inputPlaceholder:
          showAddCategoryModal.state === "edit"
            ? showAddCategoryModal.prevText
            : "",
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
        showCancelButton: true,
        inputAttributes: {
          autocapitalize: "off",
        },

        preConfirm(inputValue) {
          showAddCategoryModal.state === "add"
            ? submitNewCategory(inputValue)
            : editCategoryName(inputValue);

          blurFalse();
          setShowAddCategoryModal({
            show: false,
            state: "add",
            prevText: "",
          });
        },

        showCloseButton: true,
        confirmButtonText: "Ok",
        showLoaderOnConfirm: true,

        allowOutsideClick: () => !Swal.isLoading(),
      });
      blurFalse();
      setShowAddCategoryModal({
        show: false,
        state: "add",
        prevText: "",
      });
      // listenToInputModal();
    } catch (error) {
      console.log(error);
      blurFalse();
      setShowAddCategoryModal({
        show: false,
        state: "add",
        prevText: "",
      });
    }
  };
  useEffect(() => {
    ShowAddCategoryModal();
  }, []);

  return <></>;
};

export default ShowModalNewCategory;
