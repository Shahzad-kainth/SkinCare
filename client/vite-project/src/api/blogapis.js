import axiosClient from "./axiosClient";
export const postBlog=(data)=>{
    return axiosClient.post('/api/blogs/postBlog',data);
}

export const editBlog=(slug,data)=>{
   return axiosClient.put(`/api/blogs/editblog/${slug}`,data)
}
export const deleteBlog=(id)=>{
   return  axiosClient.delete(`/api/blogs/deleteblog/${id}`)
}

export const getAllBlogs = ({ limit = 10, cursor = null, search = "" }) => {
  // Build query params dynamically
  const params = new URLSearchParams();
  params.append("limit", limit);
  if (cursor) params.append("cursor", cursor);
  if (search) params.append("search", search);
  return axiosClient.get(`/api/blogs/getblogs?${params.toString()}`);
};
export const getBlog=(slug)=>{
   return  axiosClient.get(`/api/blogs/getblog/${slug}`)
}

export const likeBlog=(slug)=>{
   return axiosClient.put(`/api/blogs/${slug}/like`);
}

export const unlikeBlog=(slug)=>{
   return axiosClient.delete(`/api/blogs/${slug}/like`);
}

export const getLikes=(slug)=>{
   return axiosClient.get(`/api/blogs/${slug}/likes`)
}

export const addBookmark=(slug)=>{
   return axiosClient.put(`/api/blogs/${slug}/bookmark`)
}

export const removeBookmark=(slug)=>{
    return axiosClient.delete(`/api/blogs/${slug}/bookmark`)
}

export const createComment=(slug,comment)=>{
   return axiosClient.post(`/api/blogs/${slug}/comment`,{comment})
}
export const deleteComment=(id)=>{
   return axiosClient.delete(`/api/blogs/${id}/comment`)
}
export const getComments = ({ limit = 10, slug, cursor = null }) => {
    const params = new URLSearchParams();
    params.append("limit", limit);
    if (cursor) {
        params.append("cursor", String(cursor));
    }
    return axiosClient.get(`/api/blogs/${slug}/comments?${params.toString()}`);
};