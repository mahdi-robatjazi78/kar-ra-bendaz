import axios from "axios";
import CustomeHistory from "./customeHistory";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Toast from "@utils/toast";
import UnAuthenticatedModal from "@/components/modal/unAuthenticated";
import { store } from "@/redux/store";

let base_url :string = `http://localhost:8888` ;

// if (process.env.NODE_ENV === "development") {
//   console.log("Looks like we are in development mode! 🙄");
//   base_url = `http://localhost:8888`;
// } else {
//   console.log("Looks like we are in production mode! 👍");
//   base_url = `http://45.156.186.14:8888`;
// }

const MySwal = withReactContent(Swal);

export const handleLogoutUser = async () => {
  try {
    const response = await axios.put(`${base_url}/users/logout`);
    if (response.status === 200) {
      localStorage.removeItem("auth")
      store.dispatch(LogoutAction())
    
    
    }
  } catch (error) {
    console.log(error.response);
  }
};



export const handleResponseError = (error)=>{
  if(error.status === 401 || error.status === 403){
    UnAuthenticatedModal()
  }
}





const instance = axios.create({
  // baseURL:"https://hardcore-visvesvaraya-fovq7genw.iran.liara.run",
  baseURL: base_url,
  timeout: 1000,
});

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

instance.interceptors.request.use(function(request) {
    const auth = JSON.parse(localStorage.getItem("auth"))
    request.headers.common["x-auth-token"] = auth.token;
    request.headers.common["Content-Type"] = "application/json";
    if(!auth?.token){
      showAlertExpirationAccout();
    }
  return request;
});

instance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    Toast(error.response.data.msg || error.response.data.error, false);

    if (error.response.status === 401 || error.response.status === 403) {
      showAlertExpirationAccout();
    }
  }
);

export { base_url };
export default instance;
