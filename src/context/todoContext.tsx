import React, { useState, createContext, useLayoutEffect } from "react";
import { ITodosShow } from "../types/types";

export const TodoContext = createContext<ITodosShow | null>(null);

export const TodoContextProvider = ({ children }) => {
  const savedTodoPageState = JSON.parse(
    localStorage.getItem("todoListShowStatusLocal")
  );

  const [todoListShowStatus, setTodoListShowStatus] = useState<
    ITodosShow["show"]
  >(savedTodoPageState?.length ? savedTodoPageState : ["1col", "all", null]);

  const setThreeColAll = (number: any) => {
    setTodoListShowStatus(["3col", "all", number]);
    localStorage.setItem(
      "todoListShowStatusLocal",
      JSON.stringify(["3col", "all", number])
    );
  };
  const setThreeColDone = (number: any) => {
    setTodoListShowStatus(["3col", "done", number]);
    localStorage.setItem(
      "todoListShowStatusLocal",
      JSON.stringify(["3col", "done", number])
    );
  };
  const setOneColAll = () => {
    setTodoListShowStatus(["1col", "all", null]);
    localStorage.setItem(
      "todoListShowStatusLocal",
      JSON.stringify(["1col", "all", null])
    );
  };
  const setOneColDone = () => {
    setTodoListShowStatus(["1col", "done", null]);
    localStorage.setItem(
      "todoListShowStatusLocal",
      JSON.stringify(["1col", "done", null])
    );
  };
  const setTableAll = () => {
    setTodoListShowStatus(["table", "all", null]);
    localStorage.setItem(
      "todoListShowStatusLocal",
      JSON.stringify(["table", "all", null])
    );
  };
  const setTableDone = () => {
    setTodoListShowStatus(["table", "done", null]);
    localStorage.setItem(
      "todoListShowStatusLocal",
      JSON.stringify(["table", "done", null])
    );
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
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
