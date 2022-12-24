import React, { useState, useEffect, useContext } from "react";
import { Box, Tooltip } from "@mui/material";
import { CgList } from "react-icons/cg";
import { MdDoneOutline } from "react-icons/md";
import { FiColumns } from "react-icons/fi";
import { FaRegSquare, FaRegPlusSquare } from "react-icons/fa";
import { BsTable, BsInfoSquare } from "react-icons/bs";
import Axios from "@services/api";
import { TodoContext } from "@context/todoContext";
 
import ThemeContext from "@context/themeContext";

import { AppDataContext } from "@context/appDataContext";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Toast from "@utils/toast";
import ShowModalNewCategory from './TodoModals/CateogryNewEdit'
import CategoryModalActions from "./TodoModals/categoryModalActions";
const MySwal = withReactContent(Swal);

const SettingBar = ({
  // showAddCategoModalKeyboard,
  userSelectedCategory,
  getSelectedCategoryData,
  todoList,
  getAllTodos,
}) => {
  const theme = useContext(ThemeContext);
  const { blurTrue, blurFalse , selected, newCategorySelected } = useContext(AppDataContext);
 
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

  const { updateCategoryOn, updateCategoryOff } = useContext(AppDataContext);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState({
    show:false,
    state:"add",
    prevText:""    
  });
const [showCategoryModalActions, setShowCategoryModalActions] = useState(false);


  return (
    <Box
      id='setting-bar-container'
    >
      <Box className="setting-bar-section" >
        <Tooltip arrow placement="right" title="New Category">
          <Box
            onClick={() => {
              setShowAddCategoryModal({
                prevText:"",
                show:true,
                state:"add"
              });
            }}
          >
            <FaRegPlusSquare className="icon-style" />
          </Box>
        </Tooltip>
      </Box>

      <Box className="setting-bar-section">
        <Tooltip arrow placement="right" title="Single Column">
          <Box
            onClick={() => showTodos("1col")}
            className={
              show[0] === "1col"
                ? "selected-setting"
                : "unselected-setting"
            }
          >
            <FaRegSquare className="icon-style" />
          </Box>
        </Tooltip>
        <Tooltip arrow placement="right" title="3 Columns">
          <Box
            onClick={() => showTodos("3col")}
            className={
              show[0] === "3col"
                ? "selected-setting"
                : "unselected-setting"
            }
          >
            <FiColumns  className="icon-style2" />
          </Box>
        </Tooltip>
        <Tooltip arrow placement="right" title="Table">
          <Box
            onClick={() => showTodos("table")}
            className={
              show[0] === "table"
              ? "selected-setting"
              : "unselected-setting"
            }
          >
            <BsTable className="icon-style" />
          </Box>
        </Tooltip>
      </Box>

      <Box className="setting-bar-section">
        <Tooltip arrow placement="right" title="All">
          <Box
            onClick={() => showTodos("all")}
            className={
              show[1] === "all"
              ? "selected-setting"
              : "unselected-setting"
            }
          >
            <CgList className="icon-style2" />
          </Box>
        </Tooltip>
        <Tooltip arrow placement="right" title="Is Done">
          <Box
            onClick={() => showTodos("done")}
            className={
              show[1] === "done"
              ? "selected-setting"
              : "unselected-setting"
            }
          >
            <MdDoneOutline className="icon-style2" />
          </Box>
        </Tooltip>

        {selected !== "other" || !selected ? (
          <Box position="absolute" left="10px" bottom="6rem">
            <Tooltip arrow placement="right" title="Category Info">
              <Box
                onClick={() => {
                  setShowCategoryModalActions(true);
                }}
                margin=".6rem auto"
              >
                <BsInfoSquare className="icon-style2" />
              </Box>
            </Tooltip>
          </Box>
        ) : (
          <span></span>
        )}
      </Box>



      {
        showAddCategoryModal.show && (
          <ShowModalNewCategory 
            setShowAddCategoryModal={setShowAddCategoryModal}        
            showAddCategoryModal={showAddCategoryModal}
            userSelectedCategory={userSelectedCategory}
            getSelectedCategoryData={getSelectedCategoryData}
          />
        )
        
      }


      {
        showCategoryModalActions && (

           <CategoryModalActions
            userSelectedCategory={userSelectedCategory}
            setShowAddCategoryModal={setShowAddCategoryModal}
            setShowCategoryModalActions={setShowCategoryModalActions}
           />
        )

      }



    </Box>
  );
};

export default SettingBar;
