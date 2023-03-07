import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../services/api";

export interface IActiveWs {
  id: String | null;
  title: String | null;
}

export interface IActiveCategory {
  id: String | null;
  title: String | null;
}

export interface ITodoPage {
  active_ws: IActiveWs;
  active_category: IActiveWs;
  get_out: Boolean;
}

const initialState: ITodoPage = {
  active_ws: {
    id: null,
    title: null,
  },
  active_category: {
    id: null,
    title: null,
  },
  get_out: false,
};

export const todoPageConfigSlice = createSlice({
  name: "todo-page-slice",
  initialState,
  reducers: {
    SetActiveWs: (state, action) => {
      state.active_ws = {
        id: action.payload.id,
        title: action.payload.title,
      };
    },
    UnActiveWs: (state) => {
      state.active_ws = {
        id: null,
        title: null,
      };
    },
    SetActiveCategory: (state, action) => {
      state.active_category = {
        id: action.payload.id,
        title: action.payload.title,
      };
    },
    UnActiveCategory: (state) => {
      state.active_category = {
        id: null,
        title: null,
      };
    },
    NoActiveWorkspace: (state) => {
      state.get_out = true;
    },
    GetOutCompleted: (state) => {
      state.get_out = false;
    },
  },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchActiveWs.fulfilled, (state, action) => {
      state.active_ws = {
        id: action.payload.activeWorkspace.id,
        title: action.payload.activeWorkspace.title,
      };
    });
    builder.addCase(fetchActiveWs.rejected, (state, action) => {
      state.active_ws = {
        id: null,
        title: null,
      };
      state.get_out = true;
    });
  },
});

export const fetchActiveWs = createAsyncThunk(
  "todoPageConfig/ActiveWs",
  async () => {
    try {
      const response = await axios.get("/ws/get-active");
      console.log("response >>>  ", response);
      if (response.data.activeWorkspace) {
        return response.data;
      }
    } catch (error) {
      return Promise.reject(error.reponse.data.msg);
    }
  }
);

export const {
  SetActiveWs,
  UnActiveWs,
  SetActiveCategory,
  UnActiveCategory,
  NoActiveWorkspace,
  GetOutCompleted,
} = todoPageConfigSlice.actions;
export default todoPageConfigSlice.reducer;
