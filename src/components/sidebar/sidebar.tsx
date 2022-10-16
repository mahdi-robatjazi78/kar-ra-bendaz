import React, { useContext, useEffect, useState } from "react";
import themeContext from "../../context/themeContext";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { RiRestaurant2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { TodoContext } from "../../context/todoContext";
import Axios from "../../services/api";
import { AppDataContext } from "@context/appDataContext";

// import "./sidebarStyles.css";
import Toast from "../../util/toast";
const Sidebar = () => {
  const theme = useContext(themeContext);

  const {
    show,
    setThreeColAll,
    setThreeColDone,
    setOneColAll,
    setOneColDone,
    setTableAll,
    setTableDone,
  } = useContext(TodoContext);

  const {
    updateCategory,
    updateCategoryOff,
    newCategorySelected,
    selected,
    todoList,
  } = useContext(AppDataContext);

  const sidebarStyle = {
    backgroundColor: theme.sidebar,
  };

  const subsetTabsStyle = {
    color: theme.text3,
  };

  type ITodoState = "all" | "done";
  const [todoState, setTodoState] = useState<ITodoState>("all");
  const [categoryList, setCategoryList] = useState([]);

  const showSubset = async () => {
    try {
      console.log("function update category here");
      const response = await Axios.get("/category/getAll");
      setCategoryList(response.data.list);
      updateCategoryOff();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    showSubset();
  }, []);

  useEffect(() => {
    if (updateCategory) {
      showSubset();
    }
  }, [updateCategory]);

  return (
    <div id="sidebar" style={sidebarStyle}>
      {categoryList.length ? (
        <ul id="listCategories">
          <li
            className={`list-category-items ${
              selected === "other" ? "active-item" : ""
            }  `}
            style={subsetTabsStyle}
            onClick={() => {
              newCategorySelected();
            }}
          >
            <div className="task-title-style">All</div>

          </li>
          {categoryList.map((item) => (
            <li
              key={item.uuid}
              className={`list-category-items ${
                selected === item.uuid ? "active-item" : ""
              }  `}
              style={subsetTabsStyle}
              onClick={() => {
                newCategorySelected(item.uuid);
              }}
            >
              <div className="task-title-style">{item.title}</div>
              <div
                style={{
                  width: item.task_count.length > 1 ? "fit-content" : "1.2rem",
                }}
                className="task-count-style"
              >
                {item.task_count}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default Sidebar;
