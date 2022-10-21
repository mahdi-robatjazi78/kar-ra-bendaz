import React, { useContext, useEffect, useState } from "react";
import themeContext from "@context/themeContext";
import Axios from "@services/api";
import { AppDataContext } from "@context/appDataContext";
import { useDrop } from 'react-dnd'
import SidebarItem from "./sidebarItem"



const Sidebar = () => {
  const theme = useContext(themeContext);

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



  type ITodoState = "all" | "done";
  const [todoState, setTodoState] = useState<ITodoState>("all");
  const [categoryList, setCategoryList] = useState([]);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "todo-box",
    drop: (item) => ({ name: 'category-box', type:"todo" , id : "other" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

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



  const isActive = canDrop && isOver;
  let borderColor = "";
  if (isActive) {
    borderColor = "green";
  } else if (canDrop) {
    borderColor = "darkkhaki";
  }

  const subsetTabsStyle = {
    color: theme.text3,
  };
  
  return (
    <div id="sidebar" style={sidebarStyle}>
      {categoryList.length ? (
        <ul id="listCategories">
          <li
            ref={drop} style={{ 
              
              marginBottom:"5px",
              ...subsetTabsStyle,
              ...(borderColor && {
                border:`1px dashed ${borderColor}`

              })
              
              
              }} data-testid="dustbin"


            className={`list-category-items ${
              selected === "other" ? "active-item" : ""
            }  `}
             
            onClick={() => {
              newCategorySelected();
            }}
          >
            <div className="task-title-style">All</div>

          </li>
          {categoryList.map((item,index) => (
            <SidebarItem  
              key={item.uuid}
              item={item}

            />
          ))}
        </ul>
      ) : (<span></span>)}
    </div>
  );
};

export default Sidebar;
