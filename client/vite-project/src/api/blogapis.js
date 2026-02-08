import axiosClient from "./axiosClient";

export const postBlog=()=>{
    return axiosClient.post('/api/blogs/postBlog');
}

export const editBlog=(id)=>{
   return axiosClient.put(`/api/blogs/editblog/${id}`)
}
export const deleteBlog=(id)=>{
   return  axiosClient.delete(`/api/blogs/deleteblog/${id}`)
}

export const getAllBlogs=(page,limit,search)=>{
   return  axiosClient.get(`/api/blogs/getblogs?page=${page}&limit=${limit}&search=${search}`)
}
export const getBlog=(id)=>{
   return  axiosClient.get(`/api/blogs/getblog/${id}`)
}
