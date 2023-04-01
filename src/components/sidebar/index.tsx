import React, { useContext, useEffect, useState } from "react";
import themeContext from "@context/themeContext";
import { useDrop } from "react-dnd";
import SidebarItem from "./sidebarItem";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { UnActiveCategory } from "@/redux/features/todoPageConfigSlice";

const Sidebar = (props:any) => {
  const { categoryList ,totalTodoItems } = props;

  const { active_ws: ActiveWs, active_category: ActiveCategory } = useSelector(
    (state: RootState) => state.todoPageConfig
  );
  const { headerPosition } = useSelector(
    (state: RootState) => state.settings
  );
  const dispatch: AppDispatch = useDispatch();
  const theme = useContext(themeContext);
  
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "todo-box",
    drop: (item) => ({ name: "category-box", type: "todo", id: "other" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  // const showSubset = async () => {
  //   try {
  //     const response = await Axios.get(`/category/index?ws=${ActiveWs.id}`);
  //     setCategoryList(response.data.list);
  //     updateCategoryOff();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if(ActiveWs?.id){
  //     showSubset();
  //   }
  // }, [ActiveWs.id]);

  // useEffect(() => {
  //   }

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
    <div
      id="sidebar"
      style={
        headerPosition === "bottom"
          ? {
              height: "calc(100vh - 70px)",
              marginTop: "auto",
            }
          : {
              height: "100vh",
            }
      }
    >
      {ActiveWs?.title && (
        <Typography className="ws-title" component={"h4"}>
          {ActiveWs?.title}
        </Typography>
      )}

      {categoryList?.length ? (
        <ul id="listCategories">
          <li
            ref={drop}
            style={{
              marginBottom: "5px",
              ...subsetTabsStyle,
              ...(borderColor && {
                border: `1px dashed ${borderColor}`,
              }),
            }}
            data-testid="dustbin"
            className={`list-category-items ${
              !ActiveCategory.id ? "active-item" : ""
            }  `}
            onClick={() => {
              // newCategorySelected();
              dispatch(UnActiveCategory());
            }}
          >
            <div className="task-title-style">All</div>
            <div
        style={{
        }}
        className="'task-count-style'"
      >
        {totalTodoItems ||""}
      </div>
          </li>
          {categoryList.map((item, index) => (
            <SidebarItem key={item.uuid} item={item} />
          ))}
        </ul>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default Sidebar;
