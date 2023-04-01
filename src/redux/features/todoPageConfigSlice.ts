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

export interface ITodoDrawer {
  open: Boolean;
  state: String;
  anchor: String;
  item: {
    _id: String;
    body: String;
    flag: String;
    categoId: String;
    owner: String;
    date: Date | String;
  };
}

export interface ITodoPage {
  active_ws: IActiveWs;
  active_category: IActiveWs;
  drawer: ITodoDrawer;
  get_out: Boolean;
  searchMode: Boolean;
  searchText: String;
  sidebar_open: Boolean;
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
  drawer: {
    open: false,
    state: "todo",
    anchor: "right",
    item: { _id: "", body: "", flag: "", categoId: "", owner: "", date: "" },
  },
  get_out: false,
  searchMode: false,
  searchText: "",
  sidebar_open: true,
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
    DrawerOpen: (state, action) => {
      state.drawer = {
        open: true,
        state: action.payload.state,
        anchor: "right",
        item: action.payload.item,
      };
    },
    DrawerClose: (state) => {
      state.drawer = {
        open: false,
        state: "right",
        anchor: state.drawer.anchor,
        item: {
          _id: "",
          body: "",
          flag: "",
          categoId: "",
          owner: "",
          date: "",
        },
      };
    },
    SearchModeActive: (state) => {
      state.searchMode = true;
    },
    SearchModeDeActive: (state) => {
      state.searchMode = false;
    },
    ChangeSearchText: (state, action) => {
      state.searchText = action.payload.text;
    },
    EmptySearchText: (state) => {
      state.searchText = "";
    },
    OpenSidebar: (state) => {
      state.sidebar_open = true;
    },
    CloseSidebar: (state) => {
      state.sidebar_open = false;
    },
    ToggleSidebar: (state) => {
      if (state.sidebar_open) {
        state.sidebar_open = false;
      } else {
        state.sidebar_open = true;
      }
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
  DrawerOpen,
  DrawerClose,
  SearchModeActive,
  SearchModeDeActive,
  ChangeSearchText,
  EmptySearchText,
  OpenSidebar,
  CloseSidebar,
  ToggleSidebar,
} = todoPageConfigSlice.actions;
export default todoPageConfigSlice.reducer;
