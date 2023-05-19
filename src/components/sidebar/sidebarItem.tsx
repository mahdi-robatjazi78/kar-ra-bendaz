import React, { useContext } from "react";
import { useDrop } from "react-dnd";
import ThemeContext from "@context/themeContext";
import {
  DrawerOpen,
  SetActiveCategory,
} from "@/redux/features/todoPageConfigSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setBlurPage } from "@/redux/features/settingSlice";
import { truncateText } from "@/util/funcs";
import StyledBadge from "@/styles/styled/styled_badge";
const SidebarItem = (props: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { active_category: ActiveCategory } = useSelector(
    (state: RootState) => state.todoPageConfig
  );
  const { item } = props;
  const theme = useContext(ThemeContext);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "todo-box",
    drop: () => ({ name: "category-box", type: "todo", id: item.uuid }),
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
    <li
      className={`list-category-items ${
        ActiveCategory.id && ActiveCategory.id === item.uuid
          ? "active-item"
          : ""
      }  `}
      ref={drop}
      style={{
        ...subsetTabsStyle,
        marginBottom: "5px",
        ...(borderColor && {
          border: `1px dashed ${borderColor}`,
        }),
      }}
      data-testid="category-box"
      onClick={() => {
        if (ActiveCategory.id === item.uuid) {
          dispatch(
            DrawerOpen({
              state: "category",
              item: item,
            })
          );
          dispatch(setBlurPage());
        } else {
          dispatch(
            SetActiveCategory({
              id: item.uuid,
              title: item.title,
            })
          );
        }
      }}
    >
      <div
        className={`${
          ActiveCategory.id && ActiveCategory.id === item.uuid
            ? "task-title-style-active"
            : "task-title-style"
        }`}
      >
        {truncateText(item.title, 17)}
      </div>
      <div>
        <StyledBadge
          bordered={ActiveCategory.id && ActiveCategory.id === item.uuid}
          style={{ margin: "1.2rem" }}
          badgeContent={item.task_count || "0"}
        ></StyledBadge>
      </div>
    </li>
  );
};

export default SidebarItem;
