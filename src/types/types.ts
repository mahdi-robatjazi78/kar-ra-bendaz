export interface ITodoLayoutConfig {
  show: Array<String | Number | null>;
  setThreeColAll?: (number: number) => void;
  setThreeColDone?: (number: number) => void;
  setOneColAll?: () => void;
  setOneColDone?: () => void;
  setTableAll?: () => void;
  setTableDone?: () => void;
  handlePresentAndFilterTodoLayout: (
    id: "1col" | "3col" | "table" | "all" | "done",
    n: null | Number
  ) => void;
  todoFilterLayout: { filter: String; config: { start: Number; end: Number } };
  changeTodoFilterLayout: (filtername: String) => void;
}
export interface ITodoStructure {
  body: string;
  date: Date;
  expireTime: string;
  flag: string;
  categoId: string;
  ws: string;
}


export interface IWsStructure {
  _id:string;
  title:string;
  date:string;
  owner:string;
  id:string;
  active:Boolean;
  categorySum:number;
  todoSum:number;
  __v:number;
}
