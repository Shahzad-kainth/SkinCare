import { useSelector } from "react-redux"
export default function DashBoard(){
      const {totalBlogs}=useSelector((state)=>state.blogs)
    return(
        <div className="mb-4 px-2 py-5 ">
         <h2 className="text-lg font-bold black">Total Blogs: {totalBlogs}</h2>
        </div>
        
    )
}