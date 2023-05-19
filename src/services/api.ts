import { AppDispatch } from './../redux/store';
import axios from "axios";
import CustomeHistory from "./customeHistory";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Toast from "@utils/toast";
import UnAuthenticatedModal from "@/components/modal/unAuthenticated";
import { store } from "@/redux/store";
import { setBlurPage } from "@/redux/features/settingSlice";
import { LogoutAction } from "@/redux/features/userSlice";
import { getLocalStorageValue, removeLocalSettings } from '@/util/funcs';

let base_url :string = `http://localhost:8888` ;

const MySwal = withReactContent(Swal);

export const handleLogoutUser = async () => {
  try {
    const response = await axios.put(`${base_url}/users/logout`);
    if (response.status === 200) {
      removeLocalSettings("auth")
      store.dispatch(LogoutAction())
    }
  } catch (error) {
    console.log(error.response);
  }
};



export const handleResponseError = (error)=>{
  if(error.status === 401 || error.status === 403){
    store.dispatch(setBlurPage())
    UnAuthenticatedModal()
  }
}





const instance = axios.create({
  // baseURL:"https://hardcore-visvesvaraya-fovq7genw.iran.liara.run",
  baseURL: base_url,
  timeout: 1000,
});

instance.interceptors.request.use(function(request) {
    const auth = getLocalStorageValue("auth")
    request.headers.common["x-auth-token"] = auth.token;
    request.headers.common["Content-Type"] = "application/json";
    if(!auth?.token){
      store.dispatch(setBlurPage())
      UnAuthenticatedModal()
    }
  return request;
});

instance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    Toast(error.response.data.msg || error.response.data.error, false , true);

    if (error.response.status === 401 || error.response.status === 403) {
      store.dispatch(setBlurPage())
      UnAuthenticatedModal()
    }
  }
);

export { base_url };
export default instance;
