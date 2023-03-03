import React, { useContext, useEffect, useState } from "react";
import themeContext from "@context/themeContext";
import Axios from "@services/api";
import { AppDataContext } from "@context/appDataContext";
import { useDrop } from 'react-dnd'
import SidebarItem from "./sidebarItem"
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";


const Sidebar = () => {
  const theme = useContext(themeContext);
  const {active_ws : ActiveWs} = useSelector(state=>state.todoPageConfig)
  const {
    updateCategory,
    updateCategoryOff,
    newCategorySelected,
    selected,
    headerPosition,
    selectedWorkspace
  } = useContext(AppDataContext);




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
      const response = await Axios.get(`/category/getAll?ws=${ActiveWs.id}`);
      setCategoryList(response.data.list);
      updateCategoryOff();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(ActiveWs?.id){
      showSubset();
    }
  }, [ActiveWs.id]);

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
    <div id="sidebar"
    style={
      headerPosition === "bottom" ? {
        height : "calc(100vh - 70px)",
        marginTop:"auto"
      }:{
        height:"100vh"
      }
      
    }
    >
    {
      selectedWorkspace?.title && (
        <Typography className="ws-title"  component={"h4"}>
          {selectedWorkspace?.title}
        </Typography>
      )
    }



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
