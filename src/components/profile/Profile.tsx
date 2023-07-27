import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ThemeContext from "../../context/themeContext";
import { useSelector } from "react-redux";

export default function Profile() {
  const theme = React.useContext(ThemeContext);
  const { auth } = useSelector((state) => state.auth);

  return <Box></Box>;
}
