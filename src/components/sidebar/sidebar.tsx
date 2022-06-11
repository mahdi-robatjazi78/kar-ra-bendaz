import React, { useContext, useState } from "react";
import themeContext from "../../context/colorModeContext";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { RiRestaurant2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { TodoContext } from "../../context/todoContext";
const Sidebar = () => {
  const theme = useContext(themeContext);
  const {
    show,
    setThreeColAll,
    setThreeColDone,
    setOneColAll,
    setOneColDone,
    setTableAll,
    setTableDone,
  } = useContext(TodoContext);

  const sidebarStyle = {
    // minWidth: 150,
    // maxWidth: 150,
    // width:"100%",
    height: "100vh",
    backgroundColor: theme.sidebar,
    margin: "none",
    padding: "2rem 1.5rem",
    overflow: "hidden",
    marginRight: 10,
  };

  const mainTabsStyle = {
    cursor: "pointer",
    fontSize: "1.2rem",
    color: theme.text1,
  };
  const subsetTabsStyle = {
    color: theme.text3,
    cursor: "pointer",
  };
  const [mainTabs, setMainTabs] = useState([
    { name: "Todos", link: "todos", active: false },
    { name: "Notes", link: "notes", active: false },
    // { name: "Calender", link: "calender", active: false },
    // { name: "Games", link: "games", active: false },
    // { name: "About me", link: "about", active: false },
  ]);
  type ITodoState = "all" | "done";
  const [todoState, setTodoState] = useState<ITodoState>("all");

  const subsetTabsTodos = {
    Todos: [
      { id: "all", title: "All Todos" },
      { id: "done", title: "Is Done" },
      { id: "3col", title: "3 Column" },
      { id: "1col", title: "1 Column" },
      { id: "table", title: "Table" },
    ],
  };

  const showSubset = (id: number) => {
    console.log(id);

    setMainTabs((prevState) => {
      return prevState.map((item, index) => {
        if (index === id) {
          return item.active === false
            ? { ...item, active: true }
            : { ...item, active: false };
        } else return { ...item, active: false };
      });
    });
  };

  const showTodos = (id: string) => {
    switch (id) {
      case "all": {
        setTodoState('all')
        if (show[0] === "3col") setThreeColAll();
        if (show[0] === "1col") setOneColAll();
        if (show[0] === "table") setTableAll();
        break;
      }
      case "done": {
        setTodoState('done')

        if (show[0] === "3col") setThreeColDone();
        if (show[0] === "1col") setOneColDone();
        if (show[0] === "table") setTableDone();
        break;
      }
      case "3col": {
        todoState === "all" ? setThreeColAll() : setThreeColDone();

        break;
      }
      case "1col": {
        todoState === "all" ? setOneColAll() : setOneColDone();

        break;
      }
      case "table": {
        todoState === "all" ? setTableAll() : setTableDone();
        break;
      }
      default:
        setThreeColAll();
    }
  };

  return (
    <div style={sidebarStyle}>
      {mainTabs.map((tab, id) => (
        <div key={id}>
          <Link to={tab.link}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: ".5rem 0",
              }}
              onClick={() => showSubset(id)}
            >
              <strong style={mainTabsStyle}>{tab.name}</strong>{" "}
              {tab.active ? (
                <FiChevronRight color={theme.text1} />
              ) : (
                <FiChevronDown color={theme.text1} />
              )}
            </div>
          </Link>
          {tab.active && (
            <>
              {subsetTabsTodos.Todos.map((item, index) => (
                <ul key={index}>
                  <li onClick={() => showTodos(item.id)}>
                    <strong style={subsetTabsStyle}>{item.title}</strong>{" "}
                  </li>
                </ul>
              ))}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
