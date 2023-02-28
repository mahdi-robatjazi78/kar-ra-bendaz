import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

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
  token: "",
  me:{
    email:"",
    fname:"",
    gender:"",
    lname:"",
    userName:"",
  }
}

export const userSlice = createSlice({
  name: 'user-slice',
  initialState,
  reducers: {

    setUserToken : (state , action)=>{
      state.token = action.payload.token
    },
    setMeData:(state , action)=>{

      state.me = action.payload


    }
    
  },
})

// Action creators are generated for each case reducer function
export const { setUserToken,setMeData } = userSlice.actions

export default userSlice.reducer