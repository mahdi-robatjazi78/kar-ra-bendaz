export interface ISidebar {
  open:"show" | "hide",
  setToggle?:()=>void
  setOpen?:()=>void
  setClose?:()=>void
}
