import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { handleLogoutUser } from "@/services/api";
import CustomeHistory from "@/services/customeHistory";
import { RootState, store } from "@/redux/store";
import { deactiveBlur, setBlurPage } from "@/redux/features/settingSlice";

const UnAuthenticatedModal = () => {
  const MySwal = withReactContent(Swal);
  const mode = store.getState().settings.theme.mode;

  const showAlertExpirationAccout = () => {
    MySwal.fire({
      title: "Expiration Token",
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
