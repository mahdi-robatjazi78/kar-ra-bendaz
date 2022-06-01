import React, { useContext, useState } from "react";
import themeContext from "../../context/colorModeContext";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { RiRestaurant2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const theme = useContext(themeContext);

  const sidebarStyle = {
    minWidth: 250,
    maxWidth: 250,
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
    { name: "Calender", link: "calender", active: false },
    { name: "Games", link: "games", active: false },
    { name: "About me", link: "about", active: false },
  ]);
  const subsetTabsTodos = {
    Todos: ["All Todos", "Done", "Trash", "Notes"], 
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
                <ul>
                  <li>
                    <strong style={subsetTabsStyle}>{item}</strong>{" "}
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
