import { createSlice } from "@reduxjs/toolkit";
import { ITodoPageLayoutSliceStructure } from "@/types/types";

const initialState: ITodoPageLayoutSliceStructure = {
  todoPageLayout: ["3col", "all", 3],
  todoFilterLayout: {
    filter: "all",
    config: {
      start: 0,
      end: 0,
    },
  },
};

export const todoLayoutSlice = createSlice({
  name: "todo-page-layout",
  initialState,
  reducers: {
    changeTodoFilterLayout: (state, action) => {
      state.todoFilterLayout.filter = action.payload;
    },
    setThreeColAll: (state, action) => {
      state.todoPageLayout = [`3col`, `all`, action.payload];
    },
 
    setOneColAll: (state) => {
      state.todoPageLayout = [`1col`, `all`, null];
    },
 
    setTableAll: (state) => {
      state.todoPageLayout = [`table`, `all`, null];
    },
  },
});

export const {
  changeTodoFilterLayout,
  setThreeColAll,
  setOneColAll,
  setTableAll,
} = todoLayoutSlice.actions;

export default todoLayoutSlice.reducer;
