import { createTheme } from "@mui/material";

const OverridedTheme = createTheme({
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
        borderRadius:"7px",

          "&:hover": {
            backgroundColor: "var(--foreground)",
            border:"1px solid var(--text1)",
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "var(--foreground)",
          color:"var(--text1)",
          fontFamily:"Space grotesk",
          border:"1px solid var(--text1)"
        },


      },
    },
  },
});

export default OverridedTheme;
