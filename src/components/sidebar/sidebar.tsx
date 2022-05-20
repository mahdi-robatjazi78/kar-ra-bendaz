import React, { useContext, useState } from "react";
import themeContext from "../../context/colorModeContext";
import { FiChevronRight } from "react-icons/fi";
import { RiRestaurant2Line } from "react-icons/ri"



const Sidebar = () => {
  const theme = useContext(themeContext);

  const sidebarStyle = {
    width: 280,
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
  };

  const [mainTabs, setMainTabs] = useState([
    { name: "Todos", active: false },
    { name: "Calender", active: false },
    { name: "Games", active: false },
    { name: "About me", active: false },
  ]);
  const subsetTabsTodos = {
    Todos: ["All Todos", "Done", "Trash", "You'r List"],
  };

  const showSubset = (id) => {
    console.log(id);

    setMainTabs((prevState) => {
      return prevState.map((item, index) => {
        if (index === id) {
          
          
          
          return item.active === false
            ? { ...item, active: true }
            : { ...item, active: false }



        } else return item;
      });
    });
  };

  return (
    <div style={sidebarStyle}>
      {mainTabs.map((tab, id) => (
        <div key={id}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: ".5rem 0",
            }}
            onClick={() => showSubset(id)}
          >
            <strong style={mainTabsStyle}>{tab.name}</strong> <FiChevronRight />{" "}
          </div>
          {tab.active && (
            <>
              {subsetTabsTodos.Todos.map((item, index) => (
                <ul>
                  <li><strong>{item}</strong> </li>
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
