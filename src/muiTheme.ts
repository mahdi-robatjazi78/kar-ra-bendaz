import { createTheme, styled } from '@mui/material/styles';


const muiOverridedTheme = createTheme({


    components:{

        MuiOutlinedInput: {
            styleOverrides: {
                input: {
                    '&:-webkit-autofill': {
                        '-webkit-box-shadow': '0 0 0 100px var(--background) inset',
                        '-webkit-text-fill-color': 'var(--text1)'
                    },
                    color: 'var(--text1)'
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
                        color: "var(--borders)",
                        letterSpacing:"1px",
                        fontSize:"1.1rem"
                    },

                    '&:-webkit-autofill': {
                        boxShadow: '0 0 0 1000px white inset',
                        backgroundColor: 'red !important'
                    },
                    '& input:valid + fieldset': {
                        borderColor: 'var(--borders)',
                        borderWidth: 1,
                    },
                    '& .MuiOutlinedInput-root':{
                        '&:hover fieldset': {
                            borderColor: 'var(--borders)'
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'var(--borders)',
                        },
                    },
                    '& input:invalid + fieldset': {
                        borderColor: 'var(--borders)',
                        borderWidth: 1,
                        backgroundColor: 'none',
                    },

                    '& input:valid:focus + fieldset': {
                        borderColor: 'var(--borders)',
                        borderLeftWidth: 5,
                        padding: '4px !important', // override inline-style
                    },
                },
            }
        },

    }

})



export default muiOverridedTheme