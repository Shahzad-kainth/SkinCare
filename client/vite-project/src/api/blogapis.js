import axiosClient from "./axiosClient";
export const postBlog=(data)=>{
    return axiosClient.post('/api/blogs/postBlog',data);
}

export const editBlog=(id,data)=>{
   return axiosClient.put(`/api/blogs/editblog/${id}`,data)
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
