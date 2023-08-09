import React, { useContext } from "react";
import themeContext from "@context/themeContext";
import { useDrop } from "react-dnd";
import SidebarItem from "./sidebarItem";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { UnActiveCategory } from "@/redux/features/todoPageConfigSlice";
import StyledBadge from "@/styles/styled/styled_badge";
import Text from "@/styles/styled/styled_typography";
import { truncateText } from "@/util/funcs";

const Sidebar = (props: any) => {
  const { categoryList, totalTodoItems } = props;

  const { active_ws: ActiveWs, active_category: ActiveCategory } = useSelector(
    (state: RootState) => state.todoPageConfig
  );
  const { headerPosition } = useSelector((state: RootState) => state.settings);
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

  const isActive = canDrop && isOver;
  let borderColor = "";
  if (isActive) {
    borderColor = "var(--hoverSuccess)";
  } else if (canDrop) {
    borderColor = "var(--borders)";
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
              boxShadow: "1px 3px 4px 3px var(--header)",
            }
          : {
              height: "100vh",
              boxShadow: "1px 3px 4px 3px var(--header)",
            }
      }
    >
      {ActiveWs?.title && (
        <Text className="ws-title" component={"h4"}>
          {truncateText(ActiveWs?.title, 19)}
        </Text>
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
            <div>
              <StyledBadge
                bordered={!ActiveCategory.id}
                style={{ margin: "1.2rem" , userSelect:"none" }}
                badgeContent={totalTodoItems || "0"}
              ></StyledBadge>
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
