

const TextFieldStyles = {
    MuiInputBase:{
      styleOverrides: {
        input: {
          "&:-webkit-autofill": {
            "-webkit-box-shadow": "0 0 0 100px var(--background) inset",
            "-webkit-text-fill-color": "var(--text3)",
          },
          color: "var(--text3)",
          fontFamily: "Noto Sans, sans-serif",
          letterSpacing: "1px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
            color: "var(--borders)",
            letterSpacing: "1px",
            fontSize: ".9rem",
            fontFamily: "Noto Sans, sans-serif",
          },

          "& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":{
            color: "var(--borders)",
            letterSpacing: "1px",
            fontSize: ".9rem",
            fontFamily: "Noto Sans, sans-serif",
          },

          "&:-webkit-autofill": {
            boxShadow: "0 0 0 1000px white inset", 
          },
          "& input:valid + fieldset": {
            color: "var(--borders)",

            borderColor: "var(--borders)",
            borderWidth: 1,
          },
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "var(--borders)",
              fontSize: ".9rem",
            },
            "&.Mui-focused fieldset": {
              borderColor: "var(--borders)",
            },
          },
          "& .css-115jmo2-MuiInputBase-root-MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":{
            borderColor:'var(--borders)',
            filter:"brightness(.5)",
          },
          "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-disabled":{
            color:'var(--borders)',
            filter:"brightness(.5)",
            background:"none !important",
          },
          "& .css-1l11c4l-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled":{
            textFillColor:"#b9b9b973",
            fontSize:".8rem",
            fontFamily: "Noto Sans, sans-serif",
            letterSpacing: "1px",

          },

          "& .MuiInputBase-root": {
            "&:hover fieldset": {
              borderColor: "var(--borders)",
              fontSize: ".9rem",
            },
            "& .Mui-focused fieldset": {
              borderColor: "var(--borders)",
            },
           
          },
          "& .css-1ogi88n-MuiInputBase-root-MuiInput-root.Mui-focused:after":{
            color: "var(--borders)",

            borderColor: "var(--borders)",
            borderWidth: 1,
          },

          "& input:invalid + fieldset": {
            borderColor: "var(--borders)",
            borderWidth: 1,
            backgroundColor: "none",
          },
          ".css-1d3z3hw-MuiOutlinedInput-notchedOutline":{
            // password input border set color
            borderColor: "var(--borders)",
            borderWidth: 1,
            backgroundColor: "none",
          },
          label: {
            color: "var(--borders)",
            backgroundColor: "var(--background)",
            paddingRight:".5rem",
            fontSize:".8rem",
            fontFamily: "Noto Sans, sans-serif",
            letterSpacing:"1px",
           
          },
        },
      },
    },
}


export default TextFieldStyles;
