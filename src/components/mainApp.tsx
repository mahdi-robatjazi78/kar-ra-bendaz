import React , {useState} from "react";
import Header from "./header";
import { useDispatch, useSelector } from "react-redux";
import RouteBox from "./routeBox";
import { Box } from "@mui/material";
import { SetMeData, SetUserToken } from "@/redux/features/userSlice";
import { RootState } from "@/redux/store";
import SettingModal from "./modal/settingModal";
import { handleSettingModalOpen , handleSettingModalClose, setBlurPage, deactiveBlur } from "@/redux/features/settingSlice";
import { useHotkeys } from "react-hotkeys-hook";

const Main = () => { 
  const [ setShowBurger] = React.useState<boolean>(true);
  const auth = useSelector((state : RootState)=>state.auth)
  const {headerPosition , modal} = useSelector((state : RootState)=>state.settings)
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
 
  const handleCloseSettingModal = ()=>{
    dispatch(deactiveBlur())
    dispatch(handleSettingModalClose())
  }
  const handleOpenSettingModal = ()=>{
    dispatch(setBlurPage())
    dispatch(handleSettingModalOpen({}))
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
          settingModalOpen={modal.open}
          handleClose={handleCloseSettingModal}
        
        />

      </Box>
    </main>
  );
};


export default Main;
