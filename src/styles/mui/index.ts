import { createTheme } from "@mui/material/styles";



import SwitchStyles from "./switch";   
import TextFieldStyles from "./textField";   

const CombineCustomizedStyles = createTheme({
    components: {...SwitchStyles , ...TextFieldStyles}
});


export default CombineCustomizedStyles




