import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../services/api";
// import { getLocalStorageValue, setTodoPageLocalSettings } from "@/util/funcs";

export interface IActiveWs {
  id: string | null;
  title: string | null;
}

export interface IActiveCategory {
  id: string | null;
  title: string | null;
}

export interface ITodoDrawer {
  open: Boolean;
  state: string;
  anchor: string;
  item: {
    _id: string;
    body: string;
    flag: string;
    categoId: string;
    owner: string;
    date: Date | string;
  };
}
export interface IMeta {
  page: Number | null,
  limit: Number | null,
  total_items: Number | null,
  total_pages: Number | null,
}
export interface IMouseSelected {
  
  count: Number ,
  entity:String, // todo , category
  items: {boxTodoId:String , innerTodoText:String}[]
}

export interface ITodoPage {
  active_ws: IActiveWs;
  active_category: IActiveWs;
  drawer: ITodoDrawer;
  get_out: Boolean;
  searchMode: Boolean;
  searchText: String;
  sidebar_open: Boolean;
  meta : IMeta,
  layout_nav_show: Boolean,
  mouse_selected_items:IMouseSelected
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
  meta:{
    page: 1,
    limit: 15,
    total_items: null,
    total_pages: null,
  },
  get_out: false,
  searchMode: false,
  searchText: "",
  sidebar_open: true,
  layout_nav_show: true,
  mouse_selected_items: {
    count: 0,
    entity:"" , // todo , category
    items:[]
  }
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
    handleChangeMetaItem:(state , action)=>{
      state.meta = {
        page : action?.payload?.page || state.meta.page,
        limit : action?.payload?.limit || state.meta.limit,
        total_items : action?.payload?.total_items || state.meta.total_items,
        total_pages : action?.payload?.total_pages || state.meta.total_pages,
      }
    },
    showLayoutNav:(state)=>{
      state.layout_nav_show = true;
    },
    hideLayoutNav:(state)=>{
      state.layout_nav_show = false;
    }, 

    AddMouseSelectedItems: (state,action) => { 
      state.mouse_selected_items = {
        count:action.payload.count,
        entity: action.payload.entity,
        items:action.payload.items,
      }
    },
    clearMouseSelectedItems: (state) => { state.mouse_selected_items = { count: 0, entity: '', items: [] } },
    removeMouseSelectedItemWithId: (state, action) => {
      
 const elements = document.querySelectorAll(".mouse-drag-selected");

      elements.forEach(function (element) {
        const boxTodoId = element.getAttribute("box-todo-id")

        if (boxTodoId === action.payload.id) {
            element.classList.remove("mouse-drag-selected");
        }
    });
      
      
      
      
      state.mouse_selected_items = {
        count: +state.mouse_selected_items.count -1,
        entity: state.mouse_selected_items.entity,
        items:state.mouse_selected_items.items.filter(item=>item?.boxTodoId !== action.payload.id),
      }

    }
    
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
  handleChangeMetaItem,
  showLayoutNav,
  hideLayoutNav,
  AddMouseSelectedItems,
  clearMouseSelectedItems,
 removeMouseSelectedItemWithId 
} = todoPageConfigSlice.actions;
export default todoPageConfigSlice.reducer;
