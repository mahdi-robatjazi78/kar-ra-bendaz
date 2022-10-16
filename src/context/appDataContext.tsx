import React, { useState } from "react";
import Axios from "@/services/api";
import Toast from "@/util/toast";

export const AppDataContext = React.createContext(null);
export const AppDataContextProvider = ({ children }) => {
  const [blurPage, setBlurPage] = useState<boolean>(false);
  const blurTrue = () => setBlurPage(true);
  const blurFalse = () => setBlurPage(false);

 
  const [updateCategory ,setUpdateCategory] = useState(false)
  const updateCategoryOn = ()=>setUpdateCategory(true)
  const updateCategoryOff = ()=>setUpdateCategory(false)
  

  const [selected,setSelected] = useState('other')
  const newCategorySelected = (categoryId = "other")=>{
      setSelected(categoryId)
  }
  
  
  const [todoList, setTodoList] = useState([]);
  const [drawerState, setDrawerState] = useState({
    open: false,
    state: "todo",
    item: {},
  });




  const getAllTodos = async () => {
    console.log("selcted>>>>", selected);

    try {
      const result = await Axios.get(
        `/todos/getAll?category=${selected}`
      );
      setTodoList(result.data.todos.reverse());
    } catch (error) {
      console.log(error);
      console.log(error.response);
    
    }
  };

  const editTodoBody = async (id , body)=>{
    try{
      const response = await Axios.put("/todos/update-body", {
        id: id,
        body: body,
      });
      updateCategoryOn();
      getAllTodos()
      console.log(response) 
      Toast(response.data.msg)
      
    }catch(error){
      console.log(error.response)
    }
  }  




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


        updateCategory , updateCategoryOn , updateCategoryOff,


        selected  , newCategorySelected
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};
