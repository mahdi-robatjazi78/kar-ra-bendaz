import React , {useContext} from "react";
import { AppDataContext } from "@context/appDataContext";
import { useDrop } from 'react-dnd'
import ThemeContext from "@context/themeContext";
const SidebarItem = (props:any) => {

  
  const {item} = props
  const theme = useContext(ThemeContext);

  const {
    updateCategory,
    updateCategoryOff,
    newCategorySelected,
    selected,
    todoList,
  } = useContext(AppDataContext);


  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "todo-box",
    drop: () => ({ name: 'category-box',type:"todo",id:item.uuid }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))




 
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
    <li
      className=
      {`list-category-items ${selected === item.uuid ? "active-item" : ""}  `}
      ref={drop}
      style={{ ...subsetTabsStyle,
        
        marginBottom:"5px",
        ...(borderColor && {
          border:`1px dashed ${borderColor}`

        }) }} data-testid="category-box"
      onClick=
      {() => {
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
  );
};

export default SidebarItem;
