import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { handleLogoutUser } from "@/services/api";
import CustomeHistory from "@/services/customeHistory";
import { store } from "@/redux/store";
import { deactiveBlur, setBlurPage } from "@/redux/features/settingSlice";
import { getLocalStorageValue } from "@/util/funcs";

const UnAuthenticatedModal = () => {
  const MySwal = withReactContent(Swal);

  const showAlertExpirationAccout = () => {
    const darkMode = getLocalStorageValue("auth");

    MySwal.fire({
      title: "Expiration Token",
      icon: "info",
      confirmButtonText: "Go To Login",
      customClass: {
        popup: darkMode ? "Modal_DrakModeLogout" : "Modal_LightModeLogout",
        title: darkMode ? "Modal_TitleBar_Dark" : "Modal_TitleBar_Light",
        confirmButton: darkMode
          ? "Modal_Confirm_Button_FullWidth_Dark"
          : "Modal_Confirm_Button_FullWidth_Light",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        store.dispatch(deactiveBlur());
        handleLogoutUser();
        CustomeHistory.replace("/login");
      }
      if (result.isDismissed) {
        store.dispatch(deactiveBlur());
      }
    });
  };
  showAlertExpirationAccout();
};

export default UnAuthenticatedModal;
