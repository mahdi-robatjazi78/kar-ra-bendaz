import React , {useState,useContext,useEffect} from 'react'
import {useLocation , useNavigate} from "react-router-dom"

import { SidebarContext } from '../../context/sidebarContext'
import {AppDataContext} from "@context/appDataContext"


import "./burgerStyles.css"
const Burger = () => {
    const {setOpenSidebar , setCloseSidebar} = useContext(SidebarContext)
    const [open , setOpen]= useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const {newCategorySelected} = useContext(AppDataContext)

 


    useEffect(()=>{
      if(open){
        setOpenSidebar();
        newCategorySelected()
      }
      else{
        setCloseSidebar()
        
      
      
      }
    } , [open])


    useEffect(()=>{
      if(location.pathname === "/todos"){  
        setTimeout(()=>{setOpen(true)} , 1000)
      }else{
        setOpen(false)
      }
    },[location.pathname])
  


  return (
    <div id="container-burger" onClick={()=>{
        navigate("/todos")
      
      setOpen(!open)}}>
    <div id="nav-icon3" className={open ? "open" : ''}>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
  </div>
  )
}

export default Burger