import React, { useState, useEffect, useContext } from "react";
import { Box, Tooltip } from "@mui/material";
import ThemeContext from "../../context/themeContext";
import { CgList } from "react-icons/cg";
import { MdDoneOutline } from "react-icons/md";
import { FiColumns } from "react-icons/fi";
import { FaRegSquare, FaRegPlusSquare } from "react-icons/fa";
import { BsTable, BsInfoSquare } from "react-icons/bs";
import Axios from "../../services/api";
import { TodoContext } from "../../context/todoContext";
import { UpdateCategory } from "../../context/updatationContext";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Toast from "../../util/toast";
import { SelectedCategoryContext } from "../../context/selectCategoryContext";
import "../../styles/modalStyles.css";

const MySwal = withReactContent(Swal);

const SettingBar = ({ showAddCategoModalKeyboard, userSelectedCategory ,getSelectedCategoryData,todoList , getAllTodos }) => {
  const theme = useContext(ThemeContext);
  const { selected, newCategorySelected } = useContext(SelectedCategoryContext);
  const {
    show,
    setThreeColAll,
    setThreeColDone,
    setOneColAll,
    setOneColDone,
    setTableAll,
    setTableDone,
  } = useContext(TodoContext);

  type ITodoState = "all" | "done";
  const [todoState, setTodoState] = useState<ITodoState>("all");
  const showTodos = (id: string) => {
    switch (id) {
      case "all": {
        setTodoState("all");
        if (show[0] === "3col") setThreeColAll();
        if (show[0] === "1col") setOneColAll();
        if (show[0] === "table") setTableAll();
        break;
      }
      case "done": {
        setTodoState("done");

        if (show[0] === "3col") setThreeColDone();
        if (show[0] === "1col") setOneColDone();
        if (show[0] === "table") setTableDone();
        break;
      }
      case "3col": {
        todoState === "all" ? setThreeColAll() : setThreeColDone();

        break;
      }
      case "1col": {
        todoState === "all" ? setOneColAll() : setOneColDone();

        break;
      }
      case "table": {
        todoState === "all" ? setTableAll() : setTableDone();
        break;
      }
      default:
        setThreeColAll();
    }
  };

  const { updateCategoryOn, updateCategoryOff } = useContext(UpdateCategory);

  const submitNewCategory = async (title) => {
    try {
      const response = await Axios.post("/category/new", { title });
      Toast(response.data.msg);
      updateCategoryOn();
    } catch (error) {
      console.log(error.response);
      Toast(error.data.msg, false);
    }
  };



  const editCategoryName = async(title)=>{
    try{



      console.log("userSelectedCategory , " , userSelectedCategory);


      const response = await Axios.put("/category/editname", { 
        
        uuid:userSelectedCategory.category.uuid,
        newTitle:title
      
      });
      Toast(response.data.msg);
      updateCategoryOn();
      getSelectedCategoryData()

    }catch(error){
      console.log(error.response);
      Toast("Something went wrong" ,false)
    }
  }






  const listenToInputModal = () => {
    const inputElement = document.getElementsByClassName("swal2-input")[0];
    inputElement.addEventListener(
      "keyup",
      function (event: KeyboardEvent): void {
        if (event.key === "Enter" || (event.ctrlKey && event.key === "Enter")) {
          MySwal.clickConfirm();
        }
      }
    );
  };

  const showAddCategoryModal = () => {
    MySwal.fire({
      title: "New Category",
      input: "text",
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
        submitNewCategory(inputValue);
      },
      showCloseButton: true,
      confirmButtonText: "Ok",
      showLoaderOnConfirm: true,

      allowOutsideClick: () => !Swal.isLoading(),
    });
    listenToInputModal();
  }

  useEffect(() => {
    if (showAddCategoModalKeyboard) {
      showAddCategoryModal();
    }
  }, [showAddCategoModalKeyboard]);

  const selectedSettingStyle = {
    background: theme.sidebar,
    // padding:6,
    borderRadius: ".4rem",
    cursor: "pointer",
    width: 35,
    height: 35,
  };
  const iconStyle = {
    marginTop: 7,
  };

  const CategoryModalAction = async () => {
    try {
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

      console.log("result>>>" , result)
    

      if(typeof result.dismiss === "string"  && result.isDismissed){
        if(result.dismiss === "cancel"){
         
          await MySwal.fire({
            title:"Exit Todos from Category",
           
            html:
            `
              <div id="exit-todos-modal">
            ${todoList.map((item)=>(
            ` <div class="form-check">
                <input class="form-check-input-task" type="checkbox" id=${item._id} />
                <label class="form-check-label" for=${item._id}>
                  ${item.body.length < 30 ? item.body : item.body.slice(0,30) + "..."}
                </label>
              </div>`
            )).join('')}
            </div>` 
            ,
            focusConfirm: false,
            preConfirm: () => {
                const list = document.getElementsByClassName('form-check-input-task') as HTMLCollectionOf<HTMLElement>;
                const ArrayListCheckbox =  Array.from(list)


                const selectedTodosForExitOfCategory = []



                for(const checkbox of ArrayListCheckbox){
                  const checkboxElement = checkbox as HTMLInputElement
                  if(checkboxElement.checked){
                    selectedTodosForExitOfCategory.push(checkboxElement.id)

                  }
                }


                console.log("selectedTodosForExitOfCategory" , selectedTodosForExitOfCategory)

                if(selectedTodosForExitOfCategory.length){

                  Axios.put("/todos/exit-from-category" , {
                    todos:selectedTodosForExitOfCategory,
                    category:userSelectedCategory.category.uuid
                  }).then((response)=>{
                    updateCategoryOn();
                    getAllTodos(selected)
                    Toast(response.data.msg)
                  })
                  
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
            
            
            
            
            
            
          })
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
          console.log(option);

          if (option === "onlyCategory") {
            const response = await Axios.delete(
              `/category/deleteOnlyCategory?id=${userSelectedCategory.category.uuid}`
            );
            updateCategoryOn();
            newCategorySelected();
            Toast(response.data.msg);
          } else if (option === "withAllTodos") {
            const response = await Axios.delete(
              `/category/deleteCategoryWithTodos?id=${userSelectedCategory.category.uuid}`
            );
            updateCategoryOn();
            newCategorySelected();
            Toast(response.data.msg);
          }
        }
        }

      if (result.isConfirmed) {
      
        await MySwal.fire({
          title: "Edit Category Name",
          input: "text",
          inputPlaceholder:userSelectedCategory.category.title,
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
            editCategoryName(inputValue);
          },
          showCloseButton: true,
          confirmButtonText: "Ok",
          showLoaderOnConfirm: true,
    
          allowOutsideClick: () => !Swal.isLoading(),
        });
        listenToInputModal(); 
      }

     

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        minWidth: "2.5rem",
        background: theme.secondSidebar,
        position: "relative",
      }}
    >
      <Box textAlign="center" margin="3rem 0">
        <Tooltip arrow placement="right" title="New Category < c >">
          <Box
            onClick={() => {
              showAddCategoryModal();
            }}
          >
            <FaRegPlusSquare fontSize="1.2rem" style={iconStyle} />
          </Box>
        </Tooltip>
      </Box>

      <Box textAlign="center" margin="3rem 0">
        <Tooltip arrow placement="right" title="Single Column">
          <Box
            onClick={() => showTodos("1col")}
            style={
              show[0] === "1col"
                ? selectedSettingStyle
                : {
                    cursor: "pointer",
                  }
            }
            margin=".6rem auto"
          >
            <FaRegSquare fontSize="1.2rem" style={iconStyle} />
          </Box>
        </Tooltip>
        <Tooltip arrow placement="right" title="3 Columns">
          <Box
            onClick={() => showTodos("3col")}
            style={
              show[0] === "3col"
                ? selectedSettingStyle
                : {
                    cursor: "pointer",
                  }
            }
            margin=".6rem auto"
          >
            <FiColumns fontSize="1.3rem" style={iconStyle} />
          </Box>
        </Tooltip>
        <Tooltip arrow placement="right" title="Table">
          <Box
            onClick={() => showTodos("table")}
            style={
              show[0] === "table"
                ? selectedSettingStyle
                : {
                    cursor: "pointer",
                  }
            }
            margin=".6rem auto"
          >
            <BsTable fontSize="1.2rem" style={iconStyle} />
          </Box>
        </Tooltip>
      </Box>

      <Box textAlign="center" margin="3rem 0">
        <Tooltip arrow placement="right" title="All">
          <Box
            onClick={() => showTodos("all")}
            style={
              show[1] === "all"
                ? selectedSettingStyle
                : {
                    cursor: "pointer",
                  }
            }
            margin=".6rem auto"
          >
            <CgList fontSize="1.3rem" style={iconStyle} />
          </Box>
        </Tooltip>
        <Tooltip arrow placement="right" title="Is Done">
          <Box
            onClick={() => showTodos("done")}
            style={
              show[1] === "done"
                ? selectedSettingStyle
                : {
                    cursor: "pointer",
                  }
            }
            margin=".6rem auto"
          >
            <MdDoneOutline fontSize="1.3rem" style={iconStyle} />
          </Box>
        </Tooltip>

        {selected !== "all-task" || !selected ? (
          <Box position="absolute" left="10px" bottom="6rem">
            <Tooltip arrow placement="right" title="Category Info">
              <Box
                onClick={() => {
                  CategoryModalAction();
                }}
                margin=".6rem auto"
              >
                <BsInfoSquare fontSize="1.3rem" style={iconStyle} />
              </Box>
            </Tooltip>
          </Box>
        ) : (
          <span></span>
        )}
      </Box>
    </Box>
  );
};

export default SettingBar;
