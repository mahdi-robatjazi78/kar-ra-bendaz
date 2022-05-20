import React, { useContext, useState } from "react";
import ThemeContext from "../context/colorModeContext";
import Sidebar from './sidebar/sidebar'
import SidebarContext from "../context/sidebarContext"
import Notifications from "./notifcations";


 interface IPerson {
   person:{
     name:string;
     age:number;
     isYoung:boolean;
    }[]

}

const Home = () => {
  const theme = useContext(ThemeContext);
  const {open} = useContext(SidebarContext)
 
 


  // const [person ,setPerson] =useState<string[]> (['mahdi robatjazi','zahra mashkani'])


  return (<div style={{color:theme.text1 , display:"flex"}}>
     
     {
       open === "show" && (
         <Sidebar />

       )
     }


      <Notifications   />




  </div>
    )
};

export default Home;
