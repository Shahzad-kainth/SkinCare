import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import blogsReducer from '../features/blogsSlice'
const store=configureStore({
  reducer:{
    auth:authReducer,
    blogs:blogsReducer
  }
})

export default store;