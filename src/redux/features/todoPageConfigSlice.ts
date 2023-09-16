import { createSlice } from "@reduxjs/toolkit";

export interface IActiveWs {
  id: string | null;
  title: string | null;
}

export interface IActiveCategory {
  id: string | null;
  title: string | null;
}

export interface ITodoDrawer {
  
  open: boolean;
  state: string;
  anchor: string;
  item: {
    _id: string;
    body: string;
    flag: string;
    categoId: string;
    owner: string;
    priority: number;
    date: Date | string;
  };
}
export interface IMeta {
  page: number ;
  limit: number ;
  total_items: number ;
  total_pages: number ;
}
export interface IMouseSelected {
  count: number;
  entity: string; // todo , category
  items: { boxTodoId: String; innerTodoText: String }[];
}


export interface IFilterBy {
  filter_name : string,
  filter_data :  any
}

export interface ITodoPage {
  filter_by:IFilterBy,
  active_ws: IActiveWs;
  active_category: IActiveWs;
  drawer: ITodoDrawer;
  
  searchMode: boolean;
  searchText: string;
  sidebar_open: boolean;
  meta: IMeta;
  layout_nav_show: boolean;
  mouse_selected_items: IMouseSelected;
  layout: Array<string | number | null>;
}

const initialState: ITodoPage = {
  filter_by:{
    filter_name : '',
    filter_data : {}
  },
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
    item: {
      _id: "",
      body: "",
      flag: "",
      categoId: "",
      owner: "",
      date: "",
      priority: null,
    },
  },
  meta: {
    page: 1,
    limit: 50,
    total_items: null,
    total_pages: null,
  }, 
  searchMode: false,
  searchText: "",
  sidebar_open: true,
  layout_nav_show: true,
  mouse_selected_items: {
    count: 0,
    entity: "", // todo , category
    items: [],
  },
  layout: ["3col", "all", 3],
};

export const todoPageConfigSlice = createSlice({
  name: "todo-page-slice",
  initialState,
  reducers: {

    SetNoFilter:(state,action)=>{
      state.filter_by = {filter_name : '' , filter_data:{}}
    },

    SetNewFilter:(state,action)=>{
      state.filter_by = {
        filter_name : action.payload.filter_name,
        filter_data : action.payload.filter_data ? action.payload.filter_data : {}
      }
    },

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
 
   
    DrawerOpen: (state, action) => {
      state.drawer = {
        open: true,
        state: action.payload.state,
        anchor: "right",
        item: action.payload.item,
      };
    },
    ChangePriorityDrawer: (state, action) => {
      state.drawer = {
        ...state.drawer,
        item: { ...state.drawer.item, priority: action.payload },
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
          priority: null,
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
    handleChangeMetaItem: (state, action) => {
      console.log(action.payload);
      state.meta = {
        page: action?.payload?.page ,
        limit: action?.payload?.limit,
        total_items: action?.payload?.total_items,
        total_pages: action?.payload?.total_pages,
      };
    },
    showLayoutNav: (state) => {
      state.layout_nav_show = true;
    },
    hideLayoutNav: (state) => {
      state.layout_nav_show = false;
    },

    AddMouseSelectedItems: (state, action) => {
      state.mouse_selected_items = {
        count: action.payload.count,
        entity: action.payload.entity,
        items: action.payload.items,
      };
    },
    AddNewMouseSelectedItems: (state, action) => {
      state.mouse_selected_items = {
        count: +state?.mouse_selected_items?.count + 1,
        entity: action.payload.entity,
        items: [...state.mouse_selected_items?.items, action.payload.newItem],
      };
    },
    clearMouseSelectedItems: (state) => {
      state.mouse_selected_items = { count: 0, entity: "", items: [] };
    },
    removeMouseSelectedItemWithId: (state, action) => {
      const elements = document.querySelectorAll(".mouse-drag-selected");

      elements.forEach(function (element) {
        const boxTodoId = element.getAttribute("box-todo-id");

        if (boxTodoId === action.payload.id) {
          element.classList.remove("mouse-drag-selected");
        }
      });

      state.mouse_selected_items = {
        count: +state.mouse_selected_items.count - 1,
        entity: state.mouse_selected_items.entity,
        items: state.mouse_selected_items.items.filter(
          (item) => item?.boxTodoId !== action.payload.id
        ),
      };
    },

    todosLayoutChange: (state, action) => {
      state.layout = action.payload;
    },
  },
});

export const {
  SetActiveWs,
  UnActiveWs,
  SetActiveCategory,
  UnActiveCategory,
  // NoActiveWorkspace,
 
  DrawerOpen,
  ChangePriorityDrawer,
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
  AddNewMouseSelectedItems,
  clearMouseSelectedItems,
  removeMouseSelectedItemWithId,
  todosLayoutChange,
  SetNoFilter,
  SetNewFilter
} = todoPageConfigSlice.actions;
export default todoPageConfigSlice.reducer;
