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
export const checkAuth=createAsyncThunk(
    'auth/checkAuth',
    async(_,{rejectWithValue})=>{
        try{
          const response=await authapi.checkAuth();
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
  checkAuth:{
    status:'idle',
    error:null,
  }
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
             state.logout.status='loading';
             state.logout.error=null;
         })
         .addCase(logoutUser.fulfilled,(state,action)=>{
            state.user = null;

            state.logout.status = 'succeeded';
            state.logout.error = null;

            state.login.status = 'idle';
            state.login.error = null;

            state.signup.status = 'idle';
            state.signup.error = null;

           })
         .addCase(logoutUser.rejected,(state,action)=>{
             state.logout.status='idle';
             state.logout.error=action.payload;
         })
         //CheckAuth
         .addCase(checkAuth.pending,(state)=>{
             state.checkAuth.status='loading';
             state.checkAuth.error=null
         })
         .addCase(checkAuth.fulfilled,(state,action)=>{
            state.checkAuth.status='succeeded';
            state.user = action.payload.user;
         })
         .addCase(checkAuth.rejected,(state,action)=>{
            state.checkAuth.status='failed';
            state.checkAuth.error=action.payload;
         })
    }
})

export default authSlice.reducer;