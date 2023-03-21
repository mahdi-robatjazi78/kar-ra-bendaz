import React, { useEffect, useContext } from "react";
import Toast from "@utils/toast";
import withReactContent from "sweetalert2-react-content";
import ThemeContext from "@context/themeContext";
import { AppDataContext } from "@context/appDataContext";
import Axios from "@/services/api";
import Swal from "sweetalert2";
import {
  useStoreNewCategoryMutation,
} from "@/redux/api/categories";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { deactiveBlur, setBlurPage } from "@/redux/features/settingSlice";

const ShowModalNewCategory = (props) => {
  const MySwal = withReactContent(Swal);
  const {
    showAddCategoryModal,
    setShowAddCategoryModal,
    UpdateOnlyCategories,
  } = props;
  const theme = useContext(ThemeContext);
  const dispatch: AppDispatch = useDispatch();

  const {
    active_ws: { id: ActiveWorkspaceID },
  } = useSelector((state: RootState) => state.todoPageConfig);

  const [
    storeNewCategory,
    storeNewCategoryResponse,
  ] = useStoreNewCategoryMutation();
  const submitNewCategory = (title: String) => {
      storeNewCategory({ title, ws: ActiveWorkspaceID }).unwrap().then((resp)=>{
        Toast(resp?.msg);
        UpdateOnlyCategories();
        dispatch(deactiveBlur());
        setShowAddCategoryModal({
          show: false,
          state: "add",
          prevText: "",
        });
      }).catch(error=>{

      });
  };

  useEffect(() => {
    ShowAddCategoryModal();
  }, []);

  const ShowAddCategoryModal = async () => {
    dispatch(setBlurPage());
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
          popup: theme.isDarkMode
            ? "Modal_DrakMode CategoryCreateEditModal"
            : "Modal_LightMode CategoryCreateEditModal",
          title: theme.isDarkMode
            ? "Modal_TitleBar_Dark"
            : "Modal_TitleBar_Light",
          confirmButton: "Modal_Confirm_Button",
          cancelButton: "Modal_Cancel_Button",
          footer: "Modal_Footer",
          input: theme.isDarkMode ? "Modal_Input_Dark" : "Modal_Input_Light",
        },
        showCancelButton: true,
        inputAttributes: {
          autocapitalize: "off",
        },

        preConfirm(inputValue) {
          submitNewCategory(inputValue);
        },

        showCloseButton: true,
        confirmButtonText: "Ok",
        showLoaderOnConfirm: true,

        allowOutsideClick: () => !Swal.isLoading(),
      });
      dispatch(deactiveBlur());
      setShowAddCategoryModal({
        show: false,
        state: "add",
        prevText: "",
      });
      // listenToInputModal();
    } catch (error) {
      console.log(error);
      dispatch(deactiveBlur());

      setShowAddCategoryModal({
        show: false,
        state: "add",
        prevText: "",
      });
    }
  };

  return <></>;
};

export default ShowModalNewCategory;
