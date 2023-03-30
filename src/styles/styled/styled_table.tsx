import styled from "styled-components";
import { Table, TableCell, tableCellClasses, TableRow } from "@mui/material";

const darkmode = localStorage.getItem("darkmode")


export const StyledTableCell = styled(TableCell)({
    [`&.${tableCellClasses.head}`]: {
      padding: ".4rem",
      color: "var(--text2)",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      padding: ".4rem .4rem .4rem .7rem",
      color: "var(--text1)",
    },
  });

  export const StyledTableRow = styled(TableRow)({
    "&:nth-of-type(odd)": {

      backgroundColor: darkmode == "true" ? `#011a69` : "rgb(215,215,215)"},
    },
    // hide last border
    // "&:last-child td, &:last-child th": {
    //   border: 0,
    // },
  );


