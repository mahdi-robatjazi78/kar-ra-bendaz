import React, { useState, useEffect, useContext } from "react";
import { Box, Popover, Tooltip } from "@mui/material";
import { CgList } from "react-icons/cg";
import { MdDoneOutline } from "react-icons/md";
import { FiColumns } from "react-icons/fi";
import { FaRegSquare, FaRegPlusSquare } from "react-icons/fa";
import { BsTable, BsInfoSquare } from "react-icons/bs";
import { TodoContext } from "@context/todoContext";
import "./popoverTodoColumn.css";
import ShowModalNewCategory from "../TodoModals/newCategory";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useWindowSize from "@/hooks/useWindowSize";

const SettingBar = ({
  showAddCategoryModal,
  setShowAddCategoryModal,
  UpdateOnlyCategories,
}) => {
  const { headerPosition } = useSelector((state: RootState) => state.settings);
  const sizeName = useWindowSize().sizeName;

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

  const showTodos = (id: string, n = null) => {
    switch (id) {
      case "all": {
        setTodoState("all");
        if (show[0] === "3col") setThreeColAll(n);
        if (show[0] === "1col") setOneColAll();
        if (show[0] === "table") setTableAll();
        break;
      }
      case "done": {
        setTodoState("done");

        if (show[0] === "3col") setThreeColDone(n);
        if (show[0] === "1col") setOneColDone();
        if (show[0] === "table") setTableDone();
        break;
      }
      case "3col": {
        todoState === "all" ? setThreeColAll(n) : setThreeColDone(n);
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
        // setOneColAll();
        break;
    }
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleOpenTodoViewCountTooltip = (event) => {
    if (sizeName !== "mobile") {
      setAnchorEl(event.currentTarget);
    } else {
      setThreeColAll(2);
      showTodos("3col", 2);
    }
  };

  const handleCloseTodoViewCountTooltip = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [listTodoViewNumbers, setListTodoViewNumbers] = useState([]);

  useEffect(() => {
    if (sizeName === "mobile") {
      handleCloseTodoViewCountTooltip();
      if(show[2] > 2){
        setThreeColAll(2);
      }
    } else {
      let list = [];
      let activeNumber = null

      switch (sizeName) {
        case "tablet":
          if(show[2] > 3){
            setThreeColAll(3);
            activeNumber = 3;
          }
          list = [2, 3];
          break;
        case "laptop":
          if(show[2] == 6){
            setThreeColAll(5);
            activeNumber = 5;

          }
          list = [2, 3, 4, 5];
          break;
        case "pc":
          list = [2, 3, 4, 5, 6];

          break;
        default:
          list = [2, 3, 4, 5, 6];
          break;
      }
      
      let result =[];
      if (activeNumber !== null){
        result = list.map((item) => ({
          active:  activeNumber == item ? true : false,
          number: item,
          id: `${item}-column`,
        }))
      }
      else{

      result = list.map((item) => ({
        active:  show[2] == item ? true : false,
        number: item,
        id: `${item}-column`,
      }));
    }
      setListTodoViewNumbers(result);
    }
  }, [sizeName]);

  const changeAcitiveTodoViewListItem = (key: string) => {
    setListTodoViewNumbers((prevState) =>
      prevState.map((item) => {
        if (item.id === key) {
          return { ...item, active: true };
        } else {
          return { ...item, active: false };
        }
      })
    );
  };

  return (
    <Box
      id="setting-bar-container"
      style={
        headerPosition === "bottom"
          ? {
              marginTop: "auto",
              height: "calc(100vh - 70px)",
            }
          : {
              height: "100vh",
            }
      }
    >
      <Box className="setting-bar-section">
        <Tooltip arrow placement="right" title="New Category">
          <Box
            className="unselected-setting"
            onClick={() => {
              setShowAddCategoryModal({
                prevText: "",
                show: true,
                state: "add",
              });
            }}
          >
            <FaRegPlusSquare className="icon-style" />
          </Box>
        </Tooltip>
      </Box>

      <Box className="setting-bar-section">
        <Tooltip arrow placement="right" title="Single Column">
          <motion.div
            whileTap={{ scale: 1.2 }}
            onClick={() => showTodos("1col")}
            className={
              show[0] === "1col" ? "selected-setting" : "unselected-setting"
            }
          >
            <FaRegSquare className="icon-style" />
          </motion.div>
        </Tooltip>
        <Tooltip arrow placement="right" title="Multi Columns">
          <motion.div
            whileTap={{ scale: 1.2 }}
            aria-describedby={id}
            onClick={(e) => {
              handleOpenTodoViewCountTooltip(e);
            }}
            className={
              show[0] === "3col" ? "selected-setting" : "unselected-setting"
            }
          >
            <FiColumns className="icon-style2" />
          </motion.div>
        </Tooltip>

        <Popover
          className="selected-list-todo-view-column"
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleCloseTodoViewCountTooltip}
          anchorOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
        >
          <Box className="selected-list-todo-view-column-parent">
            {listTodoViewNumbers.map((item) => (
              <motion.div
                initial={{
                  x:
                    item.number === 2 || item.number === 4 || item.number === 6
                      ? -100
                      : 100,
                  opacity: 0,
                }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ ease: "easeOut", duration: 0.6 }}
                key={item.id}
                onClick={() => {
                  changeAcitiveTodoViewListItem(item.id);
                  showTodos("3col", item.number);
                  setTimeout(() => {
                    handleCloseTodoViewCountTooltip();
                  }, 500);
                }}
                className={`todo-view-item ${
                  item.active && show[0] === "3col"
                    ? "todo-view-item-active d-flex-center"
                    : ""
                }`}
              >
                {item.number}
              </motion.div>
            ))}
          </Box>
        </Popover>
        <Tooltip arrow placement="right" title="Table">
          <motion.div
            whileTap={{ scale: 1.2 }}
            onClick={() => showTodos("table")}
            className={
              show[0] === "table" ? "selected-setting" : "unselected-setting"
            }
          >
            <BsTable className="icon-style" />
          </motion.div>
        </Tooltip>
      </Box>

      <Box className="setting-bar-section">
        <Tooltip arrow placement="right" title="All">
          <motion.div
            whileTap={{ scale: 1.2 }}
            onClick={() => showTodos("all")}
            className={
              show[1] === "all" ? "selected-setting" : "unselected-setting"
            }
          >
            <CgList className="icon-style2" />
          </motion.div>
        </Tooltip>
        <Tooltip arrow placement="right" title="Is Done">
          <motion.div
            whileTap={{ scale: 1.2 }}
            onClick={() => showTodos("done")}
            className={
              show[1] === "done" ? "selected-setting" : "unselected-setting"
            }
          >
            <MdDoneOutline className="icon-style2" />
          </motion.div>
        </Tooltip>
      </Box>

      {showAddCategoryModal.show && (
        <ShowModalNewCategory
          setShowAddCategoryModal={setShowAddCategoryModal}
          showAddCategoryModal={showAddCategoryModal}
          UpdateOnlyCategories={UpdateOnlyCategories}
        />
      )}
    </Box>
  );
};

export default SettingBar;
