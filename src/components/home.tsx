import React, { useContext, useState } from "react";
import ThemeContext from "../context/colorModeContext";

  import {SidebarContext} from "../context/sidebarContext";
import Notifications from "./notifcations";
import { BrowserRouter ,Routes, Route } from "react-router-dom";
import Todos from "./Todos";

interface IPerson {
  person: {
    name: string;
    age: number;
    isYoung: boolean;
  }[];
}

const Home = () => {
  const theme = useContext(ThemeContext);
  const { open } = useContext(SidebarContext);

  // const [person ,setPerson] =useState<string[]> (['mahdi robatjazi','zahra mashkani'])

  return (
    <div style={{ color: theme.text1, display: "flex" }}>
      
      <Notifications />
    </div>
  );
};

export default Home;
