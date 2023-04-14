

export interface ITodoLayoutConfig {
  show:["3col" | "1col" | "table" , "all" | "done" , null|2|3|4|5|6] 
  setThreeColAll?:(number:number) =>void,
  setThreeColDone?:(number:number) =>void,
  setOneColAll?:()=>void,
  setOneColDone?:()=>void,
  setTableAll?:()=>void,
  setTableDone?:()=>void
  handlePresentAndFilterTodoLayout:(id : "1col" | "3col" | "table" | "all" | "done", n:null | Number)=>void,
  todoFilterLayout:{filter:String , config:{start:Number,end:Number}},
  changeTodoFilterLayout:(filtername : String)=>void;
}
export interface ITodoStructure {
  body:string,
  date:Date,
  expireTime:string,
  flag:string,
  categoId:string,
  ws:string,
}
 