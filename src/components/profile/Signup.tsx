import React, { useContext,useLayoutEffect, FC } from "react";
import ThemeContext from "../../context/themeContext";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {NavLink} from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import {base_url} from '../../services/api'
import {SidebarContext} from '../../context/sidebarContext'
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
interface ISignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender:string
}

interface IProps {
  userSignupData: ISignupData;
  setUserSignupData: React.Dispatch<React.SetStateAction<ISignupData>>;
}

const Signup: FC<IProps> = ({ userSignupData, setUserSignupData }) => {
  const navigate = useNavigate()
  const theme = useContext(ThemeContext);
  const {setCloseSidebar} = useContext(SidebarContext)
  
  
  
  const handleChangeInput = (
    event
  ) => {
    setUserSignupData({
      ...userSignupData,
      [event.target.name]: event.target.value,
    });


  };
  
  
  useLayoutEffect(()=>{
    setCloseSidebar()
  },[])
  
  const navLinkStyles = {
    color:theme.text3,
    fontSize:".7rem",
    letterSpacing:"1px",
    textDecoration:"none"
  }
  
  
  
  
  const submitForm = async(e)=>{
    e.preventDefault()
    try{
      const response = await axios.post(`${base_url}/users/new`, userSignupData)
      navigate("/login")
    }catch(error){
      console.error(error.response)
    }

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
          color: theme.text1,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: theme.text3 }}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={submitForm} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
               InputProps={
            
              
                 {style: {
                   color: theme.text1,
                   letterSpacing: "1px",
                 }}}
              focused
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                style={{ borderColor: "red" }}
                onBlur={handleChangeInput}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
               InputProps={
            
              
                 {style: {
                   color: theme.text1,
                   letterSpacing: "1px",
                 }}}
              focused
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onBlur={handleChangeInput}
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
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                inputProps={{
                  type: "email",
                  autoComplete: "none",
                }}
                onBlur={handleChangeInput}
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
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                // autoComplete="new-password"
                onBlur={handleChangeInput}
              />
            </Grid>
            <Box >
      {/* <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="male"
        name="gender"
        row
        style={{color:theme.text3 , paddingLeft:"1.5rem"}}
        onChange={(event)=>{
          setUserSignupData({...userSignupData , gender:event.target.checked})
        }}
      >
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="female" control={<Radio />} label="Female" />
      </RadioGroup> */}



            </Box>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink to="/login" style={navLinkStyles}>
                Already have an account? Sign in
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
