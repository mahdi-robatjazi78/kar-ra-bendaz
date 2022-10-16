
import {useContext} from "react"
import { toast } from "react-hot-toast";
// const ThemeContext from "../context/colorModeContext"

export default function Toast (msg : string,success : boolean =true){





    if(success){

        toast.success(msg)
    }

    else{
        toast.error(msg)
    }
}


