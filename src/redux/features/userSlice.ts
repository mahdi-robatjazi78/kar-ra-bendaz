import { createSlice } from '@reduxjs/toolkit'
import axios from '../../services/api'
export interface IUserData {
    email:String,
    fname:String,
    gender:String,
    lname:String,
    userName:String,
}

export interface IUser {
  token:String,
  me : IUserData
}

const initialState: IUser = {
  token: null,
  me:{
    email:null,
    fname:null,
    gender:null,
    lname:null,
    userName:null,
  }
}

export const userSlice = createSlice({
  name: 'user-slice',
  initialState,
  reducers: {

    SetUserToken : (state , action)=>{
      axios.defaults.headers.common["x-auth-token"] = action.payload.token;
      state.token = action.payload.token
    },
    SetMeData:(state , action)=>{
      state.me = action.payload
    },
    LogoutAction :(state , action)=>{
      state.token = null
      state.me = {
        email:null,
        fname:null,
        gender:null,
        lname:null,
        userName:null,
      }
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { SetUserToken,SetMeData ,LogoutAction } = userSlice.actions

export default userSlice.reducer