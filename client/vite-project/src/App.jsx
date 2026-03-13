import {Routes,Route} from 'react-router'
import SignupPage from './pages/signupPage'
import LoginPage from './pages/loginPage'
import DashBoard from './pages/admin/Dashboard'
import AdminLayout from './layouts/admin/AdminLayout'
import CreateBlog from './pages/admin/CreateBlog'
import BlogsAdminPage from './pages/admin/BlogsAdminPage'
import EditBlog from './pages/admin/EditBlog'
import ProtectedRoute from './routes/ProtectedRoute'
import Homepage from './pages/homePage';
import HomePageLayout from './layouts/HomePageLayout'
import BlogPage from './pages/blogPage';
import AdminCommentSection from './components/admin/AdminCommentSection'
import ProfilePage from './pages/profilePage'
import { checkAuth } from './features/authSlice'
// import { fetchAllBlogs } from './features/blogsSlice'
import { useDispatch } from 'react-redux'
import {useEffect} from 'react';
function App() {
  const dispatch=useDispatch();
    useEffect(() => {
      dispatch(checkAuth());
     }, [dispatch])
  return (
    <Routes>
        <Route element={<HomePageLayout/>}>
        <Route path='/' element={<Homepage></Homepage>}></Route>
        <Route path='/blog/:slug' element={<BlogPage/>}></Route>
         <Route path='/profile' element={<ProfilePage/>}></Route>
         </Route>
         <Route element={<ProtectedRoute />}>
         <Route path="/admin" element={<AdminLayout />}>  
        <Route index element={<DashBoard />} />
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="blogs" element={<BlogsAdminPage />} />
        <Route path="blogs/create" element={<CreateBlog />} />
        <Route path="blogs/edit/:slug" element={<EditBlog />} />
        <Route path="blogs/comments/:slug" element={<AdminCommentSection />} />
       </Route>
       </Route>
        <Route path='/signup' element={<SignupPage></SignupPage>}></Route>
        <Route path='/signin' element={<LoginPage></LoginPage>}></Route>
    </Routes>
    
  )
}

export default App
