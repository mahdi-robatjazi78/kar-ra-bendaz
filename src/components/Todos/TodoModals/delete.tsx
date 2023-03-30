import React, { useEffect, useState, useContext } from "react";
import Toast from "@utils/toast";
import { useDispatch } from "react-redux";
import ThemeContext from "@context/themeContext";
import { AppDataContext } from "@context/appDataContext";
import Swal from "sweetalert2";
import { DrawerClose } from "@/redux/features/todoPageConfigSlice";




const ShowModalDelete = (props) => {
  const {todo, setModalOpen , DeleteTodoOperation } = props;
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch()



  const deleteModal = async () => {
    try {
      const result = await Swal.fire({
        icon: "warning",
        title: "Are you Sure ?",
        text: "Do you Want Remove This Todo 😯",
        confirmButtonText: "Yes Delete It...",
        confirmButtonColor: "red",
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
      if (result.isConfirmed) {
        DeleteTodoOperation()
        dispatch(DrawerClose())
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
