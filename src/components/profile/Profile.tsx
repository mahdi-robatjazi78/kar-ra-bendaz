import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ThemeContext from "../../context/themeContext";



export default function Profile() {
  const theme = React.useContext(ThemeContext);
    const user = JSON.parse(localStorage.getItem("user"))
  return (
    <Box
    
    sx={{

        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:"85vh",
    }}
    >
    <Card
      sx={{
        minWidth: "30rem",
        background: theme.sidebar,
      
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row-reverse",
        }}
      >
        <CardContent
        style={{padding:0}}
        >
          <img style={{height:"100%"}} src={user.gender==="male" ? "/male.jpg" :"/female.jpg"} />
        </CardContent>
        <Box sx={{ pl: 1, pt: 7, color: theme.text1 }}>
          <h3>{user.fname}</h3>
          <h3>{user.lname}</h3>
          <h3>{user.email}</h3>

        </Box>
      </Box>
    </Card>
      </Box>
  );
}
