import React, { useState, useEffect } from "react";
import Axios from "@services/api";
import Toast from "@/util/toast";

export const AppDataContext = React.createContext(null);
export const AppDataContextProvider = ({ children }) => {
  const [blurPage, setBlurPage] = useState<boolean>(false);
  const blurTrue = () => setBlurPage(true);
  const blurFalse = () => setBlurPage(false);

  const [headerPosition, setHeaderPosition] = useState("top");
  const goHeaderTop = () => setHeaderPosition("top");
  const goHeaderBottom = () => setHeaderPosition("bottom");
  const goHeaderLeft = () => setHeaderPosition("left");
  const goHeaderRight = () => setHeaderPosition("right");

  const [updateCategory, setUpdateCategory] = useState(false);
  const updateCategoryOn = () => setUpdateCategory(true);
  const updateCategoryOff = () => setUpdateCategory(false);
  
  interface ISelectedWorkspace {
    id:String,
    title:String
  }
  
  const selectedWs = JSON.parse(window.localStorage.getItem("selectedWs"))
  const [selectedWorkspace, setSelectedWorkspace] = useState<ISelectedWorkspace>({id:"",title:""});
  useEffect(()=>{
    if(selectedWs.id && selectedWs.id !== selectedWorkspace.id){
      setSelectedWorkspace({id:selectedWs?.id , title :selectedWs.title})
    }
  } , [selectedWs.id])
  
  const [selected, setSelected] = useState("other");
  const newCategorySelected = (categoryId = "other") => {
    setSelected(categoryId);
  };
  const [todoList, setTodoList] = useState([]);
  const [drawerState, setDrawerState] = useState({
    open: false,
    state: "todo",
    item: {},
  });

  const getAllTodos = async () => {
    try {
      if(selectedWorkspace.id){

        setTodoList([]);
        const result = await Axios.get(
          `/todos/getAll?category=${selected}&ws=${selectedWorkspace.id}`
          );
          
          let todos = result.data.todos.reverse();
          setTodoList(todos);
          updateCategoryOn();
        }
    } catch (error) {
      console.log(error);
    }
  };

  const editTodoBody = async (id, body) => {
    try {
      const response = await Axios.put("/todos/update-body", {
        id: id,
        body: body,
      });
      updateCategoryOn();
      getAllTodos();
      Toast(response.data.msg);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <AppDataContext.Provider
      value={{
        getAllTodos,
        editTodoBody,
        blurPage,
        blurTrue,
        blurFalse,
        todoList,
        drawerState,
        setDrawerState,
        updateCategory,
        updateCategoryOn,
        updateCategoryOff,
        selected,
        newCategorySelected,
        headerPosition,
        goHeaderTop,
        goHeaderBottom,
        goHeaderLeft,
        goHeaderRight,
        selectedWorkspace,
        setSelectedWorkspace,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};
