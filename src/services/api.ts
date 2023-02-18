import axios from "axios";
import CustomeHistory from "./customeHistory";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Toast from "@utils/toast";

let base_url :string ;

if (process.env.NODE_ENV === "development") {
  console.log("Looks like we are in development mode! 🙄");
  base_url = `http://localhost:8888`;
} else {
  console.log("Looks like we are in production mode! 👍");
  base_url = `http://45.156.186.14:8888`;
}

const MySwal = withReactContent(Swal);

const handleLogoutUser = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await axios.put(`${base_url}/api/users/logout`, {
      email: user.email,
    });
    console.log("response logout", response);
    if (response.status === 200) {
      localStorage.removeItem("user");
    }
  } catch (error) {
    console.log(error.response);
  }
};

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
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    request.headers.common["x-auth-token"] = user.token;
    request.headers.common["Content-Type"] = "application/json";
  } else {
    localStorage.removeItem("user");
    showAlertExpirationAccout();
  }
  return request;
});

instance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    console.log("error in api>>>", error);
    Toast(error.response.data.msg || error.response.data.error, false);

    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.removeItem("user");
      showAlertExpirationAccout();
    }
  }
);

export { base_url };
export default instance;
