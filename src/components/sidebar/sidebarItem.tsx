import React , {useContext} from "react";
import { AppDataContext } from "@context/appDataContext";
import { useDrop } from 'react-dnd'
import ThemeContext from "@context/themeContext";
import { SetActiveCategory } from "@/redux/features/todoPageConfigSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch , useSelector } from "react-redux";
const SidebarItem = (props:any) => {

  const dispatch :AppDispatch = useDispatch()
  const {active_category : ActiveCategory} = useSelector((state:RootState)=>state.todoPageConfig)
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
      {`list-category-items ${ActiveCategory.id && ActiveCategory.id === item.uuid ? "active-item" : ""}  `}
      ref={drop}
      style={{ ...subsetTabsStyle,
        
        marginBottom:"5px",
        ...(borderColor && {
          border:`1px dashed ${borderColor}`

        }) }} data-testid="category-box"
      onClick=
      {() => {
        
        dispatch(SetActiveCategory({
          id:item.uuid,
          title:item.title
        }))
        
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
