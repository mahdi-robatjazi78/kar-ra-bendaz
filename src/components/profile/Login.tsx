import React, {useState, useContext,useLayoutEffect } from "react";

import ThemeContext from "../../context/themeContext";
import {SidebarContext} from "../../context/sidebarContext";
import {useNavigate} from "react-router-dom"
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {NavLink} from 'react-router-dom'
// import {loginUser} from '../../services/userService'
import axios from 'axios'
import Axios ,{base_url} from '../../services/api'
import Toast from "../../util/toast";

const Login = () => {
  const theme = useContext(ThemeContext);
  const {setCloseSidebar} = useContext(SidebarContext);
  const navigate = useNavigate()
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    


  const handleSubmit =async (event: React.FormEvent<HTMLFormElement>) => {
    try{

      event.preventDefault()
      const response = await axios.post(`${base_url}/users/login`, {email,password})
      Axios.defaults.headers['x-auth-token'] = response.data.data.token
      localStorage.setItem("user", JSON.stringify(response.data.data))
      navigate('/')

      console.log()

      Toast(response.data.msg)
    }catch(error){
      console.log("error login")
      Toast(error.response.data.msg,false)

    }
    


  }

  useLayoutEffect(()=>{
    setCloseSidebar()
  },[])

  const navLinkStyles = {
    color:theme.text3,
    fontSize:".7rem",
    letterSpacing:"1px",
    textDecoration:"none"
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: theme.text3 }}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5" style={{ color: theme.text1 }}>
          Login
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
               InputProps={
            
              
                {style: {
                  color: theme.text1,
                  letterSpacing: "1px",
                }}}
              focused
              value={email}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e)=>setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
               InputProps={
            
              
                {style: {
                  color: theme.text1,
                  letterSpacing: "1px",
                }}}
                focused
              //  InputLabelProps={{style:{color:theme.text2}}}  
               required
                fullWidth
                value={password}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e)=>setPassword(e.target.value)}
              />
            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink to="/signup" style={navLinkStyles}>
                {"Don't have an account? Sign Up"}
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
