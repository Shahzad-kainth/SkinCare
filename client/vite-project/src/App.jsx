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
function App() {
  
  return (
    <Routes>
        <Route element={<HomePageLayout/>}>
        <Route path='/' element={<Homepage></Homepage>}></Route>
        <Route path='/blog/:id' element={<BlogPage/>}></Route>
         </Route>
         <Route element={<ProtectedRoute/>}>
          <Route path="/admin" element={<AdminLayout />}>  
           <Route path="/admin/create" element={<CreateBlog />} />
            <Route path="/admin/blogs/edit/:id" element={<EditBlog/>} />
          <Route index element={<><DashBoard /> <BlogsAdminPage/></>} />
          <Route path="dashboard" element={<DashBoard/>}></Route>
          <Route path="blogs" element={<BlogsAdminPage />} />  
          </Route>
         </Route>
        <Route path='/signup' element={<SignupPage></SignupPage>}></Route>
        <Route path='/signin' element={<LoginPage></LoginPage>}></Route>
    </Routes>
    
  )
}

export default App
