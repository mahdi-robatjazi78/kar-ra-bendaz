// import UnAuthenticatedModal from "@/components/modal/unAuthenticated";
// import {
//   changeHeaderPosition,
//   handleListenFromOs,
// } from "@/redux/features/settingSlice";
// import { showLayoutNav } from "@/redux/features/todoPageConfigSlice";

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

export const truncateText = (text: string, size: number) => {
  return text.length > size ? text.slice(0, size - 1) + "…" : text;
};

// export const localStorageSetFirstEssentials = (dispatch, setThreeColAll) => {

// 	if (!localStorage.getItem("auth")) { UnAuthenticatedModal() }
// 	if (!localStorage.getItem("darkmode")) { setCommonLocalSettings('darkmode', false) }
// 	if (!localStorage.getItem("use-sound")) { setCommonLocalSettings('use-sound', false) }
// 	if (!localStorage.getItem("header-pos")) { setCommonLocalSettings('header-pos', "top") } else {

// 		console.log("localStorage", localStorage.getItem('header-pos'))
// 		dispatch(changeHeaderPosition(JSON.parse(localStorage.getItem("header-pos"))))
// 	}
// 	if (!localStorage.getItem("theme-read-from-os")) { setCommonLocalSettings('theme-read-from-os', false) } else {
// 		dispatch(handleListenFromOs(JSON.parse(localStorage.getItem("theme-read-from-os"))))

// 	}
// 	if (!localStorage.getItem("blur-size")) { setCommonLocalSettings('blur-size', 50) }
// 	if (!localStorage.getItem("todoPage")) {
// 		const todoPageDefault = {
// 			layout: ["3col", "all", 3],
// 			"show-layout-nav": true,
// 			filter: "all",
// 		}
// 		setCommonLocalSettings("todoPage", todoPageDefault)
// 		dispatch(showLayoutNav())
// 		setThreeColAll()
// 	}
// }

export const setCommonLocalSettings = (item: string, value: any) => {
  localStorage.setItem(item, JSON.stringify(value));
};

export const setTodoPageLocalSettings = (item: string, value: any) => {
  const todoPage = JSON.parse(localStorage.getItem("todoPage"));
  todoPage[item] = value;
  setCommonLocalSettings("todoPage", todoPage);
};

export const getLocalStorageValue = (item: string) => {
  if (item.startsWith("todoPage")) {
    const todoPageConfigRequested = item.split(".");
    const todoPageLocal = JSON.parse(localStorage.getItem("todoPage"));
    if (todoPageLocal) {
      const result = todoPageLocal[todoPageConfigRequested[1]];
      if (result) {
        return result;
      }
      return null;
    } else {
      return null;
    }
  }
  return JSON.parse(localStorage.getItem(item));
};

export const removeLocalSettings = (item: string) => {
  localStorage.removeItem(item);
};

export const clearLocalStorage = (item: string) => {
  localStorage.clear();
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
