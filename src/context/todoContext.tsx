import React, { useState, createContext } from "react";
import { ITodoLayoutConfig } from "../types/types";
import { getLocalStorageValue, setTodoPageLocalSettings } from "@/util/funcs";

export const TodoContext = createContext<ITodoLayoutConfig | null>(null);

export const TodoContextProvider = ({ children }) => {
  const savedTodoPageState = getLocalStorageValue("todoPage.layout");



  const [todoListShowStatus, setTodoListShowStatus] = useState<
    ITodoLayoutConfig["show"]
  >(savedTodoPageState?.length ? savedTodoPageState : ["1col", "all", null]);

  const [todoFilterLayout , setTodoFilterLayout] = useState({
    filter:"all",
    config:{
      start:0,
      end:0
    }
  })
  const changeTodoFilterLayout =(f)=>{setTodoFilterLayout((prevConfig)=>({...prevConfig,filter:f }))}

  const setThreeColAll = (number: any) => {
    setTodoListShowStatus(["3col", "all", number ? number :  todoListShowStatus[2]]);
    setTodoPageLocalSettings(
      "layout",
      ["3col", "all", number ? number :  todoListShowStatus[2]]
    );
  };
  const setThreeColDone = (number:any) => {
    setTodoListShowStatus(["3col", "done",  number ? number : todoListShowStatus[2] ]);
    setTodoPageLocalSettings(
      "layout",
      ["3col", "done", number ? number :  todoListShowStatus[2] ]
    );
  };
  const setOneColAll = () => {
    setTodoListShowStatus(["1col", "all", null]);
    setTodoPageLocalSettings(
      "layout",
      ["1col", "all", null]
    );
  };
  const setOneColDone = () => {
    setTodoListShowStatus(["1col", "done", null]);
    setTodoPageLocalSettings(
      "layout",
      ["1col", "done", null]
    );
  };
  const setTableAll = () => {
    setTodoListShowStatus(["table", "all", null]);
    setTodoPageLocalSettings(
      "layout",
      ["table", "all", null]
    );
  };
  const setTableDone = () => {
    setTodoListShowStatus(["table", "done", null]);
    setTodoPageLocalSettings(
      "layout",
      ["table", "done", null]
    );
  };
  const handlePresentAndFilterTodoLayout = (id: string, n = null) => {
    switch (id) {
      case "all": {
        changeTodoFilterLayout("all");
        if (todoListShowStatus[0] === "3col") setThreeColAll(n);
        if (todoListShowStatus[0] === "1col") setOneColAll();
        if (todoListShowStatus[0] === "table") setTableAll();
        break;
      }
      case "done": {
        changeTodoFilterLayout("done");

        if (todoListShowStatus[0] === "3col") setThreeColDone(n);
        if (todoListShowStatus[0] === "1col") setOneColDone();
        if (todoListShowStatus[0] === "table") setTableDone();
        break;
      }
      case "3col": {
        todoFilterLayout.filter === "all" ? setThreeColAll(n) : setThreeColDone(n);
        break;
      }
      case "1col": {
        todoFilterLayout.filter === "all" ? setOneColAll() : setOneColDone();
        break;
      }
      case "table": {
        todoFilterLayout.filter === "all" ? setTableAll() : setTableDone();
        break;
      }
      default:
        break;
    }
  };


  return (
    <TodoContext.Provider
      value={{
        show: todoListShowStatus,
        setThreeColAll,
        setThreeColDone,
        setOneColAll,
        setOneColDone,
        setTableAll,
        setTableDone,
        handlePresentAndFilterTodoLayout,
        todoFilterLayout,
        changeTodoFilterLayout
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
