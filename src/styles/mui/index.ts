import { createTheme } from "@mui/material/styles";
import ButtonStyles from './button'
import TextFieldStyles from "./textField";   

const CombineCustomizedStyles = createTheme({
        components: 
        {
            ...TextFieldStyles,

        }, 
});


export default CombineCustomizedStyles




