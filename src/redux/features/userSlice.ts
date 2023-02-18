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

export const counterSlice = createSlice({
  name: 'user-slice',
  initialState,
  reducers: {

    setUserToken : (t)=>{
      

    },
    setMeData:(data)=>{

      console.log(data)


    }
    
  },
})

// Action creators are generated for each case reducer function
// export const { setUserToken, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer