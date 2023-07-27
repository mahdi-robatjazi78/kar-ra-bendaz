import React, { useEffect, useState, useContext } from "react";
import Toast from "@utils/toast";
import { useDispatch } from "react-redux";
import ThemeContext from "@context/themeContext";
import Swal from "sweetalert2";
import { DrawerClose } from "@/redux/features/todoPageConfigSlice";
const ShowModalDelete = (props) => {
  const { todo, setModalOpen, DeleteTodoOperation } = props;
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const deleteModal = async () => {
    try {
      const result = await Swal.fire({
        icon: "warning",
        title: "Are you Sure ?",
        text: "Do you Want Remove This Todo 😯",
        confirmButtonText: "Delete",
        confirmButtonColor: "red",
        showCancelButton: true,
        showCloseButton: true,
        customClass: {
          icon: "dark_icon",
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
      if (result.isConfirmed) {
        DeleteTodoOperation();
        dispatch(DrawerClose());
      }

      setModalOpen({ status: false, modal: "" });
      // blurFalse()
    } catch (error) {
      console.log(error);
      // blurFalse()
    }
  };

  useEffect(() => {
    deleteModal();
  }, []);

  return <></>;
};

export default ShowModalDelete;
