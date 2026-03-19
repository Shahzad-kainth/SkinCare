import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../Slices/authSlice'
import blogsReducer from '../Slices/blogsSlice'
const store=configureStore({
  reducer:{
    auth:authReducer,
    blogs:blogsReducer
  }
})

export default store;