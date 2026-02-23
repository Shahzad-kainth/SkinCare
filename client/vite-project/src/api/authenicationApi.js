import axiosClient from "./axiosClient";

export const login=(credentials)=>{
   return axiosClient.post('/api/user/login',credentials);
}
export const signup=(credentials)=>{
 return axiosClient.post('/api/user/signup',credentials);
}
export const logout=()=>{
 return axiosClient.post('/api/user/logout');
}

export const checkAuth=()=>{
   return axiosClient.post('/api/user/checkAuth')
}