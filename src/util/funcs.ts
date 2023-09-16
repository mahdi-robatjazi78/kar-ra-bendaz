import UnAuthenticatedModal from "@/components/modal/unAuthenticated";
import { setBlurPage } from "@/redux/features/settingSlice";
import {
  changeTodoFilterLayout,
  setOneColAll,
  setOneColDone,
  setTableAll,
  setTableDone,
  setThreeColAll,
  setThreeColDone,
} from "@/redux/features/todoLayoutSlice";
import { store } from "@/redux/store";
import Toast from "./toast";
import { clearMouseSelectedItems } from "@/redux/features/todoPageConfigSlice";
import { franc } from "franc";
export const truncateText = (text: string, size: number) => {
  return text.length > size ? text.slice(0, size - 1) + "…" : text;
};

export const soundPlay = (soundName) => {
  let tinung = `${window.location.origin}/assets/sounds/${soundName}`;
  let audio = document.createElement("audio");

  audio.autoplay = true;
  audio.load();

  audio.addEventListener(
    "load",
    function () {
      audio.play();
    },
    true
  );
  audio.src = tinung;
};

export const handlePresentAndFilterTodoLayout = (id: string, n = null) => {
  const dispatch = store.dispatch;
  const todoPageLayout = store.getState().todoLayout.todoPageLayout;

  switch (id) {
    case "all": {
      dispatch(changeTodoFilterLayout("all"));
      if (todoPageLayout[0] === "3col") dispatch(setThreeColAll(n));
      if (todoPageLayout[0] === "1col") dispatch(setOneColAll());
      if (todoPageLayout[0] === "table") dispatch(setTableAll());
      break;
    }
    case "done": {
      dispatch(changeTodoFilterLayout("done"));

      if (todoPageLayout[0] === "3col") dispatch(setThreeColDone(n));
      if (todoPageLayout[0] === "1col") dispatch(setOneColDone());
      if (todoPageLayout[0] === "table") dispatch(setTableDone());
      break;
    }
    case "3col": {
      todoPageLayout[1] === "all"
        ? dispatch(setThreeColAll(n))
        : dispatch(setThreeColDone(n));
      break;
    }
    case "1col": {
      todoPageLayout[1] === "all"
        ? dispatch(setOneColAll())
        : dispatch(setOneColDone());
      break;
    }
    case "table": {
      todoPageLayout[1] === "all"
        ? dispatch(setTableAll())
        : dispatch(setTableDone());
      break;
    }
    default:
      break;
  }
};

export const handleResponseError = (error) => {
  if (
    (error.status === 401 || error.status === 403) &&
    store.getState().auth.token
  ) {
    if (store.getState().settings.playSound) {
      soundPlay("sound10_error2.mp3");
    }

    UnAuthenticatedModal();
  } else {
    if (store.getState().settings.playSound) {
      soundPlay("sound9_error1.wav");
    }

    Toast(error.msg ? error.msg : error.data.msg, false, true);
  }
};

export const deselectAllTodos = () => {
  const elements = document.querySelectorAll(".mouse-drag-selected");
  if (elements.length) {
    elements.forEach(function (element) {
      element.classList.remove("mouse-drag-selected");
    });
  }
  store.dispatch(clearMouseSelectedItems());
};

export const pairColors = (c1, c2, darkmode) => {
  /* c1 is light color
   c2 is  dark color
   theme light or dark */

  if (!darkmode) {
    return c1;
  } else {
    return c2;
  }
};


export const removeHTMLTags=(input)=> {
  return input.replace(/<[^>]*>/g, '');
}
export const checkPersian = (txt:string)=>{
  return franc(txt) === "prs" || franc(txt) === "pes" || franc(txt) === "urd" ||  franc(txt) === "arb"
}
export const handleCheckPersianAndRemoveHtmlTags = (txt:string)=>{
  if(!txt)return false;
  return checkPersian(removeHTMLTags(txt))
}