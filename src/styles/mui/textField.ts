

const TextFieldStyles = {
    MuiInputBase:{
      styleOverrides: {
        input: {
          "&:-webkit-autofill": {
            "-webkit-box-shadow": "0 0 0 100px var(--background) inset",
            "-webkit-text-fill-color": "var(--text1)",
          },
          color: "var(--text1)",
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
            backgroundColor: "red !important",
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

          },
        },
      },
    },
}


export default TextFieldStyles;
