export interface ISidebar {
  open:"show" | "hide",
  setToggleSidebar?:()=>void
  setOpenSidebar?:()=>void
  setCloseSidebar?:()=>void
}

export interface ITodosShow {
  show:["3col" | "1col" | "table" , "all" | "done"] 
  setThreeColAll?:()=>void,
  setThreeColDone?:()=>void,
  setOneColAll?:()=>void,
  setOneColDone?:()=>void,
  setTableAll?:()=>void,
  setTableDone?:()=>void
}