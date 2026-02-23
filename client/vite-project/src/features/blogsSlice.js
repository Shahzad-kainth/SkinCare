import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { getAllBlogs,deleteBlog } from "../api/blogapis";

export const fetchAllBlogs=createAsyncThunk(
    'blogs/fetchBlogs',
    async({page,limit,search},{rejectWithValue},)=>{
         try{
               const response=await getAllBlogs(page,limit,search);
               console.log(response.data)
                return response.data;  
         }
         catch(error){
            console.log(error);
           return rejectWithValue(
            error.response?.data || error.message
           )
         }
    }
)

export const removeBlog=createAsyncThunk(
    'blogs/deleteBlog',
    async(id,{rejectWithValue})=>{
        try{
             await deleteBlog(id);
             return id;
        }
        catch(error){
              console.log(error);
              rejectWithValue(
                error.message
              )
        }
    }
)

const blogsSlice=createSlice({
    name:"blogs",
    initialState:{
        blogs:[],
        loading:false,
        deleteLoading:false,
        page:1,
        totalBlogs:0,
        totalPages:1,
        search:""
    },
    reducers:{
        setPage:(state,action)=>{
            state.page=action.payload;
        },
        setSearch:(state,action)=>{
            state.search=action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllBlogs.pending,(state,action)=>{
            state.loading=true;
        })
        .addCase(fetchAllBlogs.fulfilled,(state,action)=>{
            state.loading=false;
            state.blogs=action.payload.data;
            state.totalPages=action.payload.totalPages;
            state.totalBlogs = action.payload.totalBlogs;
        })
        .addCase(fetchAllBlogs.rejected,(state,action)=>{
            state.loading=false;
        })

        //Delete Blog Api handle
        .addCase(removeBlog.pending,(state,action)=>{
            state.deleteLoading=true;
        })
        .addCase(removeBlog.fulfilled,(state,action)=>{
            state.deleteLoading=false;
            state.blogs=state.blogs.filter(
                (blog)=>blog._id!==action.payload
            )
        })
        .addCase(removeBlog.rejected,(state,action)=>{
            state.deleteLoading=false;
        })

    }
})

export const { setPage, setSearch } = blogsSlice.actions;
export default blogsSlice.reducer;




