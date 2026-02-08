import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as authapi from '../api/authenicationApi'

export const signupUser=createAsyncThunk(
    "auth/signupUser",
    async(credentials, { rejectWithValue })=>{
        try{
        const response=await authapi.signup(credentials);
        return response.data;
        }
        catch(error){
            return rejectWithValue(
                error.response?.data || error.message
            )
        }
    }
)

export const loginUser=createAsyncThunk(
    "auth/loginUser",
    async(credentials,{rejectWithValue})=>{
        try{
            const response=await authapi.login(credentials);
            return response.data
        }
        catch(error){
             return rejectWithValue(
                error.response?.data || error.message
             )
        }
    }
)

export const logoutUser=createAsyncThunk(
    'auth/logoutUser',
    async(_,{rejectWithValue})=>{
        try{
            const response=await authapi.logout();
            return response.data;
        }
        catch(error){
            return rejectWithValue(
                error.response.data || error.message
            )
        }
    }
)
const initialState = {
  user: null,

  signup: {
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },

  login: {
    status: 'idle',
    error: null,
  },
   logout: {
    status: 'idle',
    error: null,
  },
};

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        //signUp portion
        .addCase(signupUser.pending,(state)=>{
            state.signup.status = 'loading';
            state.signup.error = null;
        })
        .addCase(signupUser.fulfilled,(state,action)=>{
            state.signup.status = 'succeeded';
            state.user = action.payload;
        })
        .addCase(signupUser.rejected,(state,action)=>{
            state.signup.status = 'failed';
            state.signup.error = action.payload;
        })
        //loginUser
        .addCase(loginUser.pending,(state)=>{
             state.login.status = 'loading';
             state.login.error = null;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
           state.login.status = 'succeeded';
           state.user = action.payload;
        })
        .addCase(loginUser.rejected,(state,action)=>{
             state.login.status = 'failed';
             state.login.error = action.payload;
        })
        //logOut

         .addCase(logoutUser.pending,(state,action)=>{
            state.login.status = 'loading';
            state.login.error = null;
            state.signup.status = 'loading';
            state.signup.error = null;
         })
         .addCase(logoutUser.fulfilled,(state,action)=>{
            state.user = null;
            state.login.status = 'idle';
            state.signup.status = 'idle';
            state.login.error = null;
            state.signup.error = null;
         })
         .addCase(logoutUser.rejected,(state,action)=>{
            state.login.error = action.payload;
            state.signup.error = action.payload;
            state.login.status = 'failed';
            state.signup.status = 'failed';
         })
    }
})


export default authSlice.reducer;