import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ThemeContext from "../../context/themeContext";
import {useSelector} from 'react-redux'


export default function Profile() {
  const theme = React.useContext(ThemeContext);
  const {auth} = useSelector(state=>state.auth)




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
          <img style={{height:"100%"}} src={auth.gender==="male" ? "/male.jpg" :"/female.jpg"} />
        </CardContent>
        <Box sx={{ pl: 1, pt: 7, color: theme.text1 }}>
          <h3>{auth.fname}</h3>
          <h3>{auth.lname}</h3>
          <h3>{auth.email}</h3>

        </Box>
      </Box>
    </Card>
      </Box>
  );
}
