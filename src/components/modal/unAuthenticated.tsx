import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import history from "@/services/appHistory";
import { store } from "@/redux/store";
import {deactiveBlur, handleSettingModalClose} from "@/redux/features/settingSlice";
import { LogoutAction } from "@/redux/features/userSlice";

const UnAuthenticatedModal = () => {
  const MySwal = withReactContent(Swal);
  const mode = store.getState().settings.theme.mode;
  if(store.getState().settings.modal.open){
    store.dispatch(handleSettingModalClose())
  }

  const showAlertExpirationAccout = () => {
    MySwal.fire({
      title: "Token Expired",
      icon: "info",
      confirmButtonText: "Go To Login",
      customClass: {
        popup:
          mode === "dark" ? "Modal_DrakModeLogout" : "Modal_LightModeLogout",
        title: mode === "dark" ? "Modal_TitleBar_Dark" : "Modal_TitleBar_Light",
        confirmButton:
          mode === "dark"
            ? "Modal_Confirm_Button_FullWidth_Dark"
            : "Modal_Confirm_Button_FullWidth_Light",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        store.dispatch(deactiveBlur());
        store.dispatch(LogoutAction({}));


        history.replace("/login");
      }
      if (result.isDismissed) {
        store.dispatch(deactiveBlur());
      }
    });
  };

    showAlertExpirationAccout();
  
};

export default UnAuthenticatedModal;
