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



export interface IUserMeData {
  email: string | null;
  fname: string | null;
  lname: string | null;
  userName: string | null;
  accountType:string | null;
  gender:string | 'unknown';
  picture:{
    avatar: string | null,
    banner: string | null
  }
}
export interface IUser {
  token: string;
  me: IUserMeData;
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
  todoSum:number;
  __v:number;
}



export interface ITheme {
  foreground: string;
  background: string;
  borders: string;
  errorBorder: string;
  sidebar: string;
  secondSidebar: string;
  text1: string;
  text2: string;
  header: string;
  text3: string;
  hoverSuccess: string;
  isDarkMode: boolean;
  toggleDark(): void;
  setDark(): void;
  setLight(): void;
}


export interface ITodoPageLayoutSliceStructure {
  todoPageLayout: Array<String | Number | null>;
  todoFilterLayout: {
    filter: String;
    config: {
      start: Number | String;
      end: Number | String;
    };
  };
}



export const EmailValidateRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
