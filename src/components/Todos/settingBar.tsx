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

        {selected !== "other" || !selected ? (
          <Box position="absolute" left="10px" bottom="6rem">
            <Tooltip arrow placement="right" title="Category Info">
              <Box
                onClick={() => {
                  setShowCategoryModalActions(true);
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
