import { useParams,useNavigate } from "react-router";
import {useEffect,useState,useMemo} from 'react';
import { editBlog,getBlog } from "../../api/blogapis";
import {useForm,Controller} from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from 'react-quill-new'
import {z} from 'zod';
function EditBlog(){
       const {id}=useParams();
       const navigate=useNavigate()
       const [loading,setLoading]=useState(false);
       const [error,setError]=useState("");
        const blogSchema=z.object({
        title:z.string().min(3,"Title Must be At least 3 Characters").max(150,"Title Must be less than 150 Chahracters"),
        content:z.object({
                    ops:z.array(
                        z.object({
                            insert:z.any(),
                            attributes:z.any().optional()
                        })
                    )
                }).refine((val)=>{
                    const textLength=val.ops
                    .map((op)=>typeof op.insert==="string"? op.insert:"")
                    .join("").trim().length;
                    return textLength>=20
                }, { message: "Content must be at least 20 characters" }),
        category:z.string()
        .min(3,"Category Must Be At Least 3 Characters")
        .max(60,"Category Must Be Less Than 60 Chahracters"),
        image:z.any()
        .optional()
        .refine((file)=>{
            return  !file || file.length===0 || file[0] instanceof File
        },"Invalid file Selected")
        .refine((file)=>{
          return  !file || file.length===0 || file[0]?.size<=5*1024*1024
        },"Image must be less than 5MB")
     })
       const {register,
              handleSubmit,
              formState:{errors,isSubmitting},
              control,
              reset,
       }=useForm({
              resolver:zodResolver(blogSchema),
              defaultValues: {
              title: "",
              content: { ops: [] }, 
              category: "",
        },
       })
       useEffect(()=>{
           const fetchBlogForEdit=async()=>{
              try{
                  setLoading(true);
                  const res=await getBlog(id); 
                  const blog=res.data.data;
                  reset({
                     title:blog.title,
                     content:blog.content,
                     category:blog.category,
                  })
                  setLoading(false);
              }
              catch(error){
                 setError("Failed to Load Blog");
                 setLoading(false);

              }
           }
           fetchBlogForEdit()
       },[id,reset]);
       const modules = useMemo(() => ({
             toolbar: [
             [{ header: [1, 2, false] }],
             ["bold", "italic", "underline"],
             [{ list: "ordered" }, { list: "bullet" }],
             ["link"]
          ]
         }), []);
         
       //Submit Updated Data
       const onSubmit=async(data)=>{
              try{
               const formData=new FormData();
                formData.append("title", data.title);
                formData.append("content", JSON.stringify(data.content));
                formData.append("category", data.category);
                if (data.image && data.image.length >= 0) {
                 formData.append("image", data.image[0]);
                 }

                 await editBlog(id,formData);
                 alert("Blog Updated Succefuly")
                   navigate('/admin')
              }
              catch(error){
                 alert("Error updating blog");
              }
       }
         if (loading) return <div className="text-center mt-10">Loading...</div>;
         if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;
       return(
         <div className="container mx-auto bg-white p-6 rounded-lg">
           <h1 className="text-2xl font-bold mb-6">Edit Blog Post</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                 {/* Title */}
                <div>
                    <label className="block mb-1 font-medium">Title</label>
                    <input
                    type="text"
                    {...register("title")}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Blog Title"
                    >
                    </input>
                    {errors.title &&(
                       <p className="text-red-50 text-sm mt-1">
                         {errors.title.message}
                       </p>
                    )}
                </div>
                {/* category */}
                <div>
                     <label className="block mb-1 font-medium">Category</label>
                     <input
                    type="text"
                    {...register("category")}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter category"
                    >
                    </input>
                    {errors.category &&(
                       <p className="text-red-50 text-sm mt-1">
                         {errors.category.message}
                       </p>
                    )}
                </div>
                {/* image */}
                <div>
                     <label className="block mb-1 font-medium">Upload Image</label>
                     <input
                    type="file"
                    accept="image/*"  
                    {...register("image")}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter category"
                    >
                    </input>
                    {errors.image &&(
                       <p className="text-red-50 text-sm mt-1">
                         {errors.image.message}
                       </p>
                    )}
                </div>
                {/* content */}
                <div>
                    <label className="block mb-1 font-medium">Content</label>
                        <Controller
                         name="content"
                         control={control}
                         defaultValue=""
                         render={({field})=>(
                            <ReactQuill
                               theme="snow"
                               value={field.value}
                               modules={modules}
                                onChange={(content, delta, source, editor)=>{
                                 const fullDelta=editor.getContents();
                                 field.onChange(fullDelta);
                               }}
                            />
                        )}
                       />
                     {
                        errors.content && (
                            <p className="text-red-500 text-sm mt-1">
                               {errors.content.message}
                            </p>
                        )
                     }
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                >
                 {isSubmitting?"Edit...":"Edit Post"}
                </button>
            </form>
        </div>
       )
}
export default EditBlog;