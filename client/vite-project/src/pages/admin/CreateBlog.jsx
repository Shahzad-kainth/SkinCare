import { postBlog } from "../../api/blogapis"
import {z} from 'zod';
import { useMemo } from "react";
import { useForm ,Controller} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from 'react-quill-new'

export default function CreateBlog(){
     
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
        .refine((files)=>files instanceof FileList && files.length === 1,"Image is Required")
    })
    const onSubmit=async(data)=>{
        try{
             const formData=new FormData();
             formData.append('title',data.title);
             formData.append('content',JSON.stringify(data.content));
             formData.append('category',data.category);
             formData.append('image',data.image[0])
             await postBlog(formData); 
             reset();
        }
        catch(error){
              console.log(error);
        }
    }
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState:{errors,isSubmitting }
    }
    =useForm({
        resolver:zodResolver(blogSchema),
    })
    const modules = useMemo(() => ({
             toolbar: [
             [{ header: [1, 2, false] }],
             ["bold", "italic", "underline"],
             [{ list: "ordered" }, { list: "bullet" }],
             ["link", "image"]
  ]
         }), []);
     return(
        <div className="container mx-auto bg-white p-6 rounded-lg">
           <h1 className="text-2xl font-bold mb-6">Create Blog Post</h1>
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
                       <p className="text-red-500 text-sm mt-1">
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
                         defaultValue={{ops:[]}}
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
                 {isSubmitting?"Creating...":"Create Post"}
                </button>
            </form>
        </div>
     )
}