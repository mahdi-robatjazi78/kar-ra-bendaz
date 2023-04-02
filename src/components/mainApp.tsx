import React , {useState} from "react";
import Header from "./header";
import { useDispatch, useSelector } from "react-redux";

import RouteBox from "./routeBox";
import { Box } from "@mui/material";
import { SetMeData, SetUserToken } from "@/redux/features/userSlice";
import { RootState } from "@/redux/store";
import SettingModal from "./modal/settingModal";
import { deactiveBlur, setBlurPage } from "@/redux/features/settingSlice";
import { useHotkeys } from "react-hotkeys-hook";



const Main = () => { 
  const [ShowBurger, setShowBurger] = React.useState<boolean>(true);
  const auth = useSelector((state : RootState)=>state.auth)
  const {headerPosition} = useSelector((state : RootState)=>state.settings)
  const dispatch = useDispatch();

  const checkProfileDataEssentials = () =>{
    if(!auth.token){
      const authLocalStorage = JSON.parse(localStorage.getItem("auth"))
      
      const token = authLocalStorage?.token
      if(token){

        const {email ,fname,lname ,gender , userName} = authLocalStorage.me
        dispatch(SetUserToken({
          token
        }))
        dispatch(SetMeData({
          email ,fname,lname ,gender , userName,
        }))
        
      }
      
    }
  }

  checkProfileDataEssentials()



  const [settingModalOpen , setOpenSettingModal]  = useState(false)
  const handleCloseSettingModal = ()=>{
    
      dispatch(deactiveBlur())
    setOpenSettingModal(false)}
  const handleOpenSettingModal = ()=>{
    dispatch(setBlurPage())
    setOpenSettingModal(true)
  }
  useHotkeys("ctrl+shift+s", () =>{handleOpenSettingModal()})


  return (

    <main id="main">
      <Box
        id="App"
        flexDirection={
          headerPosition === "top"
            ? "column"
            : headerPosition === "bottom"
            ? "column-reverse"
            : headerPosition === "left"
            ? "row"
            : headerPosition === "right"
            ? "row-reverse"
            : "row"
        }
      >
        <Header handleOpenSettingModal={handleOpenSettingModal}  />
        <RouteBox setShowBurger={setShowBurger} />





        <SettingModal
        settingModalOpen={settingModalOpen}
        handleClose={handleCloseSettingModal}
        
        />






      </Box>
    </main>
  );
};


export default Main;
