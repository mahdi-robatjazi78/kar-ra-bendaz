import React, { useEffect, useContext } from "react";
import Toast from "@utils/toast";
import withReactContent from "sweetalert2-react-content";
import ThemeContext from "@context/themeContext";
import { AppDataContext } from "@context/appDataContext";
import Axios from "@/services/api";
import Swal from "sweetalert2";
import { useStoreNewCategoryMutation } from "@/redux/api/categories";
import { useLazyGetTodoIndexQuery } from "@/redux/api/todos";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {useDispatch} from 'react-redux'
import { deactiveBlur , setBlurPage } from "@/redux/features/settingSlice";


const ShowModalNewCategory = (props) => {
  const MySwal = withReactContent(Swal);
  const {
    showAddCategoryModal,
    setShowAddCategoryModal,
    userSelectedCategory,
    getSelectedCategoryData    
} = props;
  const theme = useContext(ThemeContext);
  const { selected, getAllTodos, updateCategoryOn ,selectedWorkspace} =useContext(AppDataContext);
  const dispatch : AppDispatch = useDispatch()


const [triggerGetTodoIndex , todosRequest] = useLazyGetTodoIndexQuery()
const {
  active_ws: { id: ActiveWorkspaceID, title: ActiveWorkspaceTitle },
  active_category: { id: ActiveCategoryID, title: ActiveCategoryTitle },
} = useSelector((state:RootState) => state.todoPageConfig);


  const [storeNewCategory, respStoreNewCategory] = useStoreNewCategoryMutation();
  const submitNewCategory = (title) => {
      storeNewCategory({ title ,  ws:ActiveWorkspaceID })
      .unwrap()
      .then((res) => {})
      .catch((err) => {})
  };



  useEffect(() => {
    // AFTER STORE CATEGORY REQUEST
    console.log("respStoreNewCategory   >>> > " ,respStoreNewCategory);
    if (respStoreNewCategory.isSuccess) {

      Toast(respStoreNewCategory.data.msg);
      triggerGetTodoIndex({wsID:ActiveWorkspaceID , categoryID:ActiveCategoryID})
    }
  }, [respStoreNewCategory.isSuccess]);





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
    dispatch(setBlurPage())
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
          popup: theme.isDarkMode ? "Modal_DrakMode CategoryCreateEditModal" : "Modal_LightMode CategoryCreateEditModal",
          title: theme.isDarkMode
            ? "Modal_TitleBar_Dark"
            : "Modal_TitleBar_Light",
          confirmButton:"Modal_Confirm_Button",
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

          dispatch(deactiveBlur())
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
      dispatch(deactiveBlur())
      setShowAddCategoryModal({
        show: false,
        state: "add",
        prevText: "",
      });
      // listenToInputModal();
    } catch (error) {
      console.log(error);
      dispatch(deactiveBlur())

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
