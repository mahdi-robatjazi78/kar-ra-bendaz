import { createTheme } from "@mui/material/styles";

import TextFieldStyles from "./textField";   

const CombineCustomizedStyles = createTheme({
    components: {
        ...TextFieldStyles}
});


export default CombineCustomizedStyles




