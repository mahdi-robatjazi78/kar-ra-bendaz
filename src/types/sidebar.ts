export interface ISidebar {
  open:"show" | "hide",
  setToggleSidebar?:()=>void
  setOpenSidebar?:()=>void
  setCloseSidebar?:()=>void
}
