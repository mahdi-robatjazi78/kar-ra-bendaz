import React from 'react'
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { handleLogoutUser } from '@/services/api';
import CustomeHistory from '@/services/customeHistory';

const UnAuthenticatedModal = () => {



const MySwal = withReactContent(Swal);

const showAlertExpirationAccout = () => {
    const darkMode = JSON.parse(localStorage.getItem("darkmode"));
  
    MySwal.fire({
      title: "Expiration Token",
      html: `You'r Token Has Been Expire`,
      icon: "info",
      confirmButtonText: "Go To Login",
  
      customClass: {
        popup: darkMode ? "Modal_DrakMode" : "Modal_LightMode",
        title: darkMode ? "Modal_TitleBar_Dark" : "Modal_TitleBar_Light",
        confirmButton: darkMode
          ? "Modal_Confirm_Button_FullWidth_Dark"
          : "Modal_Confirm_Button_FullWidth_Light",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogoutUser();
        CustomeHistory.replace("/login");
      }
    });
  };

  showAlertExpirationAccout()


  return (
    <span></span>
  )
}

export default UnAuthenticatedModal