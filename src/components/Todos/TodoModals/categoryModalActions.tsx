import React , {useState ,useEffect, useContext} from 'react'
import Toast from "@utils/toast";
import withReactContent from "sweetalert2-react-content";
import ThemeContext from "@context/themeContext";
import { AppDataContext } from "@context/appDataContext";
import Axios from "@/services/api";
import Swal from "sweetalert2";



const CategoryModalActions = (props)  =>{

    const {userSelectedCategory ,setShowAddCategoryModal,setShowCategoryModalActions} = props
    const MySwal = withReactContent(Swal);
    const { blurFalse,blurTrue, getAllTodos, updateCategoryOn, todoList,newCategorySelected, selected , selectedWorkspace } =
      useContext(AppDataContext);
  
    const theme = useContext(ThemeContext);



  const ShowModal = async () => {
    try {
      blurTrue();
      const result = await MySwal.fire({
        title: userSelectedCategory.category.title,
        showCloseButton: true,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Edit Name",
        denyButtonText: "Delete",
        cancelButtonText: "Edit Todos",

        customClass: {
          popup: theme.isDarkMode ? "Modal_DrakMode" : "Modal_LightMode",
          title: theme.isDarkMode
            ? "Modal_TitleBar_Dark"
            : "Modal_TitleBar_Light",
          confirmButton: theme.isDarkMode
            ? "Modal_Confirm_Button_Dark Half_Width"
            : "Modal_Confirm_Button_Light Half_Width",
          cancelButton: theme.isDarkMode
            ? "Modal_Cancel_Button_Dark_Center Half_Width"
            : "Modal_Cancel_Button_Light_Center Half_Width",
          footer: "Modal_Footer_With_Spacer",
          input: theme.isDarkMode ? "Modal_Input_Dark" : "Modal_Input_Light",
          htmlContainer: theme.isDarkMode
            ? "Modal_Html_Container_Dark"
            : "Modal_Html_Container_Light",
          denyButton: "Modal_Deny_Button Half_Width",
        },

        html: `
        
       
          <div class=${
            theme.isDarkMode
              ? "Modal_Html_infoBox_Dark"
              : "Modal_Html_infoBox_Light"
          }>
            <div>
              Todo Count 
            </div>
            <div>
            ${userSelectedCategory.task_count}
            </div>
          </div>
          <div  class=${
            theme.isDarkMode
              ? "Modal_Html_infoBox_Dark"
              : "Modal_Html_infoBox_Light"
          }>
            <div>
              Is Done Todo
            </div>
            <div>
            ${userSelectedCategory.isDone_tasks_count}
            </div>
          </div>
          <div  class=${
            theme.isDarkMode
              ? "Modal_Html_infoBox_Dark"
              : "Modal_Html_infoBox_Light"
          }>
            <div>
              Is Expire
            </div>
            <div>
              ?
            </div>
          </div>

   
        `,
      });

      if (typeof result.dismiss === "string" && result.isDismissed) {
        if (result.dismiss === "cancel") {
          await MySwal.fire({
            title: "Exit Todos from Category",
            showCloseButton: true,
            html: `
              <div id="exit-todos-modal">
            ${todoList
              .map(
                (item) =>
                  ` <div class="form-check">
                <input class="form-check-input-task" type="checkbox" id=${
                  item._id
                } />
                <label class="form-check-label" for=${item._id}>
                  ${
                    item.body.length < 30
                      ? item.body
                      : item.body.slice(0, 30) + "..."
                  }
                </label>
              </div>`
              )
              .join("")}
            </div>`,
            focusConfirm: false,
            preConfirm: () => {
              const list = document.getElementsByClassName(
                "form-check-input-task"
              ) as HTMLCollectionOf<HTMLElement>;
              const ArrayListCheckbox = Array.from(list);

              const selectedTodosForExitOfCategory = [];

              for (const checkbox of ArrayListCheckbox) {
                const checkboxElement = checkbox as HTMLInputElement;
                if (checkboxElement.checked) {
                  selectedTodosForExitOfCategory.push(checkboxElement.id);
                }
              }

              console.log(
                "selectedTodosForExitOfCategory",
                selectedTodosForExitOfCategory
              );

              if (selectedTodosForExitOfCategory.length) {
                Axios.put("/todos/exit-from-category", {
                  todos: selectedTodosForExitOfCategory,
                  category: userSelectedCategory.category.uuid,
                }).then((response) => { 
                  getAllTodos(selected);
                  Toast(response.data.msg);
                });
              }
            },
            showCancelButton: true,
            customClass: {
              popup: theme.isDarkMode ? "Modal_DrakMode" : "Modal_LightMode",
              title: theme.isDarkMode
                ? "Modal_TitleBar_Dark"
                : "Modal_TitleBar_Light",
              confirmButton: theme.isDarkMode
                ? "Modal_Confirm_Button_Dark Half_Width"
                : "Modal_Confirm_Button_Light Half_Width",
              cancelButton: "Modal_Cancel_Button",
              footer: "Modal_Footer_With_Spacer",
              // input: theme.isDarkMode
              //   ? "Modal_Radio_Container_Dark"
              //   : "Modal_Radio_Container_Light",
              denyButton: "Modal_Deny_Button Half_Width",
            },
          });
        }
      }

      const inputOptions = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            onlyCategory: "Remove Category Only",
            withAllTodos: "Remove The Category And Clear All The Tasks In It",
          });
        }, 10);
      });

      if (result.isDenied) {
        const { value: option } = await MySwal.fire({
          title: "Delete Category", 
          showCloseButton: true,
          showCancelButton: true,
          input: "radio",
          inputOptions: inputOptions,
          inputValidator: (value) => {
            if (!value) {
              return "You need to choose something!";
            }
          },
          customClass: {
            popup: theme.isDarkMode ? "Modal_DrakMode" : "Modal_LightMode",
            title: theme.isDarkMode
              ? "Modal_TitleBar_Dark"
              : "Modal_TitleBar_Light",
            confirmButton: theme.isDarkMode
              ? "Modal_Confirm_Button_Dark Half_Width"
              : "Modal_Confirm_Button_Light Half_Width",
            cancelButton: "Modal_Cancel_Button",
            footer: "Modal_Footer_With_Spacer",
            input: theme.isDarkMode
              ? "Modal_Radio_Container_Dark"
              : "Modal_Radio_Container_Light",
            denyButton: "Modal_Deny_Button Half_Width",
          },
        });

        if (option) {

          if (option === "onlyCategory") {
            const response = await Axios.delete(
              `/category/deleteOnlyCategory?id=${userSelectedCategory.category.uuid}&ws=${selectedWorkspace.id}`
            );
            updateCategoryOn();
            newCategorySelected();
            Toast(response.data.msg);
          } else if (option === "withAllTodos") {
            const response = await Axios.delete(
              `/category/deleteCategoryWithTodos?id=${userSelectedCategory.category.uuid}&ws=${selectedWorkspace.id}`
            );
            updateCategoryOn();
            newCategorySelected();
            Toast(response.data.msg);
          }
        }
      }

      if (result.isConfirmed) {
        // await MySwal.fire({
        //   title: "Edit Category Name",
        //   input: "text",
        //   inputPlaceholder: userSelectedCategory.category.title,
        //   customClass: {
        //     popup: theme.isDarkMode ? "Modal_DrakMode" : "Modal_LightMode",
        //     title: theme.isDarkMode
        //       ? "Modal_TitleBar_Dark"
        //       : "Modal_TitleBar_Light",
        //     confirmButton: theme.isDarkMode
        //       ? "Modal_Confirm_Button_Dark"
        //       : "Modal_Confirm_Button_Light",
        //     cancelButton: "Modal_Cancel_Button",
        //     footer: "Modal_Footer",
        //     input: theme.isDarkMode ? "Modal_Input_Dark" : "Modal_Input_Light",
        //   },
        //   showCancelButton: true,
        //   inputAttributes: {
        //     autocapitalize: "off",
        //   },

        //   preConfirm(inputValue) {
        //     // editCategoryName(inputValue);

            setShowAddCategoryModal({
                show:true,
                state:"edit",
                prevText:userSelectedCategory.category.title   
            })

        //   },
        //   showCloseButton: true,
        //   confirmButtonText: "Ok",
        //   showLoaderOnConfirm: true,

        //   allowOutsideClick: () => !Swal.isLoading(),
        // });
        // listenToInputModal();
      }
      setShowCategoryModalActions(false)
      blurFalse();
    } catch (error) {
        console.log(error);
        blurFalse();
    }
  };

    useEffect(()=>{ShowModal()}, [])
    return (<></>)

}
export default CategoryModalActions