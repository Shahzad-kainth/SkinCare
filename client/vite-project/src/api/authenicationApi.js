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
   return axiosClient.get('/api/user/check-auth')
}


export const meBookmarks=()=>{
   return axiosClient.get('/api/user/me/bookmarks');
}

