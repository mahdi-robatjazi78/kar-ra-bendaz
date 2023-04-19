import React, { useContext, useState, useEffect } from "react";
import { Box, Popover } from "@mui/material";
import { motion } from "framer-motion";
import { TodoContext } from "@/context/todoContext";
import useWindowSize from "@/hooks/useWindowSize";

const SelectMultiColumn = (props) => {
  const { anchorEl, open, id, handleCloseTodoViewCountTooltip } = props;
  const sizeName = useWindowSize().sizeName;  
  const { show, setThreeColAll, handlePresentAndFilterTodoLayout } = useContext(
    TodoContext
  );
  const [listTodoViewNumbers, setListTodoViewNumbers] = useState([]);

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

  useEffect(() => {
    if (sizeName === "mobile") {
      handleCloseTodoViewCountTooltip();
    } else {
      let list = [];
      let activeNumber = null;

      switch (sizeName) {
        case "tablet":
          if (show[2] > 3) {
            activeNumber = 3;
          }
          list = [2, 3];
          break;
        case "laptop":
          if (show[2] == 6) {
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

      let result = [];
      if (activeNumber !== null) {
        result = list.map((item) => ({
          active: activeNumber == item ? true : false,
          number: item,
          id: `${item}-column`,
        }));
      } else {
        result = list.map((item) => ({
          active: show[2] == item ? true : false,
          number: item,
          id: `${item}-column`,
        }));
      }
      setListTodoViewNumbers(result);
    }
  }, [sizeName]);

  return (
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
              handlePresentAndFilterTodoLayout("3col", item.number);
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
  );
};

export default SelectMultiColumn;
