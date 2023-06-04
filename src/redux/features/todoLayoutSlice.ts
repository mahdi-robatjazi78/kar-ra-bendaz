import { createSlice } from "@reduxjs/toolkit";

export interface ITodoPageLayout {
  todoPageLayout: Array<String | Number | null>;
  todoFilterLayout: {
    filter: String;
    config: {
      start: Number | String;
      end: Number | String;
    };
  };
}

const initialState: ITodoPageLayout = {
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
  name: "todoPageLayout",
  initialState,
  reducers: {
    changeTodoFilterLayout: (state, action) => {
      state.todoFilterLayout.filter = action.payload;
    },
    setThreeColAll: (state, action) => {
      state.todoPageLayout = [`3col`, `all`, action.payload];
    },
    setThreeColDone: (state, action) => {
      state.todoPageLayout = [`3col`, `done`, action.payload];
    },
    setOneColAll: (state) => {
      state.todoPageLayout = [`1col`, `all`, null];
    },
    setOneColDone: (state) => {
      state.todoPageLayout = [`1col`, `done`, null];
    },
    setTableAll: (state) => {
      state.todoPageLayout = [`table`, `all`, null];
    },
    setTableDone: (state) => {
      state.todoPageLayout = [`table`, `done`, null];
    },
  },
});

export const {
  changeTodoFilterLayout,
  setThreeColAll,
  setThreeColDone,
  setOneColAll,
  setOneColDone,
  setTableAll,
  setTableDone,
} = todoLayoutSlice.actions;

export default todoLayoutSlice.reducer;
